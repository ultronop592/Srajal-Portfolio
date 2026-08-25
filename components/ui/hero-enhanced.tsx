"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { Download, Github, Linkedin, Code, ArrowRight } from "lucide-react"

/* ─────────────────────────────────────────────────────────
   HERO ENHANCED v3
   • Morphing subtitle with smooth letter swap
   • Floating particle canvas (pure CSS / JS)
   • Magnetic cursor pull on CTA buttons
   • Orbital ring around the portrait
   • Staggered kinetic reveal of every element
   • Minimal – zero glow overload
───────────────────────────────────────────────────────── */

const SUBTITLES = [
  "Machine Learning Engineer",
  "Generative AI Builder",
  "RAG & LLM Expert",
  "Data → Decisions",
]

const SKILLS = ["Python", "PyTorch", "LangChain", "FastAPI", "HuggingFace", "SQL"]

// Floating dot positions (deterministic so no hydration mismatch)
const DOTS = Array.from({ length: 18 }, (_, i) => ({
  x: ((i * 53 + 17) % 100),
  y: ((i * 37 + 11) % 100),
  r: 1.2 + (i % 3) * 0.6,
  dur: 4 + (i % 4) * 1.5,
  delay: (i % 6) * 0.6,
}))

export default function HeroEnhanced({ onDownloadResume }: { onDownloadResume: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [subtitleIdx, setSubtitleIdx] = useState(0)
  const [animClass, setAnimClass] = useState("hero-sub-in")
  const heroRef = useRef<HTMLElement | null>(null)

  // ── Mount ──────────────────────────────────────────────
  useEffect(() => { setMounted(true) }, [])

  // ── Rotating subtitle with cross-fade ─────────────────
  useEffect(() => {
    if (!mounted) return
    const id = setInterval(() => {
      setAnimClass("hero-sub-out")
      setTimeout(() => {
        setSubtitleIdx(p => (p + 1) % SUBTITLES.length)
        setAnimClass("hero-sub-in")
      }, 350)
    }, 3200)
    return () => clearInterval(id)
  }, [mounted])

  // ── Magnetic button effect ─────────────────────────────
  const magnetRef = useCallback((el: HTMLButtonElement | null) => {
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`
    }
    const onLeave = () => { el.style.transform = "" }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
  }, [])

  return (
    <section
      ref={el => { heroRef.current = el }}
      className="hero-v3-root relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background Mesh ─────────────────────────────── */}
      <div className="hero-v3-bg" aria-hidden="true">
        {/* Subtle grid */}
        <div className="hero-v3-grid" />
        {/* Radial fade in */}
        <div className="hero-v3-radial" />
        {/* Floating dots */}
        {mounted && DOTS.map((d, i) => (
          <span
            key={i}
            className="hero-dot"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.r * 2,
              height: d.r * 2,
              animationDuration: `${d.dur}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
        {/* Diagonal accent line */}
        <div className="hero-v3-diag" />
      </div>

      {/* ── Content Grid ────────────────────────────────── */}
      <div className="hero-v3-container">
        {/* ── LEFT COLUMN ─────────────────────────────── */}
        <div className="hero-v3-left">
          {/* Step label */}
          <div className="hero-v3-label hero-anim-1">
            <span className="hero-v3-dot-blink" />
            <span>Welcome to my Portfolio</span>
          </div>

          {/* Name – large kinetic text */}
          <h1 className="hero-v3-name hero-anim-2">
            {"Srajal".split("").map((l, i) => (
              <span key={i} className="hero-letter" style={{ "--i": i } as React.CSSProperties}>
                {l}
              </span>
            ))}
            <br />
            {"Tiwari".split("").map((l, i) => (
              <span key={i} className="hero-letter hero-letter-2" style={{ "--i": i } as React.CSSProperties}>
                {l}
              </span>
            ))}
          </h1>

          {/* Rotating subtitle */}
          <div className="hero-v3-subtitle-wrap hero-anim-3" aria-live="polite">
            <span className="hero-v3-chevron">/&gt;</span>
            <span key={subtitleIdx} className={`hero-v3-subtitle ${animClass}`}>
              {SUBTITLES[subtitleIdx]}
            </span>
            <span className="hero-v3-cursor" />
          </div>

          {/* Bio */}
          <p className="hero-v3-bio hero-anim-4">
            I build AI/ML products that turn data into decisions. Exploring the world of Generative AI
            | Passionate about AI that learns, creates, and reasons | RAG | LLMs | Hugging Face
          </p>

          {/* Skill pills */}
          <div className="hero-v3-pills hero-anim-5">
            {SKILLS.map((s, i) => (
              <span key={s} className="hero-pill" style={{ "--pi": i } as React.CSSProperties}>
                {s}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div className="hero-v3-cta hero-anim-6">
            <button
              ref={magnetRef}
              onClick={onDownloadResume}
              className="hero-btn-primary"
              id="hero-download-resume"
            >
              <Download className="h-4 w-4" />
              <span>Resume</span>
              <ArrowRight className="h-4 w-4 hero-btn-arrow" />
            </button>

            {([
              { Icon: Github,   label: "GitHub",   url: "https://github.com/ultronop592" },
              { Icon: Linkedin, label: "LinkedIn",  url: "https://linkedin.com/in/srajal-tiwari-7229172b9" },
              { Icon: Code,     label: "LeetCode",  url: "https://leetcode.com/u/SrajalTiwari/" },
            ] as const).map(({ Icon, label, url }) => (
              <button
                key={label}
                onClick={() => window.open(url, "_blank")}
                className="hero-btn-ghost"
                id={`hero-link-${label.toLowerCase()}`}
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN – Portrait ──────────────────── */}
        <div className="hero-v3-right hero-anim-right">
          {/* Orbital rings */}
          <div className="hero-orbit-wrap">
            <div className="hero-orbit hero-orbit-1" />
            <div className="hero-orbit hero-orbit-2" />
            {/* Corner brackets */}
            <div className="hero-corner hero-corner-tl" />
            <div className="hero-corner hero-corner-tr" />
            <div className="hero-corner hero-corner-bl" />
            <div className="hero-corner hero-corner-br" />

            {/* Portrait */}
            <div className="hero-portrait-frame">
              {/* Scan line overlay */}
              <div className="hero-scan" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-3d.png"
                alt="Srajal Tiwari – ML Engineer"
                className="hero-portrait-img"
                loading="eager"
                fetchPriority="high"
              />
              {/* Name overlay */}
              <div className="hero-portrait-name">
                <span>SRAJAL TIWARI</span>
              </div>
            </div>

            {/* Floating status chip */}
            <div className="hero-status-chip">
              <span className="hero-status-led" />
              <span>Available for hire</span>
            </div>

            {/* Monospace meta labels */}
            <span className="hero-meta hero-meta-top">[ LKO · IN · 2025 ]</span>
            <span className="hero-meta hero-meta-bottom">BATCH: 2023_2027</span>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────── */}
      {mounted && (
        <div className="hero-v3-scroll" aria-hidden="true">
          <span>scroll</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-thumb" />
          </div>
        </div>
      )}
    </section>
  )
}
