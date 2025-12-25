import type { Room, Message } from "@/lib/types"
import { memoryStore } from "./memory-store"

const ONE_DAY = 24 * 60 * 60 // seconds

class StorageManager {
  private redis: any = null
  private useRedis = false
  private initialized = false

  /* ================= INITIALIZE ================= */
  private async initialize() {
    if (this.initialized) return

    try {
      if (
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN
      ) {
        const { Redis } = await import("@upstash/redis")
        this.redis = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        })

        await this.redis.ping()
        this.useRedis = true
        console.log("✅ Using Redis for storage")
      } else {
        console.log("⚠️ Redis not configured, using memory store")
      }
    } catch (err) {
      console.error("❌ Redis init failed, using memory:", err)
      this.useRedis = false
    }

    this.initialized = true
  }

  /* ================= HELPERS ================= */
  private now() {
    return Date.now()
  }

  private isExpired(expiresAt?: number) {
    return expiresAt !== undefined && expiresAt < this.now()
  }

  /* ================= ROOMS ================= */

  async setRoom(roomId: string, room: Room) {
    await this.initialize()

    const roomWithExpiry: Room = {
      ...room,
      expiresAt: this.now() + ONE_DAY * 1000,
    }

    if (this.useRedis && this.redis) {
      try {
        await this.redis.set(
          `room:${roomId}`,
          JSON.stringify(roomWithExpiry),
          { ex: ONE_DAY }
        )
        console.log(`✅ Room ${roomId} stored in Redis`)
        return
      } catch {
        this.useRedis = false
      }
    }

    memoryStore.setRoom(roomId, roomWithExpiry)
  }

  async getRoom(roomId: string): Promise<Room | null> {
    await this.initialize()

    if (this.useRedis && this.redis) {
      try {
        const data = await this.redis.get(`room:${roomId}`)
        if (!data) return null

        const room: Room = typeof data === "string" ? JSON.parse(data) : data
        if (this.isExpired(room.expiresAt)) {
          await this.redis.del(`room:${roomId}`)
          return null
        }
        return room
      } catch {
        this.useRedis = false
      }
    }

    const room = memoryStore.getRoom(roomId)
    if (room && this.isExpired(room.expiresAt)) {
      memoryStore.deleteRoom(roomId)
      return null
    }
    return room
  }

  async roomExists(roomId: string): Promise<boolean> {
    const room = await this.getRoom(roomId)
    return !!room
  }

  /* ================= MESSAGES ================= */

  async addMessage(roomId: string, message: Message) {
    await this.initialize()

    // Ensure room exists (lazy create)
    const room = await this.getRoom(roomId)
    if (!room) {
      await this.setRoom(roomId, {
        id: roomId,
        createdAt: this.now(),
      } as Room)
    }

    if (this.useRedis && this.redis) {
      try {
        const key = `messages:${roomId}`
        const existing = (await this.redis.get(key)) || "[]"
        const list: Message[] =
          typeof existing === "string" ? JSON.parse(existing) : existing

        list.push(message)

        await this.redis.set(key, JSON.stringify(list), { ex: ONE_DAY })
        return
      } catch {
        this.useRedis = false
      }
    }

    memoryStore.addMessage(roomId, message)
  }

  async getMessages(roomId: string): Promise<Message[]> {
    await this.initialize()

    if (this.useRedis && this.redis) {
      try {
        const data = await this.redis.get(`messages:${roomId}`)
        if (!data) return []

        const messages: Message[] =
          typeof data === "string" ? JSON.parse(data) : data

        return messages.sort((a, b) => a.createdAt - b.createdAt)
      } catch {
        this.useRedis = false
      }
    }

    return memoryStore.getMessages(roomId)
  }

  /* ================= DEBUG ================= */

  getStorageType() {
    return this.useRedis ? "Redis" : "Memory"
  }
}

export const storage = new StorageManager()
