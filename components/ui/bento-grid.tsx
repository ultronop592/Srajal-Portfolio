"use client"

import type React from "react"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   MINIMAL & MODERN BENTO GRID & CARD
   • Ultra-clean glassmorphic surface with subtle 1px border
   • Soft ambient hover glow (no harsh brackets or scanlines)
   • Minimalist skill chips with smooth hover states
   • Refined typography and balanced whitespace
───────────────────────────────────────────────────────── */

interface BentoCardProps {
  name: string
  className?: string
  background?: ReactNode
  Icon: React.ComponentType<{ className?: string }>
  description: string
  items?: string[]
  tagline?: string
  href?: string
  cta?: string
  highlightSkills?: string[]
}

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 gap-6",
        className
      )}
    >
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
  href = "#skills",
  cta = "Explore Details",
  highlightSkills = ["Python", "LangGraph", "FastAPI", "PyTorch", "Next.js 15", "vLLM", "AI Agents & Multi-Agent Systems"],
}: BentoCardProps) => {
  // Parse items from description if not explicitly provided
  const skillPills =
    items || (description ? description.split(" • ").map((s) => s.trim()) : [])

  return (
    <TiltCard3D tiltStrength={6} glareOpacity={0.08} className={cn("col-span-1 h-full", className)}>
      <div
        className={cn(
          "group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl",
          "bg-neutral-900/40 backdrop-blur-md border border-white/[0.08]",
          "hover:border-emerald-500/30 hover:bg-neutral-900/70 transition-all duration-300",
          "p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5"
        )}
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Optional background element */}
        {background && (
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {background}
          </div>
        )}

        {/* Card Header & Content */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors duration-200 tracking-tight"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {name}
                </h3>
                {tagline && (
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/80 font-medium">
                    {tagline}
                  </span>
                )}
              </div>
            </div>

            {/* Skill count badge */}
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neutral-800/60 text-neutral-400 border border-white/[0.06]">
              {skillPills.length} items
            </span>
          </div>

          {/* Minimal Skill Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {skillPills.map((pill, idx) => {
              const isHighlight = highlightSkills.some(
                (h) => h.toLowerCase() === pill.toLowerCase()
              )

              return (
                <span
                  key={idx}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-default",
                    isHighlight
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/50 shadow-sm"
                      : "bg-neutral-800/40 text-neutral-300 border border-white/[0.07] hover:border-emerald-500/30 hover:text-emerald-200 hover:bg-neutral-800/70"
                  )}
                >
                  {isHighlight && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 -translate-y-0.5" />
                  )}
                  {pill}
                </span>
              )
            })}
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 flex items-center justify-between pt-4 mt-5 border-t border-white/[0.06]">
          <span className="text-xs font-mono text-neutral-400 group-hover:text-neutral-300 transition-colors">
            Production Ready
          </span>

          {href && (
            <a
              href={href}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>{cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </TiltCard3D>
  )
}

export { BentoCard, BentoGrid }
