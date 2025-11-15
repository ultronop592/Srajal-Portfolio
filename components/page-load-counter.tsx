"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function PageLoadCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    let animationFrameId: number
    let currentCount = 0
    const targetCount = 100
    const startTime = Date.now()
    const duration = 2800 // 2.8 seconds for smooth counting

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuad = 1 - Math.pow(1 - progress, 2)
      currentCount = Math.floor(easeOutQuad * targetCount)

      setCount(currentCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(100)
      }
    }

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate)
    }, 200)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0 bg-black/50 backdrop-blur-lg"
      />

      {/* Main counter container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-500"
          style={{ width: "220px", height: "220px", marginLeft: "-10px", marginTop: "-10px" }}
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-b-purple-400 border-l-blue-400"
          style={{ width: "220px", height: "220px", marginLeft: "-10px", marginTop: "-10px" }}
        />

        {/* Counter display */}
        <div className="relative bg-gradient-to-br from-neutral-900/95 to-black/95 backdrop-blur-2xl border border-neutral-700 rounded-full w-48 h-48 flex flex-col items-center justify-center shadow-2xl">
          {/* Animated background orbs */}
          <motion.div
            animate={{
              x: [0, 15, -15, 0],
              y: [0, 10, -10, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/8 to-purple-500/8 blur-2xl"
          />

          {/* Counter text with pulse */}
          <motion.div className="relative z-10 text-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 40px rgba(59, 130, 246, 0.6)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="text-6xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-200 bg-clip-text text-transparent"
            >
              {count}%
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-sm text-neutral-300 mt-3 tracking-widest uppercase font-medium"
            >
              Initializing
            </motion.p>
          </motion.div>

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.cos((i / 8) * Math.PI * 2) * 50, 0],
                y: [0, Math.sin((i / 8) * Math.PI * 2) * 50, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3.5 + i * 0.15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -3,
                marginTop: -3,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom text with smooth animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="absolute bottom-24 text-center"
      >
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="text-neutral-300 text-sm font-medium"
        >
          Loading your portfolio
        </motion.p>
        <motion.div className="flex justify-center gap-2 mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
