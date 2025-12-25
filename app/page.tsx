"use client"

import { motion } from "framer-motion"
import CreateRoomButton from "@/components/CreateRoomButton"
import { useEffect, useState } from "react"

export default function HomePage() {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
  }

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
  let promptEvent: BeforeInstallPromptEvent | null = null

  const handler = (e: Event) => {
    e.preventDefault()
    promptEvent = e as BeforeInstallPromptEvent
    setDeferredPrompt(promptEvent)
    setShowInstall(true)
  }

  window.addEventListener("beforeinstallprompt", handler)

  return () => {
    window.removeEventListener("beforeinstallprompt", handler)
  }
}, [])


  const installApp = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt() // 👈 THIS satisfies browser
if (process.env.NODE_ENV !== "production") return null

  await deferredPrompt.userChoice

  setDeferredPrompt(null)
  setShowInstall(false)
}


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />

      {/* NAVBAR */}
      <nav className="relative z-10 w-full px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md">
  <img
    src="/favicon.png"
    alt="RoomLink"
    className="w-full h-full object-cover"
  />
</div>

            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
              RoomLink
            </h1>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href="https://github.com/Ankitkumar445/RoomLink"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-gray-200 hover:border-gray-300 shadow-sm text-gray-700 hover:text-gray-900 transition"
          >
            <svg
  className="w-5 h-5"
  fill="currentColor"
  viewBox="0 0 24 24"
  aria-hidden="true"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0112 5.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
  />
</svg>

            <span className="font-medium text-sm">GitHub</span>
          </motion.a>
        </div>
      </nav>

      {/* INSTALL CTA */}
      {showInstall && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={installApp}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-sky-500 text-white px-5 py-3 rounded-2xl shadow-xl hover:scale-105 transition"
        >
          Install RoomLink
        </motion.button>
      )}

      {/* HERO */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          <span className="text-gray-900">Share Anything</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
            Instantly
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 md:text-xl text-sm max-w-2xl mx-auto mb-14"
        >
          Create temporary rooms to share files, text, and links.
          <br />
          <span className="text-orange-blue font-semibold">
            No login. Auto delete in 24 hours.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CreateRoomButton />
        </motion.div>
      </main>

      {/* FEATURES */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex justify-center gap-4 md:gap-6 flex-wrap pb-16"
      >
        {[
          { label: "No Login", color: "orange" },
          { label: "24h Auto-Delete", color: "blue" },
          { label: "Instant Share", color: "sky" },
        ].map((item) => (
          <div
            key={item.label}
            className="px-5 py-3 rounded-full bg-white/70 backdrop-blur border border-gray-200 shadow-sm text-sm font-medium text-gray-700"
          >
            {item.label}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
