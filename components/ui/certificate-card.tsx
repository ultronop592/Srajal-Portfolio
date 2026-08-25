"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ExternalLink, Award, ShieldCheck } from "lucide-react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   ENHANCED CERTIFICATE CARD
   • 3D Tilt wrapper with specular glare
   • Cybernetic corner reticles & status LED
   • Level badges with clean emerald/gold/cyan highlights
   • External verification button with arrow hover
───────────────────────────────────────────────────────── */

interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  issuer: string
  date: string
  level: string
  link?: string
  index?: number
}

const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
  ({ className, title, issuer, date, level, link, index = 0, ...props }, ref) => {

    const getLevelColor = (level: string) => {
      const levelMap: { [key: string]: { bg: string; text: string; border: string } } = {
        Beginner: {
          bg: "bg-emerald-950/60",
          text: "text-emerald-300",
          border: "border-emerald-500/30",
        },
        Intermediate: {
          bg: "bg-emerald-950/60",
          text: "text-emerald-300",
          border: "border-emerald-500/40",
        },
        Advanced: {
          bg: "bg-emerald-950/80",
          text: "text-emerald-300",
          border: "border-emerald-400/50",
        },
        Expert: {
          bg: "bg-amber-950/60",
          text: "text-amber-300",
          border: "border-amber-500/40",
        },
        Professional: {
          bg: "bg-emerald-950/60",
          text: "text-emerald-300",
          border: "border-emerald-500/30",
        },
      }
      return levelMap[level] || {
        bg: "bg-neutral-900/60",
        text: "text-neutral-300",
        border: "border-neutral-700",
      }
    }

    const levelStyle = getLevelColor(level)

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
        className="w-full h-full"
        {...props}
      >
        <TiltCard3D tiltStrength={8} glareOpacity={0.12} className="w-full h-full">
          <div
            className={cn(
              "group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border backdrop-blur-xl",
              "bg-neutral-950/85 border-emerald-500/15 shadow-2xl",
              "hover:border-emerald-500/40 hover:bg-neutral-900/90 transition-all duration-500",
              "p-6 cursor-pointer",
              className
            )}
          >
            {/* Corner Brackets */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none" />

            {/* Gradient Top Border Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header Content */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border shadow-sm",
                    levelStyle.bg,
                    levelStyle.text,
                    levelStyle.border
                  )}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{level}</span>
                </span>

                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  VERIFIED
                </span>
              </div>

              {/* Certificate Title */}
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 leading-snug tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                {title}
              </h3>

              {/* Issuer and Date */}
              <div className="space-y-1 pt-1">
                <p className="text-sm font-semibold text-emerald-400 font-mono">{issuer}</p>
                {date && <p className="text-xs text-neutral-400 font-mono">{date}</p>}
              </div>
            </div>

            {/* Footer Verification Link */}
            {link && (
              <div className="relative z-10 pt-4 mt-4 border-t border-emerald-500/10 flex items-center justify-between">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400/90 group-hover:text-emerald-300 transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </div>
            )}
          </div>
        </TiltCard3D>
      </motion.div>
    )
  }
)

CertificateCard.displayName = "CertificateCard"

export { CertificateCard }
