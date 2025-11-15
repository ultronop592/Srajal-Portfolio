"use client"

import { useRef, useEffect } from "react"

export function useTiltEffect(max = 5) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * max
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * -max

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      element.style.transition = ""
    }

    const handleMouseLeave = () => {
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
      element.style.transition = "transform 0.3s ease-out"
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [max])

  return ref
}
