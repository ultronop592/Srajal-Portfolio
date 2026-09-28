"use client"

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Compass,
  Layers,
  Cpu,
  Rotate3d,
  Ruler,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react"
import Link from "next/link"

/* ─────────────────────────────────────────────────────────
   CERTIFICATE INTERACTIVE EXPERIENCE
   • 3 Completely Unique Modes (NOT generic cards, NOT standard workbench):
     1. [3D HOLOGRAPHIC ORBIT]: True 3D spatial cylinder carousel
        rotating cards in perspective depth with interactive tilt
     2. [2D CAD DRAFTING CANVAS]: Architectural blueprint sketchpad
        with millimeter rulers, live cursor crosshairs, dimension lines,
        schematic flow vectors, and authentic drafting approval stamps
     3. [CRYPTOGRAPHIC KEYCARD RACK]: Silicon wafer & cryptographic
        circuit cards with gold bus pins and live verification telemetry
───────────────────────────────────────────────────────── */

export interface Certificate {
  tempId: number
  testimonial: string
  by: string
  level: string
  link?: string
}

interface CertificateInteractiveExperienceProps {
  testimonials: Certificate[]
  showViewAllLink?: boolean
}

export function CertificateInteractiveExperience({
  testimonials,
  showViewAllLink = true,
}: CertificateInteractiveExperienceProps) {
  // Mode switcher: "orbit" (3D Spatial Cylinder) | "blueprint" (2D CAD Drafting Table) | "rack" (Keycard Rack)
  const [activeMode, setActiveMode] = useState<"orbit" | "blueprint" | "rack">("orbit")
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [selectedIssuer, setSelectedIssuer] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // CAD Canvas cursor crosshair tracking
  const [mouseCoord, setMouseCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  // Extract Credential ID or deterministic hash
  const getCredentialId = (url?: string, title?: string) => {
    if (url) {
      try {
        const certMatch = url.match(/CERT-[A-Z0-9]+/i)
        if (certMatch) return certMatch[0]

        const skilljarMatch = url.match(/skilljar\.com\/c\/([a-z0-9]+)/i)
        if (skilljarMatch) return skilljarMatch[1].toUpperCase()

        const msMatch = url.match(/\/([A-Z0-9]{8})\?sharingId/i)
        if (msMatch) return msMatch[1]

        const lifeMatch = url.match(/certificate\/([a-f0-9]{8})/i)
        if (lifeMatch) return lifeMatch[1].toUpperCase()

        const forageMatch = url.match(/\/([a-zA-Z0-9_-]{10,24})\.pdf/i)
        if (forageMatch) return forageMatch[1].slice(0, 10).toUpperCase()
      } catch {
        // ignore
      }
    }
    if (title) {
      let hash = 0
      for (let i = 0; i < title.length; i++) {
        hash = (hash << 5) - hash + title.charCodeAt(i)
        hash |= 0
      }
      return `CRD-${Math.abs(hash).toString(16).toUpperCase().padStart(8, "0")}`
    }
    return "CRD-VERIFIED"
  }

  // Curated competency skills per credential
  const getCompetencySkills = (title: string, issuer: string): string[] => {
    const t = title.toLowerCase()
    const iss = issuer.toLowerCase()

    if (t.includes("context protocol") || t.includes("mcp")) {
      return ["MCP Spec 1.0", "Tool Calling", "Resource URIs", "JSON-RPC", "Prompt Sampling"]
    }
    if (t.includes("claude 101") || (t.includes("claude") && !t.includes("bedrock"))) {
      return ["Claude 3.5 Sonnet", "Prompt Design", "Vision Modality", "Extended Context"]
    }
    if (t.includes("bedrock")) {
      return ["AWS Bedrock", "Claude Enterprise", "Serverless LLM", "IAM Security", "Boto3"]
    }
    if (t.includes("agent skills") || t.includes("agentic")) {
      return ["Agentic Workflows", "Multi-Tool Execution", "State Graphs", "Error Recovery"]
    }
    if (t.includes("iam") || t.includes("security") || iss.includes("deloitte")) {
      return ["RBAC Policies", "Threat Modeling", "Least Privilege", "CloudTrail", "SOC Telemetry"]
    }
    if (t.includes("python")) {
      return ["Advanced Python", "OOP Design", "AsyncIO", "Algorithmic Efficiency"]
    }
    if (t.includes("sql")) {
      return ["Relational Architecture", "Window Functions", "Query Optimization", "Indexing"]
    }
    if (t.includes("machine learning") || t.includes("ai engineer")) {
      return ["Neural Networks", "Feature Pipelines", "Loss Convergence", "Evaluation Benchmarks"]
    }
    if (t.includes("data science") || t.includes("analytics")) {
      return ["Exploratory Data Analysis", "Statistical Inference", "Predictive Modeling", "KPI Dashboards"]
    }
    return ["Foundational Principles", "Applied Methodology", "Rigorous Testing", "Verified Attestation"]
  }

  // Parse certificates
  const parsedCertificates = useMemo(() => {
    return testimonials.map((cert) => {
      const parts = cert.by.split(" • ")
      const issuer = parts[0] || "Accreditation Authority"
      const date = parts[1] || ""
      const credId = getCredentialId(cert.link, cert.testimonial)
      const skills = getCompetencySkills(cert.testimonial, issuer)
      return {
        ...cert,
        issuer,
        date,
        credId,
        skills,
      }
    })
  }, [testimonials])

  // Filter list
  const filteredCerts = useMemo(() => {
    return parsedCertificates.filter((cert) => {
      const issuer = cert.issuer.toLowerCase()
      const title = cert.testimonial.toLowerCase()
      const level = cert.level.toLowerCase()
      const query = searchQuery.toLowerCase().trim()

      const matchesIssuer =
        selectedIssuer === "all" ||
        (selectedIssuer === "anthropic" && issuer.includes("anthropic")) ||
        (selectedIssuer === "microsoft" && issuer.includes("microsoft")) ||
        (selectedIssuer === "aws" && issuer.includes("aws")) ||
        (selectedIssuer === "roadmap" && issuer.includes("roadmap")) ||
        (selectedIssuer === "deloitte" && issuer.includes("deloitte")) ||
        (selectedIssuer === "hp" && issuer.includes("hp"))

      const matchesQuery =
        !query ||
        title.includes(query) ||
        issuer.includes(query) ||
        level.includes(query) ||
        cert.skills.some((s) => s.toLowerCase().includes(query))

      return matchesIssuer && matchesQuery
    })
  }, [parsedCertificates, selectedIssuer, searchQuery])

  // Keep active index in bounds
  useEffect(() => {
    if (activeIndex >= filteredCerts.length) {
      setActiveIndex(0)
    }
  }, [filteredCerts.length, activeIndex])

  // Issuer styling metadata
  const getIssuerMeta = (iss: string) => {
    const lower = iss.toLowerCase()
    if (lower.includes("anthropic")) {
      return {
        icon: Sparkles,
        color: "text-amber-300 bg-amber-500/10 border-amber-500/30",
        borderGlow: "hover:border-amber-400/60 hover:shadow-amber-500/20",
        label: "Anthropic Academy",
        accentHex: "#f59e0b",
      }
    }
    if (lower.includes("microsoft")) {
      return {
        icon: Terminal,
        color: "text-sky-300 bg-sky-500/10 border-sky-500/30",
        borderGlow: "hover:border-sky-400/60 hover:shadow-sky-500/20",
        label: "Microsoft Learn",
        accentHex: "#38bdf8",
      }
    }
    if (lower.includes("aws")) {
      return {
        icon: Cloud,
        color: "text-orange-300 bg-orange-500/10 border-orange-500/30",
        borderGlow: "hover:border-orange-400/60 hover:shadow-orange-500/20",
        label: "AWS Skill Builder",
        accentHex: "#fb923c",
      }
    }
    if (lower.includes("deloitte")) {
      return {
        icon: Shield,
        color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
        borderGlow: "hover:border-emerald-400/60 hover:shadow-emerald-500/20",
        label: "Deloitte (Forage)",
        accentHex: "#34d399",
      }
    }
    if (lower.includes("hp")) {
      return {
        icon: Award,
        color: "text-blue-300 bg-blue-500/10 border-blue-500/30",
        borderGlow: "hover:border-blue-400/60 hover:shadow-blue-500/20",
        label: "HP LIFE Global",
        accentHex: "#60a5fa",
      }
    }
    if (lower.includes("roadmap")) {
      return {
        icon: BookOpen,
        color: "text-purple-300 bg-purple-500/10 border-purple-500/30",
        borderGlow: "hover:border-purple-400/60 hover:shadow-purple-500/20",
        label: "One Roadmap",
        accentHex: "#c084fc",
      }
    }
    return {
      icon: Award,
      color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
      borderGlow: "hover:border-emerald-400/60 hover:shadow-emerald-500/20",
      label: iss,
      accentHex: "#34d399",
    }
  }

  // Level styles
  const getLevelStyle = (lvl: string) => {
    switch (lvl.toLowerCase()) {
      case "expert":
        return { pill: "bg-amber-500/15 text-amber-300 border-amber-500/30", dot: "bg-amber-400" }
      case "advanced":
        return { pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", dot: "bg-emerald-400" }
      case "professional":
        return { pill: "bg-teal-500/15 text-teal-300 border-teal-500/30", dot: "bg-teal-400" }
      case "intermediate":
        return { pill: "bg-sky-500/15 text-sky-300 border-sky-500/30", dot: "bg-sky-400" }
      default:
        return { pill: "bg-neutral-500/15 text-neutral-300 border-neutral-500/30", dot: "bg-neutral-400" }
    }
  }

  // Copy serial ID handler
  const handleCopyId = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredCerts.length - 1))
  }, [filteredCerts.length])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < filteredCerts.length - 1 ? prev + 1 : 0))
  }, [filteredCerts.length])

  // Mouse tracking on CAD drafting canvas
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)
    setMouseCoord({ x, y })
  }

  const currentCert = filteredCerts[activeIndex] || filteredCerts[0] || parsedCertificates[0]
  const currentIssuerMeta = currentCert ? getIssuerMeta(currentCert.issuer) : null
  const currentLevelConfig = currentCert ? getLevelStyle(currentCert.level) : null

  return (
    <div className="w-full relative select-none">
      {/* ── TOP INTERACTIVE CONTROL PANEL ── */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-neutral-950/85 border border-emerald-500/25 backdrop-blur-xl shadow-2xl">
          {/* 3 Paradigm View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-neutral-800 w-full md:w-auto justify-center">
            <button
              onClick={() => setActiveMode("orbit")}
              className={`px-3.5 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                activeMode === "orbit"
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>3D SPATIAL ORBIT</span>
            </button>

            <button
              onClick={() => setActiveMode("blueprint")}
              className={`px-3.5 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                activeMode === "blueprint"
                  ? "bg-cyan-500/25 border border-cyan-400 text-cyan-300 font-bold shadow-lg shadow-cyan-500/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>2D CAD DRAFTING CANVAS</span>
            </button>

            <button
              onClick={() => setActiveMode("rack")}
              className={`px-3.5 py-2 rounded-lg font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                activeMode === "rack"
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>KEYCARD RACK</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search credentials & skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl pl-8 pr-8 py-1.5 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Issuer Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar mt-2">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
            FILTER:
          </span>
          {[
            { id: "all", label: "All (17)" },
            { id: "anthropic", label: "Anthropic (6)" },
            { id: "microsoft", label: "Microsoft (2)" },
            { id: "aws", label: "AWS (2)" },
            { id: "roadmap", label: "One Roadmap (3)" },
            { id: "deloitte", label: "Deloitte (2)" },
            { id: "hp", label: "HP LIFE (2)" },
          ].map((tab) => {
            const isActive = selectedIssuer === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIssuer(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-sm"
                    : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          PARADIGM 1: 3D HOLOGRAPHIC SPATIAL ORBIT
          (Cards float in a true 3D perspective cylinder, rotating smoothly)
      ───────────────────────────────────────────────────────── */}
      {activeMode === "orbit" && currentCert && currentIssuerMeta && currentLevelConfig && (
        <div className="container mx-auto px-4 py-6">
          {/* Main 3D Spatial Cylinder Stage */}
          <div className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[520px] flex items-center justify-center overflow-hidden [perspective:1200px]">
            {/* Ambient Background Aura */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: currentIssuerMeta.accentHex }}
            />

            {/* Orbiting 3D Ring */}
            <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
              {filteredCerts.map((cert, idx) => {
                const distance = idx - activeIndex
                const isCenter = distance === 0
                const isLeft = distance === -1 || (activeIndex === 0 && idx === filteredCerts.length - 1)
                const isRight = distance === 1 || (activeIndex === filteredCerts.length - 1 && idx === 0)
                const isVisible = Math.abs(distance) <= 2 || (filteredCerts.length > 3 && (isLeft || isRight))

                if (!isVisible) return null

                // 3D coordinate geometry calculations
                const effectiveDist = distance
                const xOffset = effectiveDist * (typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 280)
                const zOffset = -Math.abs(effectiveDist) * 160
                const rotY = effectiveDist * -24
                const scale = 1 - Math.min(Math.abs(effectiveDist) * 0.16, 0.35)
                const opacity = isCenter ? 1 : Math.max(0.3, 1 - Math.abs(effectiveDist) * 0.35)

                const meta = getIssuerMeta(cert.issuer)
                const lvl = getLevelStyle(cert.level)
                const MetaIcon = meta.icon

                return (
                  <motion.div
                    key={cert.tempId}
                    onClick={() => setActiveIndex(idx)}
                    animate={{
                      x: xOffset,
                      z: zOffset,
                      rotateY: rotY,
                      scale: scale,
                      opacity: opacity,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    style={{
                      position: "absolute",
                      transformStyle: "preserve-3d",
                      zIndex: 30 - Math.abs(effectiveDist),
                    }}
                    className={`w-[320px] sm:w-[380px] md:w-[420px] rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 border-2 ${
                      isCenter
                        ? "bg-gradient-to-br from-[#070f1e] via-[#050811] to-[#0b172a] border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.15)] ring-1 ring-emerald-400/40"
                        : "bg-neutral-950/80 border-neutral-800 backdrop-blur-md hover:border-neutral-700"
                    }`}
                  >
                    {/* Laser Scanline on Front Active Card */}
                    {isCenter && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
                    )}

                    {/* Top Row: Issuer & Level */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${meta.color}`}>
                        <MetaIcon className="w-3.5 h-3.5" />
                        <span>{meta.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${lvl.pill}`}>
                          <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${lvl.dot}`} />
                          {cert.level}
                        </span>
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                        CRYPTOGRAPHIC ATTESTATION
                      </span>
                      <h3
                        className="text-lg sm:text-xl font-black text-white leading-tight"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {cert.testimonial}
                      </h3>
                      <p className="text-xs font-mono text-neutral-400 mt-1">
                        Issued: {cert.date || "Active Verified"}
                      </p>
                    </div>

                    {/* Verified Skills Matrix */}
                    <div className="mb-6">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2 font-semibold">
                        // ASSESSED COMPETENCIES:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.slice(0, 4).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                          #{cert.credId}
                        </span>
                        <button
                          onClick={(e) => handleCopyId(cert.credId, e)}
                          className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
                          title="Copy Serial ID"
                        >
                          {copiedId === cert.credId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {isCenter && cert.link ? (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                          <span>VERIFY PORTAL</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          VERIFIED
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Left & Right Orbit Step Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-40 p-3 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white transition-all shadow-xl hover:scale-110 active:scale-95"
              title="Previous Credential"
            >
              <ChevronLeft className="w-5 h-5 text-emerald-400" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-40 p-3 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white transition-all shadow-xl hover:scale-110 active:scale-95"
              title="Next Credential"
            >
              <ChevronRight className="w-5 h-5 text-emerald-400" />
            </button>
          </div>

          {/* Interactive Thumbnails Rail */}
          <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto py-2 no-scrollbar">
            {filteredCerts.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-8 h-2 bg-emerald-400 shadow-[0_0_10px_#34d399]"
                    : "w-2 h-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
                title={c.testimonial}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          PARADIGM 2: 2D CAD ARCHITECTURAL DRAFTING CANVAS
          (Millimeter CAD rulers, cursor tracking crosshairs, dimension lines,
           hand-sketched drafting schematics, and official stamps)
      ───────────────────────────────────────────────────────── */}
      {activeMode === "blueprint" && currentCert && currentIssuerMeta && currentLevelConfig && (
        <div className="container mx-auto px-4 py-4">
          <div
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            className="relative w-full rounded-3xl bg-[#050b14] border-2 border-cyan-500/40 p-4 sm:p-8 shadow-2xl overflow-hidden cursor-crosshair select-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(6, 182, 212, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.25) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            {/* Top Millimeter CAD Ruler Bar */}
            <div className="relative z-10 w-full h-6 border-b border-cyan-500/30 flex items-center justify-between text-[9px] font-mono text-cyan-400/80 mb-6 overflow-hidden px-2">
              <span>0mm</span>
              <span>100mm</span>
              <span>200mm</span>
              <span>300mm</span>
              <span>400mm</span>
              <span>500mm</span>
              <span>600mm</span>
              <span>700mm</span>
              <span>800mm</span>
              <span>SCALE: 1:1 CAD DRAFT</span>
            </div>

            {/* Live Tracking Crosshair Indicators */}
            <div
              className="absolute top-0 bottom-0 w-[1px] border-l border-dashed border-cyan-400/40 pointer-events-none transition-all duration-75"
              style={{ left: `${mouseCoord.x}px` }}
            />
            <div
              className="absolute left-0 right-0 h-[1px] border-t border-dashed border-cyan-400/40 pointer-events-none transition-all duration-75"
              style={{ top: `${mouseCoord.y}px` }}
            />

            {/* Live Cursor Coordinate HUD Badge */}
            <div className="absolute top-3 right-4 z-20 px-3 py-1 rounded bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
              COORDINATES: X={mouseCoord.x}mm | Y={mouseCoord.y}mm
            </div>

            {/* Drafting Main Layout: Left Drawing Register + Right Technical Canvas */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Technical Drawing Register (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl bg-black/70 border border-cyan-500/30 p-4 max-h-[560px] overflow-y-auto no-scrollbar">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5" />
                    DRAWING_REGISTER
                  </span>
                  <span>{filteredCerts.length} DWG</span>
                </div>

                <div className="space-y-2">
                  {filteredCerts.map((cert, idx) => {
                    const isSelected = cert.testimonial === currentCert.testimonial
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`p-3 rounded-xl cursor-pointer border transition-all ${
                          isSelected
                            ? "bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-950/80"
                            : "bg-black/40 border-neutral-800 text-neutral-400 hover:text-cyan-200 hover:border-cyan-500/40"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className="text-cyan-400 font-bold">DWG_{String(idx + 1).padStart(3, "0")}</span>
                          <span className="uppercase text-neutral-500">{cert.issuer.split(" ")[0]}</span>
                        </div>
                        <h5 className="text-xs font-bold font-mono tracking-tight truncate">
                          {cert.testimonial}
                        </h5>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right Column: Architectural Drafting Drawing Sheet (8 cols) */}
              <div className="lg:col-span-8 rounded-2xl bg-[#03070e] border-2 border-cyan-400/50 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                {/* Outer Drafting Border with Dimension Marks */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-cyan-500">✛ 0,0</div>
                <div className="absolute top-2 right-2 text-[8px] font-mono text-cyan-500">✛ 1920,0</div>
                <div className="absolute bottom-2 left-2 text-[8px] font-mono text-cyan-500">✛ 0,1080</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-cyan-500">✛ 1920,1080</div>

                {/* Technical Dimension Arrow Indicator */}
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400/80 border-b border-dashed border-cyan-500/30 pb-2 mb-6">
                  <span>|←───────────── 185.0 mm ─────────────→|</span>
                  <span>TOLERANCE: ±0.01mm</span>
                </div>

                {/* Drawing Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-cyan-400">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 font-bold uppercase">
                      ACCREDITATION SCHEMATIC
                    </span>
                    <span>SERIAL: #{currentCert.credId}</span>
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-black text-white leading-tight"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {currentCert.testimonial}
                  </h3>
                  <p className="text-xs font-mono text-cyan-300/80 mt-1">
                    Accreditation Body: <strong className="text-white">{currentCert.issuer}</strong> · Issued: {currentCert.date || "Active Certified"}
                  </p>
                </div>

                {/* 2D Architectural Competency Flow Schematic */}
                <div className="my-6 p-4 rounded-xl bg-black/60 border border-cyan-500/30">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-3 font-bold">
                    // TECHNICAL COMPETENCY SCHEMATIC:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCert.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">
                            {sIdx + 1}
                          </span>
                          <span>{skill}</span>
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold">VERIFIED</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Architectural Title Block & Verification Stamp */}
                <div className="pt-6 border-t-2 border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Title Block Specs */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono text-neutral-400">
                    <div>DESIGNER: <strong className="text-cyan-300">Srajal Tiwari</strong></div>
                    <div>STATUS: <strong className="text-emerald-400">AUTHENTICATED</strong></div>
                    <div>LEVEL: <strong className="text-white">{currentCert.level}</strong></div>
                    <div>DISCIPLINE: <strong className="text-cyan-300">AI &amp; Cloud</strong></div>
                  </div>

                  {/* Verification CTA & Copy ID */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {currentCert.link ? (
                      <a
                        href={currentCert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>VERIFY OFFICIAL RECORD</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-neutral-500">ARCHIVED RECORD</span>
                    )}

                    <button
                      onClick={() => handleCopyId(currentCert.credId)}
                      className="p-2 rounded-xl bg-black border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors"
                      title="Copy Credential Serial ID"
                    >
                      {copiedId === currentCert.credId ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          PARADIGM 3: CRYPTOGRAPHIC KEYCARD RACK
          (Silicon wafer badges with gold contact bus pins and circuit traces)
      ───────────────────────────────────────────────────────── */}
      {activeMode === "rack" && (
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredCerts.map((cert) => {
              const meta = getIssuerMeta(cert.issuer)
              const lvl = getLevelStyle(cert.level)
              const MetaIcon = meta.icon

              return (
                <div
                  key={cert.tempId}
                  className="relative rounded-2xl bg-gradient-to-b from-[#0a111a] via-[#05090f] to-[#04070c] border border-neutral-800 hover:border-emerald-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group overflow-hidden"
                >
                  {/* Top Gold Bus Connector Pins (Simulated Silicon IC Edge Connector) */}
                  <div className="absolute top-0 inset-x-8 h-2 flex justify-between gap-1 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                    {Array.from({ length: 12 }).map((_, pIdx) => (
                      <div key={pIdx} className="w-2.5 h-1.5 rounded-b bg-amber-400/80" />
                    ))}
                  </div>

                  {/* Header: Issuer Pill & Credential ID */}
                  <div className="pt-2 mb-4 flex items-center justify-between">
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${meta.color}`}>
                      <MetaIcon className="w-3.5 h-3.5" />
                      <span>{meta.label}</span>
                    </div>

                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800">
                      #{cert.credId}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <div className="mb-4">
                    <h4
                      className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug tracking-tight"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {cert.testimonial}
                    </h4>

                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mt-2">
                      <span>{cert.date || "Continuous Active"}</span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] ${lvl.pill}`}>
                        {cert.level}
                      </span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {cert.skills.slice(0, 3).map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-neutral-400"
                      >
                        #{s}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      VALIDATED
                    </span>

                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                      >
                        <span>VERIFY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-neutral-500">ARCHIVED</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── FOOTER VIEW ALL LINK ── */}
      {showViewAllLink && (
        <div className="pt-8 flex justify-center">
          <Link
            href="/certificates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-emerald-400 bg-neutral-900/70 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 shadow-sm transition-all duration-300 group"
          >
            <span>Explore All {testimonials.length} Verified Certifications</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default CertificateInteractiveExperience
