"use client"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Profile3DTiltProps {
  mode?: "css" | "canvas" | "webgl"
  imageSrc?: string
  className?: string
  isMobile?: boolean
}

export function Profile3DTilt({
  mode = "css",
  imageSrc = "/profile-3d.png",
  className = "",
  isMobile = false,
}: Profile3DTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (mode !== "css" || isMobile || prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((centerX - x) / centerX) * 5

      setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 })
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mode, isMobile, prefersReducedMotion])

  // Canvas Mode (Mid-tier)
  useEffect(() => {
    if (mode !== "canvas" || !canvasRef.current || isMobile || prefersReducedMotion) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageSrc
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      let animationId: number

      const render = () => {
        // Draw base image
        ctx.drawImage(img, 0, 0)

        // Add parallax blur effect
        const blurAmount = Math.abs(rotation.x * 0.5)
        ctx.filter = `blur(${blurAmount}px)`
        ctx.fillStyle = "rgba(100, 100, 100, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add shine effect
        const shineGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        shineGradient.addColorStop(0, "rgba(255, 255, 255, 0)")
        shineGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.1 + Math.abs(rotation.y) * 0.05})`)
        shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.filter = "none"
        ctx.fillStyle = shineGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        animationId = requestAnimationFrame(render)
      }

      render()

      return () => cancelAnimationFrame(animationId)
    }
  }, [mode, imageSrc, isMobile, prefersReducedMotion, rotation])

  // CSS 3D Mode
  if (mode === "css" && !isMobile && !prefersReducedMotion) {
    return (
      <motion.div
        ref={containerRef}
        className={`relative mx-auto w-72 h-96 md:w-80 md:h-full perspective ${className}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            boxShadow: [
              "0 20px 40px rgba(60, 60, 60, 0.2)",
              "0 30px 60px rgba(80, 80, 80, 0.35)",
              "0 20px 40px rgba(60, 60, 60, 0.2)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="relative h-full w-full rounded-lg p-1.5 border border-neutral-600 bg-neutral-950 shadow-xl hover:border-neutral-500 transition-colors duration-300"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.12s ease-out",
          }}
        >
          <img
            src={imageSrc || "/placeholder.svg"}
            alt="Srajal Tiwari"
            className="h-full w-full rounded-lg object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    )
  }

  // Canvas Mode
  if (mode === "canvas" && !isMobile && !prefersReducedMotion) {
    return (
      <motion.div
        ref={containerRef}
        className={`relative mx-auto w-72 h-96 md:w-80 md:h-full ${className}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          setRotation({
            x: ((y - centerY) / centerY) * 15,
            y: ((centerX - x) / centerX) * 15,
          })
        }}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(100, 100, 100, 0.2)",
              "0 0 35px rgba(100, 100, 100, 0.3)",
              "0 0 20px rgba(100, 100, 100, 0.2)",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="relative h-full w-full rounded-lg p-1 border border-neutral-700 bg-neutral-900 shadow-xl overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full rounded-lg object-cover"
            style={{
              transform: `rotateX(${rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg)`,
            }}
          />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`relative mx-auto w-72 h-96 md:w-80 md:h-full ${className}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(100, 100, 100, 0.2)",
            "0 0 35px rgba(100, 100, 100, 0.3)",
            "0 0 20px rgba(100, 100, 100, 0.2)",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="relative h-full w-full rounded-lg p-1.5 border border-neutral-600 bg-neutral-950 shadow-xl hover:border-neutral-500 transition-colors duration-300"
      >
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Srajal Tiwari"
          className="h-full w-full rounded-lg object-cover"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  )
}
