import { NextResponse } from "next/server"
import { storage } from "@/lib/storage"
import { generateId, generateUserId } from "@/lib/utils"
import type { Message } from "@/lib/types"

/* ---------------------- GET MESSAGES ---------------------- */
export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    console.log(`📨 Fetching messages for room: ${params.roomId}`)

    // Always return messages (even if empty)
    const messages = await storage.getMessages(params.roomId)
    const validMessages = Array.isArray(messages) ? messages : []

    // Sanitize messages
    const sanitizedMessages = validMessages.filter(
      (msg) =>
        msg &&
        typeof msg === "object" &&
        msg.id &&
        msg.roomId &&
        msg.userId &&
        msg.content &&
        msg.type &&
        typeof msg.createdAt === "number"
    )

    console.log(`✅ Returning ${sanitizedMessages.length} messages`)
    return NextResponse.json(sanitizedMessages)
  } catch (error) {
    console.error("❌ Failed to fetch messages:", error)
    return NextResponse.json(
      { error: "Failed to get messages" },
      { status: 500 }
    )
  }
}

/* ---------------------- POST MESSAGE ---------------------- */
export async function POST(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    console.log(`📝 Posting message to room: ${params.roomId}`)

    const body = await request.json()
    const { content, type = "text", fileName, fileSize, fileType } = body

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      )
    }

    const message: Message = {
      id: generateId(),
      roomId: params.roomId,
      userId: generateUserId(),
      content,
      type,
      fileName,
      fileSize,
      fileType,
      createdAt: Date.now(),
    }

    await storage.addMessage(params.roomId, message)

    console.log(`✅ Message stored successfully`)
    return NextResponse.json(message)
  } catch (error) {
    console.error("❌ Failed to create message:", error)
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    )
  }
}
