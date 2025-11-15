"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PremiumIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showSkip, setShowSkip] = useState(true)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setIsReducedMotion(prefersReduced)

    if (prefersReduced) {
      setTimeout(onComplete, 1500)
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }[] = []

    const particleCount = 50 // Simplified particle effect - fewer particles
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: centerX + (Math.random() - 0.5) * 400,
        y: centerY + (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.6 + 0.4,
      })
    }

    const startTime = Date.now()
    let animationId: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / 4000, 1) // Extended to 4 seconds for smoother animation

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.98)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grey gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(20, 20, 20, 0.4)")
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.5)")
      gradient.addColorStop(1, "rgba(30, 30, 30, 0.3)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw morphing particles with grey tones
      particles.forEach((p) => {
        const moveAmount = 50 - progress * 50
        p.x += Math.cos(Date.now() * 0.001 + p.radius) * 0.3
        p.y += Math.sin(Date.now() * 0.001 + p.radius) * 0.3

        // Subtle glow
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
        glowGradient.addColorStop(0, `rgba(140, 140, 140, ${p.opacity * 0.4})`)
        glowGradient.addColorStop(1, "rgba(140, 140, 140, 0)")
        ctx.fillStyle = glowGradient
        ctx.fillRect(p.x - p.radius * 2, p.y - p.radius * 2, p.radius * 4, p.radius * 4)

        // Particle
        ctx.fillStyle = `rgba(170, 170, 170, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connecting lines - subtle grey
      for (let i = 0; i < particles.length; i += 6) {
        for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.strokeStyle = `rgba(100, 100, 100, ${(1 - dist / 120) * 0.25 * (1 - progress)})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw center text
      const textOpacity = Math.max(0, Math.sin(progress * Math.PI) * 0.7)
      ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`
      ctx.font = "bold 48px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Srajal Tiwari", centerX, centerY - 40)

      ctx.font = "16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.fillStyle = `rgba(180, 180, 180, ${textOpacity})`
      ctx.fillText("AI Engineer | Machine Learning Developer", centerX, centerY + 30)

      // Light ring effect - grey
      if (progress < 0.7) {
        ctx.strokeStyle = `rgba(100, 100, 100, ${(0.7 - progress) * 0.2})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(centerX, centerY, 80 + progress * 180, 0, Math.PI * 2)
        ctx.stroke()
      }

      const progressPercent = Math.round(progress * 100)

      // Draw progress circle background
      ctx.strokeStyle = "rgba(80, 80, 80, 0.3)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2)
      ctx.stroke()

      // Draw progress circle foreground - grey
      ctx.strokeStyle = "rgba(150, 150, 150, 0.8)"
      ctx.lineWidth = 3
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 70, -Math.PI / 2, -Math.PI / 2 + progress * Math.PI * 2)
      ctx.stroke()

      // Draw percentage text in center
      ctx.fillStyle = `rgba(200, 200, 200, ${0.8 + Math.sin(progress * Math.PI * 2) * 0.2})`
      ctx.font = "bold 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${progressPercent}%`, centerX, centerY - 30)

      // Draw loading text
      ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      ctx.fillStyle = "rgba(130, 130, 130, 0.7)"
      const dots = ".".repeat((Math.floor(progress * 12) % 4) + 1)
      ctx.fillText(`Loading${dots}`, centerX, centerY + 50)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full bg-black" />

        {showSkip && !isReducedMotion && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            onClick={onComplete}
            onAnimationComplete={() => setShowSkip(false)}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 right-8 px-6 py-2 border border-neutral-600 rounded-full text-neutral-400 hover:text-white hover:border-white transition-all duration-300 text-sm"
          >
            Skip Intro
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
