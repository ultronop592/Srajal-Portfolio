"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface HeroShowcaseProps {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export default function HeroShowcase({ children, className, contentClassName }: HeroShowcaseProps) {
  return (
    <section className={cn("relative min-h-[90vh] overflow-hidden bg-black", className)}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f1f1f,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.25),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,rgba(244,63,94,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.9))]" />
      </div>

      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-hero-drift" />
      <div className="absolute bottom-[-20%] left-[-10%] h-80 w-80 rounded-full bg-rose-500/20 blur-3xl animate-hero-drift-slow" />

      <div className={cn("relative z-10 flex min-h-[90vh] items-center", contentClassName)}>{children}</div>

      <style jsx>{`
        @keyframes heroDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(30px, -20px, 0) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes heroDriftSlow {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-20px, 30px, 0) scale(1.08);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .animate-hero-drift {
          animation: heroDrift 14s ease-in-out infinite;
        }

        .animate-hero-drift-slow {
          animation: heroDriftSlow 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
