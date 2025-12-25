import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RoomLink - Share anything instantly",
  description:
    "Easily share files, text, or notes with anyone instantly and securely. No login required. Created by Ankit Kumar.",
  generator: "Next.js",
  applicationName: "Hey Drop",
  authors: [{ name: "Ankit Kumar", url: "https://github.com/Ankitkumar445" }],
  keywords: [
    "file sharing",
    "text sharing",
    "Hey Drop",
    "Ankit Kumar",
    "instant sharing",
    "no login",
    "secure file transfer",
    "Hey drop by Ankit Kumar",
    "Ankit Kumar new project",
    "roomlink by ankit",
    "Ankit Kumar file sharing website",
  ],
  creator: "Ankit Kumar",
  publisher: "Ankit Kumar",
  metadataBase: new URL("https://RoomLink.vercel.app"),

  openGraph: {
    title: "Hey Drop - Share anything instantly",
    description:
      "Send files or text quickly without any login or signup. One-click sharing!",
    url: "https://RoomLink.vercel.app",
    siteName: "Hey Drop",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Hey Drop preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  manifest: "/manifest.json",
}

/* ✅ THIS IS THE FIX */
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png?v=2" />
<link rel="apple-touch-icon" href="/favicon.png?v=2" />
<link rel="manifest" href="/manifest.json" />

      <body>{children}</body>
    </html>
  )
}
