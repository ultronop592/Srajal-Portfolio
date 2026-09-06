"use client"

import { useEffect } from "react"

export function ScrollToHashClient() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const hash = window.location.hash.slice(1)
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    // Small delay to allow DOM to stabilize
    const timeout = setTimeout(() => {
      const currentHash = window.location.hash.slice(1)
      if (currentHash) {
        const element = document.getElementById(currentHash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return null
}
