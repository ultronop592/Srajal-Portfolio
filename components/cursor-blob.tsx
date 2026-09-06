"use client"

import { useEffect, useRef } from "react"

export function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = -500
    let mouseY = -500
    let currentX = -500
    let currentY = -500
    let rafId: number
    let isMoving = false
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMoving = true
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        isMoving = false
      }, 1500)
    }

    const animate = () => {
      if (isMoving && blobRef.current) {
        currentX += (mouseX - currentX) * 0.12
        currentY += (mouseY - currentY) * 0.12
        blobRef.current.style.transform = `translate3d(${currentX - 150}px, ${currentY - 150}px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl z-20 will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.08) 50%, transparent 70%)",
        transform: "translate3d(-1000px, -1000px, 0)",
      }}
      aria-hidden="true"
    />
  )
}
