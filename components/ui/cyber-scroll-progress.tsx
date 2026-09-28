"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, Compass, Activity } from "lucide-react"

/* ─────────────────────────────────────────────────────────
   CYBER SCROLL PROGRESS & TACTICAL WAYPOINT HUD
   • Fixed top laser beam with traveling neon spark
   • Floating telemetry meter showing live scroll percentage
   • Real-time section detection (About, Sandbox, Explore, etc.)
   • Tactical waypoint navigator with smooth jump actions
   • Circular radial SVG progress ring with back-to-top trigger
───────────────────────────────────────────────────────── */

const SECTIONS = [
  { id: "hero", label: "INIT // HERO" },
  { id: "about-me", label: "SYS // ABOUT" },
  { id: "agent-sandbox", label: "MCP // SANDBOX" },
  { id: "stats", label: "TELEMETRY // STATS" },
  { id: "explore", label: "CORE // EXPLORE" },
  { id: "skills", label: "MATRIX // SKILLS" },
  { id: "projects", label: "FEATURED // BUILDS" },
  { id: "certifications", label: "CERTS // CREDENTIALS" },
  { id: "experience", label: "LOG // EXPERIENCE" },
  { id: "achievements", label: "AWARDS // PODIUM" },
  { id: "contact", label: "DISPATCH // CONTACT" },
]

export default function CyberScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  const [percent, setPercent] = useState(0)
  const [activeSection, setActiveSection] = useState("INIT // HERO")
  const [showHud, setShowHud] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const rounded = Math.round(latest * 100)
      setPercent(rounded)
      setShowHud(rounded > 2)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = document.getElementById(SECTIONS[i].id)
        if (sec) {
          const top = sec.offsetTop
          if (scrollPos >= top) {
            setActiveSection(SECTIONS[i].label)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToNextSection = () => {
    const currentIndex = SECTIONS.findIndex((s) => s.label === activeSection)
    const nextIndex = (currentIndex + 1) % SECTIONS.length
    const nextSec = document.getElementById(SECTIONS[nextIndex].id)
    if (nextSec) {
      nextSec.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Radius for circular progress ring
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <>
      {/* ── TOP NEON LASER BEAM PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none overflow-visible">
        <motion.div
          style={{ scaleX, transformOrigin: "0%" }}
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.8),0_0_24px_rgba(6,182,212,0.6)]"
        />

        {/* Traveling Neon Spark at the Head of the Laser */}
        <motion.div
          style={{
            left: `${percent}%`,
          }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 blur-[1px] shadow-[0_0_16px_#38bdf8,0_0_8px_#34d399] pointer-events-none transition-all duration-75"
        />
      </div>

      {/* ── FLOATING TACTICAL WAYPOINT HUD (BOTTOM RIGHT) ── */}
      <AnimatePresence>
        {showHud && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          >
            {/* Expanded Telemetry Capsule (revealed on hover) */}
            <motion.div
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-emerald-500/25 shadow-2xl hover:border-emerald-500/50 transition-all cursor-pointer group"
              onClick={scrollToNextSection}
              title="Click to jump to next section"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
                  WAYPOINT
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-300 tracking-wider">
                  {activeSection}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-400 group-hover:translate-y-0.5 transition-all" />
            </motion.div>

            {/* Circular HUD Dial with Progress & Back-to-Top Action */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="relative w-11 h-11 rounded-full bg-neutral-950/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-400 flex items-center justify-center shadow-2xl shadow-emerald-950/60 group transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Radial Progress Ring SVG */}
              <svg className="w-11 h-11 -rotate-90 pointer-events-none absolute inset-0">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-neutral-800/80"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-emerald-400 transition-all duration-150 ease-out"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center icon / percentage hover switch */}
              <div className="relative z-10 flex items-center justify-center text-emerald-400 font-mono text-[10px] font-bold">
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-emerald-400" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
