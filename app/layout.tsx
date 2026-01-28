import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Srajal Tiwari | AI & ML Engineer Portfolio",
  description: "Portfolio of Srajal Tiwari - AI & Machine Learning Engineer",
  generator: "v0.app",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
