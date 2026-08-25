"use client"

import type React from "react"
import type { ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   ENHANCED BENTO GRID & BENTO CARD
   • Interactive skill pills with micro-hover scaling
   • Cybernetic corner brackets & status LED
   • Subtle scanning line background effect
   • 3D tilt with specular reflections
───────────────────────────────────────────────────────── */

interface BentoCardProps {
  name: string
  className?: string
  background?: ReactNode
  Icon: React.ComponentType<{ className?: string }>
  description: string
  items?: string[]
  tagline?: string
  href: string
  cta: string
}

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  items,
  tagline,
  href,
  cta,
}: BentoCardProps) => {
  // Parse items from description if not explicitly provided as an array
  const skillPills = items || (description ? description.split(" • ").map(s => s.trim()) : [])

  return (
    <TiltCard3D tiltStrength={10} glareOpacity={0.12} className={cn("col-span-1 lg:col-span-3 h-full", className)}>
      <div
        className={cn(
          "group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl",
          "bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/15 shadow-2xl",
          "transition-all duration-500 hover:border-emerald-500/40 hover:bg-neutral-900/90"
        )}
      >
        {/* Background layer */}
        <div className="absolute inset-0 pointer-events-none">{background}</div>

        {/* Ambient subtle tech scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)`,
            backgroundSize: "100% 4px",
          }}
        />

        {/* Corner Reticle Brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all duration-300 pointer-events-none" />

        {/* Card Content Header */}
        <div className="relative z-10 flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Icon className="h-6 w-6 text-emerald-400 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-100 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                  {name}
                </h3>
                {tagline && (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/70">
                    {tagline}
                  </span>
                )}
              </div>
            </div>

            {/* Micro status LED indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-[10px] font-mono text-emerald-400/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>

          {/* Skill Pills Grid */}
          <div className="flex flex-wrap gap-2 pt-2">
            {skillPills.map((pill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium border border-emerald-500/20 bg-emerald-950/30 text-neutral-300 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-200 cursor-default shadow-sm"
              >
                <span className="text-emerald-500/60 mr-1">#</span>
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer / Action Link */}
        <div className="relative z-10 flex items-center justify-between p-4 px-6 border-t border-emerald-500/10 bg-neutral-950/40 group-hover:bg-neutral-950/60 transition-colors duration-300">
          <span className="text-xs font-mono text-neutral-400 group-hover:text-emerald-400/80 transition-colors">
            {skillPills.length} Technologies
          </span>
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="text-emerald-400 hover:text-white hover:bg-emerald-500/20 border border-emerald-500/30 group-hover:border-emerald-500/60 transition-all duration-300"
          >
            <a href={href} className="flex items-center gap-1.5 font-mono text-xs font-semibold">
              <span>{cta}</span>
              <ArrowRightIcon className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </Button>
        </div>
      </div>
    </TiltCard3D>
  )
}

export { BentoCard, BentoGrid }
