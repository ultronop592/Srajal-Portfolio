"use client"

import React, { useEffect, useState } from "react"
import { Download, Github, Linkedin, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const HeroEnhanced = ({ onDownloadResume }: { onDownloadResume: () => void }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [displayedCounter1, setDisplayedCounter1] = useState(0)
  const [displayedCounter2, setDisplayedCounter2] = useState(0)
  const [displayedCounter3, setDisplayedCounter3] = useState(0)
  const [mounted, setMounted] = useState(false)

  const subtitles = [
    "Machine Learning Engineer",
    "Generative AI Builder",
    "RAG & LLM Expert",
    "Data → Decisions",
  ]
  const [currentSubtitle, setCurrentSubtitle] = useState(0)

  // Counter animation
  useEffect(() => {
    if (!mounted) return

    // Counter 1: 15+
    let timer1 = setInterval(() => {
      setDisplayedCounter1((prev) => {
        if (prev < 15) return prev + 1
        clearInterval(timer1)
        return prev
      })
    }, 50)

    // Counter 2: 3+
    let timer2 = setInterval(() => {
      setDisplayedCounter2((prev) => {
        if (prev < 3) return prev + 1
        clearInterval(timer2)
        return prev
      })
    }, 150)

    // Counter 3: 10+
    let timer3 = setInterval(() => {
      setDisplayedCounter3((prev) => {
        if (prev < 10) return prev + 1
        clearInterval(timer3)
        return prev
      })
    }, 100)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
    }
  }, [mounted])

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
      {/* Background Radial Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Background Orbs */}
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            animation: "drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-40 right-20 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #ea580c 0%, transparent 70%)",
            animation: "drift-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full opacity-12"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            animation: "drift-3 30s ease-in-out infinite",
          }}
        />

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
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm">
            <span className="pulsing-prompt">▸</span>
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-orange-300/80">
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
                  background: "linear-gradient(135deg, #fb923c 0%, #ea580c 100%)",
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
            <div className="text-xl md:text-2xl font-mono font-semibold text-orange-300/90">
              <span className="typewriter">{displayedText}</span>
            </div>
          </div>

          {/* Bio Text */}
          <p className="text-neutral-300 leading-relaxed max-w-xl mb-8 text-sm md:text-base animate-fade-in">
            I build AI/ML products that turn data into decisions. Exploring the world of Generative AI | Passionate
            about AI that learns, creates, and reasons | RAG | LLMs | Hugging Face
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { number: displayedCounter1, label: "Projects" },
              { number: displayedCounter2, label: "Years" },
              { number: displayedCounter3, label: "Models" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="animate-fade-in p-3 rounded-lg border border-orange-500/20 bg-orange-500/5 backdrop-blur text-center"
                style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-orange-300 font-mono">
                  {stat.number}+
                </div>
                <div className="text-xs md:text-sm text-neutral-400 font-mono mt-1">{stat.label}</div>
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
                <Badge className="bg-neutral-800/50 text-neutral-200 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 cursor-pointer">
                  <span className="pulsing-prompt text-orange-400">▸</span>
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
              className="shimmer-sweep relative px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30 group overflow-hidden"
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
                className="relative px-4 py-3 rounded-lg font-semibold text-neutral-200 border border-neutral-700 hover:border-orange-500/60 bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 transform hover:scale-105 active:scale-95 group overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${social.delay}s forwards`,
                  opacity: 0,
                }}
              >
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <social.icon className="inline-block h-4 w-4 mr-2" />
                {social.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Hero Image with Breathing Glow */}
        <div className="flex justify-center md:justify-end hero-fade-scale">
          <div className="relative w-full max-w-sm mx-auto">
            {/* Breathing Glow Background */}
            <div className="breathing-glow absolute inset-0 rounded-2xl" />

            {/* Corner Brackets */}
            <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-orange-500 rounded-tl-lg" />
            <div className="absolute -top-6 -right-6 w-12 h-12 border-t-2 border-r-2 border-orange-500 rounded-tr-lg" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 border-b-2 border-l-2 border-orange-500 rounded-bl-lg" />
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-orange-500 rounded-br-lg" />

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-orange-500/20 bg-neutral-900/50 backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile-3d.png"
                alt="Srajal Tiwari"
                className="w-full h-auto object-cover"
              />

              {/* Name Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                <div
                  className="text-xl md:text-2xl font-bold font-mono text-orange-300 tracking-wider"
                  style={{
                    animation: "slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards",
                    opacity: 0,
                  }}
                >
                  SRAJAL TIWARI
                </div>
              </div>
            </div>

            {/* Plus Icon Corners */}
            <div className="absolute top-4 right-4 text-orange-300 opacity-60 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-orange-400/60 hover:text-orange-400 transition-colors">
        <span className="text-xs font-mono uppercase tracking-widest">scroll</span>
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
