"use client"

import { useEffect, useRef } from "react"

export function CursorBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = 0
    let mouseY = 0
    let blobX = 0
    let blobY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Lerp towards mouse position
      blobX += (mouseX - blobX) * 0.15
      blobY += (mouseY - blobY) * 0.15

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw blob
      ctx.fillStyle = "rgba(59, 130, 246, 0.08)"
      ctx.beginPath()
      ctx.arc(blobX, blobY, 32, 0, Math.PI * 2)
      ctx.fill()

      // Draw inner glow
      ctx.fillStyle = "rgba(59, 130, 246, 0.12)"
      ctx.beginPath()
      ctx.arc(blobX, blobY, 16, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
