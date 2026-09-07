"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  Cloud,
  Terminal,
  Shield,
  BookOpen,
  Award,
  Hash,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────
   MINIMAL & REFINED CERTIFICATE CARD
   • Clean glassmorphic surface with subtle 1px border
   • Semantic brand issuer badges with soft accent colors
   • Monospace credential identifier display
   • Sleek verified credential status indicator
   • Smooth micro-interaction hover states
───────────────────────────────────────────────────────── */

export interface CertificateCardProps {
  title: string
  issuer: string
  date: string
  level: string
  link?: string
  index?: number
  className?: string
}

export const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
  ({ className, title, issuer, date, level, link, index = 0 }, ref) => {
    // Extract Credential ID if present in the link
    const getCredentialId = (url?: string) => {
      if (!url) return null
      try {
        // e.g. oneroadmap.io/.../CERT-3F16AC9E
        const certMatch = url.match(/CERT-[A-Z0-9]+/i)
        if (certMatch) return certMatch[0]

        // e.g. verify.skilljar.com/c/38cewzq2oxx9
        const skilljarMatch = url.match(/skilljar\.com\/c\/([a-z0-9]+)/i)
        if (skilljarMatch) return skilljarMatch[1]

        // e.g. learn.microsoft.com/.../JU8CZFWT
        const msMatch = url.match(/\/([A-Z0-9]{8})\?sharingId/i)
        if (msMatch) return msMatch[1]

        // e.g. life-global.org/certificate/415697e9-...
        const lifeMatch = url.match(/certificate\/([a-f0-9]{8})/i)
        if (lifeMatch) return lifeMatch[1]

        return null
      } catch {
        return null
      }
    }

    const credId = getCredentialId(link)

    // Level styling: minimal and balanced
    const getLevelStyle = (lvl: string) => {
      switch (lvl.toLowerCase()) {
        case "expert":
          return {
            pill: "bg-amber-500/10 text-amber-300 border-amber-500/20",
            dot: "bg-amber-400",
          }
        case "advanced":
          return {
            pill: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
            dot: "bg-emerald-400",
          }
        case "professional":
          return {
            pill: "bg-teal-500/10 text-teal-300 border-teal-500/20",
            dot: "bg-teal-400",
          }
        case "intermediate":
          return {
            pill: "bg-sky-500/10 text-sky-300 border-sky-500/20",
            dot: "bg-sky-400",
          }
        default:
          return {
            pill: "bg-neutral-500/10 text-neutral-300 border-neutral-500/20",
            dot: "bg-neutral-400",
          }
      }
    }

    // Issuer identity styling: refined brand accents
    const getIssuerMeta = (iss: string) => {
      const lower = iss.toLowerCase()
      if (lower.includes("anthropic")) {
        return {
          icon: Sparkles,
          color: "text-amber-300 bg-amber-500/10 border-amber-500/20",
          label: "Anthropic",
        }
      }
      if (lower.includes("microsoft")) {
        return {
          icon: Terminal,
          color: "text-sky-300 bg-sky-500/10 border-sky-500/20",
          label: "Microsoft",
        }
      }
      if (lower.includes("aws")) {
        return {
          icon: Cloud,
          color: "text-orange-300 bg-orange-500/10 border-orange-500/20",
          label: "AWS Skill Builder",
        }
      }
      if (lower.includes("deloitte")) {
        return {
          icon: Shield,
          color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
          label: "Deloitte",
        }
      }
      if (lower.includes("hp")) {
        return {
          icon: Award,
          color: "text-blue-300 bg-blue-500/10 border-blue-500/20",
          label: "HP LIFE",
        }
      }
      if (lower.includes("roadmap")) {
        return {
          icon: BookOpen,
          color: "text-purple-300 bg-purple-500/10 border-purple-500/20",
          label: "One Roadmap",
        }
      }
      return {
        icon: Award,
        color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
        label: iss,
      }
    }

    const levelConfig = getLevelStyle(level)
    const issuerMeta = getIssuerMeta(issuer)
    const IssuerIcon = issuerMeta.icon

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4, ease: "easeOut" }}
        className="w-full h-full"
      >
        <div
          className={cn(
            "group relative h-full flex flex-col justify-between overflow-hidden rounded-2xl",
            "bg-neutral-900/40 backdrop-blur-md border border-white/[0.08]",
            "hover:border-emerald-500/30 hover:bg-neutral-900/70 transition-all duration-300",
            "p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5",
            className
          )}
        >
          {/* Subtle Ambient Radial Glow on Hover */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />

          {/* Top Row: Issuer Badge & Level Pill */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-2">
              {/* Issuer Badge */}
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border",
                  issuerMeta.color
                )}
              >
                <IssuerIcon className="w-3.5 h-3.5" />
                <span>{issuerMeta.label}</span>
              </div>

              {/* Status / Level Tag */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border",
                    levelConfig.pill
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", levelConfig.dot)} />
                  {level}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Verified</span>
                </span>
              </div>
            </div>

            {/* Certificate Title */}
            <div>
              <h3
                className="text-base sm:text-lg font-bold text-neutral-100 group-hover:text-emerald-300 transition-colors duration-200 leading-snug tracking-tight line-clamp-2"
                style={{ fontFamily: "Syne, sans-serif" }}
                title={title}
              >
                {title}
              </h3>
            </div>

            {/* Metadata: Date and Credential ID */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-neutral-400 font-mono">
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  <span>{date}</span>
                </div>
              )}

              {credId && (
                <div className="flex items-center gap-1 text-neutral-400 bg-neutral-800/40 px-2 py-0.5 rounded border border-white/5">
                  <Hash className="w-2.5 h-2.5 text-emerald-400/70" />
                  <span className="text-[11px]">{credId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer: Action Link */}
          <div className="relative z-10 pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">
              Credential Verification
            </span>

            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 group/btn"
              >
                <span>Verify</span>
                <ExternalLink className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </a>
            ) : (
              <span className="text-xs font-mono text-neutral-400">Archived Record</span>
            )}
          </div>
        </div>
      </motion.div>
    )
  }
)

CertificateCard.displayName = "CertificateCard"
