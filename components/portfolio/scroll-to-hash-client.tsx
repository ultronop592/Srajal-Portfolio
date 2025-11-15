"use client"

import { useEffect } from "react"

export function ScrollToHashClient() {
  useEffect(() => {
    // Small delay to allow DOM to stabilize
    const timeout = setTimeout(() => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return null
}
