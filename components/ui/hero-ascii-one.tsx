'use client'

import { useEffect } from "react"
import type React from "react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean
      init?: () => void
    }
  }
}

interface HeroAsciiOneProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export default function HeroAsciiOne({ children, className, contentClassName }: HeroAsciiOneProps) {
  useEffect(() => {
    const scriptSrc =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
    if (!existingScript) {
      const embedScript = document.createElement("script")
      embedScript.type = "text/javascript"
      embedScript.src = scriptSrc
      embedScript.onload = () => {
        if (!window.UnicornStudio?.isInitialized) {
          window.UnicornStudio?.init?.()
          if (window.UnicornStudio) window.UnicornStudio.isInitialized = true
        }
      }
      document.head.appendChild(embedScript)
    } else if (!window.UnicornStudio?.isInitialized) {
      window.UnicornStudio?.init?.()
      if (window.UnicornStudio) window.UnicornStudio.isInitialized = true
    }
  }, [])

  return (
    <section className={cn("relative min-h-[90vh] overflow-hidden bg-black", className)}>
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div data-us-project="OMzqyUv6M3kSnv0JeAtC" style={{ width: "100%", height: "100%", minHeight: "100vh" }} />
      </div>

      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg" />

      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-orange-500/30" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-orange-500/30" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-orange-500/30" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-orange-500/30" />

      <div className={cn("relative z-10 flex min-h-[90vh] items-center", contentClassName)}>{children}</div>

      <style jsx>{`
        .stars-bg {
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.5), transparent),
            radial-gradient(1px 1px at 60% 70%, rgba(255, 255, 255, 0.45), transparent),
            radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 90% 60%, rgba(255, 255, 255, 0.35), transparent),
            radial-gradient(1px 1px at 33% 80%, rgba(255, 255, 255, 0.4), transparent),
            radial-gradient(1px 1px at 15% 60%, rgba(255, 255, 255, 0.35), transparent),
            radial-gradient(1px 1px at 70% 40%, rgba(255, 255, 255, 0.35), transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.35;
        }
      `}</style>
    </section>
  )
}
