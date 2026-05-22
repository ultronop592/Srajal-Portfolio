"use client"

import React, { useEffect, useState } from "react"
import { Download, Github, Linkedin, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const HeroEnhanced = ({ onDownloadResume }: { onDownloadResume: () => void }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [mounted, setMounted] = useState(false)

  const subtitles = [
    "Machine Learning Engineer",
    "Generative AI Builder",
    "RAG & LLM Expert",
    "Data → Decisions",
  ]
  const [currentSubtitle, setCurrentSubtitle] = useState(0)

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return

    const subtitle = subtitles[currentSubtitle]
    let charIndex = 0
    let isDeleting = false
    let timer: NodeJS.Timeout

    const type = () => {
      timer = setTimeout(() => {
        if (!isDeleting && charIndex < subtitle.length) {
          setDisplayedText(subtitle.slice(0, charIndex + 1))
          charIndex++
          type()
        } else if (!isDeleting && charIndex === subtitle.length) {
          // Wait before deleting
          isDeleting = true
          setTimeout(type, 2000)
        } else if (isDeleting && charIndex > 0) {
          setDisplayedText(subtitle.slice(0, charIndex - 1))
          charIndex--
          type()
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false
          setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
          type()
        }
      }, isDeleting ? 30 : 50)
    }

    type()
    return () => clearTimeout(timer)
  }, [currentSubtitle, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  const skills = ["AI/ML", "Generative AI", "Automation", "Data Apps"]

  return (
    <>
      {/* Background Tech Canvas (No Orange, No Glow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Technical Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "45px 45px",
            maskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 60%, transparent 100%)",
          }}
        />

        {/* Subtle panning data stream scanline */}
        <div
          className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
          style={{
            animation: "scanline 12s linear infinite",
            top: 0,
          }}
        />

        {/* Soft, deep ambient background lights (non-glowing, ultra-low opacity) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-950/10 rounded-full blur-[110px]" />

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" result=\"noise\"/></filter><rect width=\"100\" height=\"100\" fill=\"white\" filter=\"url(%23n)\"/></svg>')",
            backgroundSize: "100px 100px",
            animation: "noiseShimmer 20s linear infinite",
          }}
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
        {/* Left Panel - Content */}
        <div className="hero-slide-in">
          {/* Label */}
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm">
            <span className="pulsing-prompt">▸</span>
            <span className="text-xs md:text-sm tracking-widest uppercase text-emerald-400/80" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>
              Welcome to My Portfolio
            </span>
          </div>

          {/* Main Heading with Letter Reveal */}
          <div className="mb-6 flex flex-wrap gap-1">
            {"Srajal Tiwari".split("").map((letter, idx) => (
              <span
                key={idx}
                className="letter-reveal text-5xl md:text-7xl font-bold"
                style={{
                  fontFamily: "Syne, sans-serif",
                  background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animationDelay: `${idx * 0.08}s`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>

          {/* Subtitle - Typewriter Effect */}
          <div className="mb-6 min-h-[2.5rem] flex items-center">
            <div className="text-xl md:text-2xl font-semibold text-emerald-400/90" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              <span className="typewriter">{displayedText}</span>
            </div>
          </div>

          {/* Bio Text */}
          <p className="text-neutral-300 leading-relaxed max-w-xl mb-8 text-sm md:text-base animate-fade-in" style={{ fontFamily: "Inter, sans-serif" }}>
            I build AI/ML products that turn data into decisions. Exploring the world of Generative AI | Passionate
            about AI that learns, creates, and reasons | RAG | LLMs | Hugging Face
          </p>

          {/* Tech Stack Section (Hardware diagnostics style) */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: "🤖", label: "AI/ML" },
              { icon: "🧠", label: "Gen AI" },
              { icon: "⚡", label: "RAG/LLMs" },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="animate-fade-in relative p-3 rounded-lg border border-emerald-500/15 bg-neutral-900/60 backdrop-blur-md text-center hover:border-emerald-500/45 hover:bg-neutral-900/85 transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                {/* Active diagnostic status indicator */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors" />
                <div className="text-2xl md:text-3xl mb-1 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">{tech.icon}</div>
                <div className="text-xs md:text-sm text-neutral-300 group-hover:text-white transition-colors" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 500 }}>
                  {tech.label}
                </div>
              </div>
            ))}
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skills.map((tag, i) => (
              <div
                key={tag}
                className="tag-glow-hover relative"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.6 + i * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <Badge className="bg-neutral-800/50 text-neutral-200 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer">
                  <span className="pulsing-prompt text-emerald-400">▸</span>
                  {tag}
                </Badge>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Download Resume Button */}
            <button
              onClick={onDownloadResume}
              className="shimmer-sweep relative px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/40 group overflow-hidden"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
            >
              <Download className="inline-block h-4 w-4 mr-2" />
              Download Resume
            </button>

            {/* Social Buttons */}
            {[
              {
                icon: Github,
                label: "GitHub",
                url: "https://github.com/ultronop592",
                delay: 0.7,
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                url: "https://linkedin.com/in/srajal-tiwari-7229172b9",
                delay: 0.8,
              },
              {
                icon: Code,
                label: "LeetCode",
                url: "https://leetcode.com/u/SrajalTiwari/",
                delay: 0.9,
              },
            ].map((social, idx) => (
              <button
                key={idx}
                onClick={() => window.open(social.url, "_blank")}
                className="relative px-4 py-3 rounded-lg font-semibold text-neutral-200 border border-neutral-700 hover:border-emerald-500/60 bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 transform hover:scale-105 active:scale-95 group overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${social.delay}s forwards`,
                  opacity: 0,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                }}
              >
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <social.icon className="inline-block h-4 w-4 mr-2" />
                {social.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Hero Image with Diagnostic Canvas (No Glow) */}
        <div className="flex justify-center md:justify-end hero-fade-scale mt-8 md:mt-0">
          <div className="relative w-full max-w-sm mx-auto group">
            {/* Fine Corner Brackets */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-emerald-500/40 rounded-tl transition-all duration-300 group-hover:-top-5 group-hover:-left-5 group-hover:border-emerald-400" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t border-r border-emerald-500/40 rounded-tr transition-all duration-300 group-hover:-top-5 group-hover:-right-5 group-hover:border-emerald-400" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-emerald-500/40 rounded-bl transition-all duration-300 group-hover:-bottom-5 group-hover:-left-5 group-hover:border-emerald-400" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-emerald-500/40 rounded-br transition-all duration-300 group-hover:-bottom-5 group-hover:-right-5 group-hover:border-emerald-400" />

            {/* Diagnostic Monospace Metrics Overlay */}
            <div className="absolute -top-8 -left-2 font-mono text-[9px] text-emerald-500/50 leading-none select-none hidden sm:block tracking-wider">
              SYS_LOC: LKO.IN // BATCH: 2023_2027
            </div>
            <div className="absolute -top-8 -right-2 font-mono text-[9px] text-emerald-500/50 leading-none select-none hidden sm:block tracking-wider">
              [ MODEL: ENHANCED_V2.5 ]
            </div>
            <div className="absolute -bottom-8 -left-2 font-mono text-[9px] text-emerald-500/50 leading-none select-none hidden sm:block tracking-wider">
              CUDA_CORE: ACTIVE
            </div>
            <div className="absolute -bottom-8 -right-2 font-mono text-[9px] text-emerald-500/50 leading-none select-none hidden sm:block tracking-wider">
              STATUS: READYSTREAM
            </div>

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/15 bg-neutral-900/60 backdrop-blur-sm shadow-2xl shadow-black/85 transition-all duration-500 hover:border-emerald-500/40">
              {/* High-tech reticle overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(10,10,10,0.6)_100%)] mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 border border-emerald-500/10 rounded-2xl pointer-events-none transition-all duration-500 group-hover:border-emerald-500/25" />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-3d.png"
                alt="Srajal Tiwari"
                className="w-full h-auto object-cover filter grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
              />

              {/* Name Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                <div
                  className="text-xl md:text-2xl font-bold text-emerald-400 tracking-wider"
                  style={{
                    animation: "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards",
                    opacity: 0,
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: 700,
                  }}
                >
                  SRAJAL TIWARI
                </div>
              </div>
            </div>

            {/* Micro Reticle Indicator */}
            <div className="absolute top-4 right-4 text-emerald-500/40 opacity-60 hover:opacity-100 transition-all group-hover:scale-110 pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-emerald-400/60 hover:text-emerald-400 transition-colors">
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>scroll</span>
        <div className="bounce-indicator">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="10 14 17 7 10 14 3 7" />
          </svg>
        </div>
      </div>
    </>
  )
}

export default HeroEnhanced

