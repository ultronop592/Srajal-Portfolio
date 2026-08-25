"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface TiltCard3DProps {
  children: React.ReactNode
  className?: string
  tiltStrength?: number
  glareOpacity?: number
}

export function TiltCard3D({
  children,
  className = "",
  tiltStrength = 12,
  glareOpacity = 0.12,
}: TiltCard3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for 60fps smooth response
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltStrength, -tiltStrength])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltStrength, tiltStrength])

  // Specular light position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}

      {/* Subtle Specular Sheen Effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-inherit overflow-hidden"
          style={{
            background: `radial-gradient(600px circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 40%)`,
          }}
        />
      )}
    </motion.div>
  )
}
