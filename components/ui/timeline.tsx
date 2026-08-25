"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   ENHANCED TIMELINE COMPONENT
   • Glowing pulse laser track with animated gradient line
   • High-tech year markers with status badges
   • Reticle brackets on timeline nodes
   • Specular 3D card wrapper for content blocks
───────────────────────────────────────────────────────── */

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full bg-transparent font-sans md:px-6" ref={containerRef}>
      <div ref={ref} className="relative max-w-6xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-16 md:gap-8 group">
            {/* Sticky Year / Stage Marker */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-36 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline Node Ring */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-neutral-950/90 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/50 group-hover:border-emerald-400 group-hover:scale-110 transition-all duration-300">
                <div className="h-3.5 w-3.5 rounded-full bg-emerald-400 border border-emerald-200 animate-pulse" />
              </div>

              {/* Title / Year Display */}
              <div className="hidden md:flex flex-col md:pl-20">
                <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-emerald-400 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400/60 uppercase mt-0.5">
                  {index === 0 ? "⚡ PRESENT / RECENT" : "📜 PREVIOUS MILESTONES"}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="relative pl-16 pr-2 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-emerald-400 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                {item.title}
              </h3>
              <TiltCard3D tiltStrength={6} glareOpacity={0.1} className="w-full">
                {item.content}
              </TiltCard3D>
            </div>
          </div>
        ))}

        {/* Laser Vertical Progress Line Track */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent pointer-events-none"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-600 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
