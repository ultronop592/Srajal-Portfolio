"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sparkles, CheckCircle2 } from "lucide-react"

/* ─────────────────────────────────────────────────────────
   3D INTERACTIVE HOLOGRAPHIC CARD FAN
   • True 3D perspective fan with dynamic hover spreading
   • Click-to-promote card to front of stack with spring physics
   • Gyroscopic cursor tracking for multi-axis depth
   • Glowing cyber reticles, corner brackets & status LED
───────────────────────────────────────────────────────── */

export interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      title: "Education",
      description: "4th Year B.Tech CSE (AI) · CGPA: 8.4",
      date: "2023 - 2027",
    },
    {
      title: "Recognition",
      description: "Ex Amazon ML School 2026",
      date: "Selected ML Scholar",
    },
    {
      title: "Status",
      description: "Seeking AI / ML Roles",
      date: "Actively Interviewing",
    },
  ]

  const displayCards = cards || defaultCards
  const [activeCard, setActiveCard] = useState<number>(displayCards.length - 1)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  return (
    <div
      className="relative w-full max-w-[24rem] h-[19rem] flex items-center justify-center select-none py-4"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
    >
      {/* Ambient background bloom */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-emerald-500/15 rounded-3xl blur-2xl pointer-events-none opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Floating 3D Cluster */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          rotateX: isHovered ? mousePos.y * -14 : 0,
          rotateY: isHovered ? mousePos.x * 16 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {displayCards.map((card, idx) => {
          const isSelected = activeCard === idx
          const offset = idx - activeCard
          
          // Calculated 3D coordinates based on fan spread vs rest
          const xOffset = isHovered ? (idx - 1) * 75 : idx * 16
          const yOffset = isHovered ? (idx === 1 ? -22 : 8) : idx * 14
          const rotateZ = isHovered ? (idx - 1) * 7 : (idx - 1) * -3
          const zDepth = isSelected ? 40 : 10 - Math.abs(offset) * 10
          const scale = isSelected ? 1.04 : 0.96

          return (
            <motion.div
              key={idx}
              onClick={() => setActiveCard(idx)}
              animate={{
                x: xOffset,
                y: yOffset,
                rotateZ,
                scale,
                zIndex: isSelected ? 30 : 10 - Math.abs(offset),
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
              style={{
                transformStyle: "preserve-3d",
                translateZ: zDepth,
              }}
              whileHover={{
                scale: 1.06,
                translateZ: zDepth + 20,
                transition: { duration: 0.2 },
              }}
              className={cn(
                "absolute w-[18.5rem] sm:w-[21rem] h-36 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 backdrop-blur-xl shadow-2xl border",
                isSelected
                  ? "bg-neutral-950/95 border-emerald-500/60 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40"
                  : "bg-neutral-950/80 border-emerald-500/20 shadow-xl opacity-90 hover:opacity-100 hover:border-emerald-500/40"
              )}
            >
              {/* Corner Cyber Brackets */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-500/40 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-emerald-500/40 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-emerald-500/40 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-500/40 pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "p-1.5 rounded-lg border flex items-center justify-center text-emerald-400 shadow-sm",
                      card.iconClassName || "bg-emerald-950/70 border-emerald-500/30"
                    )}
                  >
                    {card.icon || <Sparkles className="size-4 text-emerald-400" />}
                  </span>
                  <span className={cn("text-sm sm:text-base font-bold tracking-tight font-mono", card.titleClassName || "text-white")}>
                    {card.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isSelected ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-300 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-neutral-700 border border-neutral-600" />
                  )}
                </div>
              </div>

              {/* Description & Subtitle */}
              <div className="z-10">
                <p className="text-xs sm:text-sm font-semibold text-neutral-200 font-mono tracking-tight line-clamp-1">
                  {card.description}
                </p>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono">
                  <span className="text-emerald-400/80 font-medium">{card.date}</span>
                  <span className="text-neutral-500 text-[10px]">TAP TO INSPECT</span>
                </div>
              </div>

              {/* Holographic scanning overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
