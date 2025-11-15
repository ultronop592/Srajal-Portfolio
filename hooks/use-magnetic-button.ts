"use client"

import { useRef, useEffect } from "react"

export function useMagneticButton(range = 120, cap = 8) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < range) {
        const force = (range - distance) / range
        const tx = Math.min(Math.max(distX * force * 0.2, -cap), cap)
        const ty = Math.min(Math.max(distY * force * 0.2, -cap), cap)
        button.style.transform = `translate(${tx}px, ${ty}px)`
      } else {
        button.style.transform = "translate(0, 0)"
      }
    }

    const handleMouseLeave = () => {
      button.style.transform = "translate(0, 0)"
      button.style.transition = "transform 0.3s ease-out"
    }

    const handleMouseEnter = () => {
      button.style.transition = ""
    }

    document.addEventListener("mousemove", handleMouseMove)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [range, cap])

  return ref
}
