"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

/* ─────────────────────────────────────────────────────────
   ENHANCED DISPLAY CARDS
   • Stacked 3D cards with emerald border highlights
   • Corner reticles and glassmorphism styling
   • Smooth hover transition and depth contrast
───────────────────────────────────────────────────────── */

interface DisplayCardProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-emerald-400" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "bg-emerald-950/60 border border-emerald-500/30",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[20rem] sm:w-[22rem] -skew-y-[6deg] select-none flex-col justify-between rounded-2xl border border-emerald-500/20 bg-neutral-950/85 backdrop-blur-md px-5 py-4 transition-all duration-500 shadow-2xl hover:border-emerald-500/60 hover:bg-neutral-900/90 group",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-neutral-950 after:to-transparent after:content-[''] after:pointer-events-none",
        className,
      )}
    >
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />
      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />

      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <span className={cn("relative inline-flex items-center justify-center p-1.5 rounded-lg text-emerald-400 shadow-sm", iconClassName)}>
            {icon}
          </span>
          <p className={cn("text-base font-bold tracking-tight text-white font-mono", titleClassName)}>{title}</p>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
      </div>

      <p className="whitespace-nowrap text-sm font-semibold text-neutral-200 z-10 font-mono">{description}</p>
      <p className="text-xs font-mono text-emerald-400/70 z-10">{date}</p>
    </div>
  )
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[]
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-2xl before:outline-1 before:outline-emerald-500/20 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[80%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-2 before:absolute before:w-[100%] before:rounded-2xl before:outline-1 before:outline-emerald-500/20 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/50 grayscale-[80%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-8",
    },
  ]

  const displayCards = cards || defaultCards

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 py-6">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}
