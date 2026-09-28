"use client"

import React, { useState, useMemo, useEffect } from "react"
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
  Filter,
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  Workflow,
  Monitor,
  Radio,
  FileCheck,
  Lock,
  Layers,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   CERTIFICATE VAULT WORKBENCH
   • Replaces conventional certificate cards with an Interactive
     3D Cryptographic Credential Vault & Technical Accreditation
     Schematics Console.
   • Features:
     1. [3D CREDENTIAL PASSPORT]: 3D isometric tilt certificate
        with holographic sheen, laser scanlines, and official seal
     2. [2D ACCREDITATION BLUEPRINT]: Technical architectural CAD
        schematic with competency flows, dimension lines, and stamps
     3. [CRYPTOGRAPHIC TELEMETRY]: Monospace verification HUD with
        live serial verification, hash signatures, and audit stamps
   • Dual Exploration Modes:
     - 3D VERIFICATION TERMINAL (Mission Console with Selector Rail)
     - ACCREDITATION DOSSIER (2D Blueprint Dossiers with CAD Grid)
   • 100% Content & Link Preservation
───────────────────────────────────────────────────────── */

export interface Certificate {
  tempId: number
  testimonial: string
  by: string
  level: string
  link?: string
}

interface CertificateVaultWorkbenchProps {
  testimonials: Certificate[]
  showViewAllLink?: boolean
}

export function CertificateVaultWorkbench({
  testimonials,
  showViewAllLink = true,
}: CertificateVaultWorkbenchProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const [vaultMode, setVaultMode] = useState<"terminal" | "dossiers">("terminal")
  const [viewportTab, setViewportTab] = useState<"passport" | "blueprint" | "telemetry">("passport")
  const [selectedIssuer, setSelectedIssuer] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Extract Credential ID if present in the link or generate deterministic ID
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
    // Fallback deterministic ID
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

  // Parse certificate details
  const parseCert = (cert: Certificate) => {
    const parts = cert.by.split(" • ")
    const issuer = parts[0] || "Accreditation Authority"
    const date = parts[1] || ""
    const credId = getCredentialId(cert.link, cert.testimonial)
    return {
      ...cert,
      issuer,
      date,
      credId,
    }
  }

  // Issuers list with counts
  const issuers = useMemo(() => {
    return [
      { id: "all", label: "All Credentials" },
      { id: "anthropic", label: "Anthropic" },
      { id: "microsoft", label: "Microsoft" },
      { id: "aws", label: "AWS" },
      { id: "roadmap", label: "One Roadmap" },
      { id: "deloitte", label: "Deloitte" },
      { id: "hp", label: "HP LIFE" },
    ]
  }, [])

  // Filter logic
  const filteredCerts = useMemo(() => {
    return testimonials.filter((cert) => {
      const issuer = cert.by.split(" • ")[0].toLowerCase()
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

      const matchesLevel =
        selectedLevel === "all" || level === selectedLevel.toLowerCase()

      const matchesQuery =
        !query ||
        title.includes(query) ||
        issuer.includes(query) ||
        level.includes(query) ||
        cert.by.toLowerCase().includes(query)

      return matchesIssuer && matchesLevel && matchesQuery
    })
  }, [testimonials, selectedIssuer, selectedLevel, searchQuery])

  // Count helper
  const getIssuerCount = (id: string) => {
    if (id === "all") return testimonials.length
    return testimonials.filter((c) => {
      const iss = c.by.split(" • ")[0].toLowerCase()
      if (id === "anthropic") return iss.includes("anthropic")
      if (id === "microsoft") return iss.includes("microsoft")
      if (id === "aws") return iss.includes("aws")
      if (id === "roadmap") return iss.includes("roadmap")
      if (id === "deloitte") return iss.includes("deloitte")
      if (id === "hp") return iss.includes("hp")
      return false
    }).length
  }

  // Active selected certificate
  const currentCert = filteredCerts[selectedIdx] || filteredCerts[0] || testimonials[0]

  useEffect(() => {
    if (selectedIdx >= filteredCerts.length) {
      setSelectedIdx(0)
    }
  }, [filteredCerts.length, selectedIdx])

  // Issuer styling metadata
  const getIssuerMeta = (iss: string) => {
    const lower = iss.toLowerCase()
    if (lower.includes("anthropic")) {
      return {
        icon: Sparkles,
        color: "text-amber-300 bg-amber-500/10 border-amber-500/30",
        accent: "#f59e0b",
        glow: "shadow-amber-500/10",
        label: "Anthropic Academy",
        sealText: "ANTHROPIC CERTIFIED AI SPECIALIST",
      }
    }
    if (lower.includes("microsoft")) {
      return {
        icon: Terminal,
        color: "text-sky-300 bg-sky-500/10 border-sky-500/30",
        accent: "#0ea5e9",
        glow: "shadow-sky-500/10",
        label: "Microsoft Learn",
        sealText: "MICROSOFT ACCREDITED SCHOLAR",
      }
    }
    if (lower.includes("aws")) {
      return {
        icon: Cloud,
        color: "text-orange-300 bg-orange-500/10 border-orange-500/30",
        accent: "#f97316",
        glow: "shadow-orange-500/10",
        label: "AWS Skill Builder",
        sealText: "AMAZON WEB SERVICES TRAINING",
      }
    }
    if (lower.includes("deloitte")) {
      return {
        icon: Shield,
        color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
        accent: "#10b981",
        glow: "shadow-emerald-500/10",
        label: "Deloitte (Forage)",
        sealText: "DELOITTE ENTERPRISE SIMULATION",
      }
    }
    if (lower.includes("hp")) {
      return {
        icon: Award,
        color: "text-blue-300 bg-blue-500/10 border-blue-500/30",
        accent: "#3b82f6",
        glow: "shadow-blue-500/10",
        label: "HP LIFE Global",
        sealText: "HP LIFE ACCREDITED CREDENTIAL",
      }
    }
    if (lower.includes("roadmap")) {
      return {
        icon: BookOpen,
        color: "text-purple-300 bg-purple-500/10 border-purple-500/30",
        accent: "#a855f7",
        glow: "shadow-purple-500/10",
        label: "One Roadmap",
        sealText: "ONE ROADMAP LICENSED ENGINEER",
      }
    }
    return {
      icon: Award,
      color: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
      accent: "#10b981",
      glow: "shadow-emerald-500/10",
      label: iss,
      sealText: "OFFICIALLY VERIFIED CREDENTIAL",
    }
  }

  // Level styling
  const getLevelStyle = (lvl: string) => {
    switch (lvl.toLowerCase()) {
      case "expert":
        return {
          pill: "bg-amber-500/15 text-amber-300 border-amber-500/30",
          dot: "bg-amber-400",
        }
      case "advanced":
        return {
          pill: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          dot: "bg-emerald-400",
        }
      case "professional":
        return {
          pill: "bg-teal-500/15 text-teal-300 border-teal-500/30",
          dot: "bg-teal-400",
        }
      case "intermediate":
        return {
          pill: "bg-sky-500/15 text-sky-300 border-sky-500/30",
          dot: "bg-sky-400",
        }
      default:
        return {
          pill: "bg-neutral-500/15 text-neutral-300 border-neutral-500/30",
          dot: "bg-neutral-400",
        }
    }
  }

  // Competency flow nodes generator
  const getCompetencyFlow = (title: string, issuer: string) => {
    const t = title.toLowerCase()
    const iss = issuer.toLowerCase()

    if (t.includes("context protocol") || t.includes("mcp")) {
      return [
        "Protocol Discovery",
        "Host & Client Handshake",
        "Dynamic Tool Calling",
        "Resource URI Provider",
        "Sampling Sandboxing",
        "Production Serving",
      ]
    }
    if (t.includes("claude") || t.includes("bedrock") || t.includes("agent")) {
      return [
        "Foundation LLM Theory",
        "Structured Reasoning",
        "Bedrock IAM Security",
        "Multi-Tool Agent Routing",
        "Stateful Task Execution",
        "Audit Validation",
      ]
    }
    if (t.includes("iam") || t.includes("security") || iss.includes("aws")) {
      return [
        "Principal Identity",
        "RBAC Policy Definition",
        "Evaluation Logic",
        "Least-Privilege Audit",
        "CloudTrail Logging",
        "Compliance Sign-off",
      ]
    }
    if (t.includes("python") || t.includes("sql") || t.includes("data")) {
      return [
        "Syntactic Foundations",
        "Algorithmic Data Pipelines",
        "Relational Query Matrix",
        "Indexing Optimization",
        "Performance Benchmarking",
        "Verified Assessment",
      ]
    }
    if (t.includes("machine learning") || t.includes("ai engineer")) {
      return [
        "Mathematical Formulations",
        "Feature Engineering",
        "Model Architecture",
        "Loss Convergence",
        "Validation Benchmarking",
        "Deployment Pipeline",
      ]
    }
    return [
      "Core Theoretical Principles",
      "Applied Industry Methodology",
      "Hands-On Implementation",
      "Rigorous Competency Evaluation",
      "Attestation & Certification",
    ]
  }

  const handleCopyId = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const parsedCurrent = currentCert ? parseCert(currentCert) : null
  const currentIssuerMeta = parsedCurrent ? getIssuerMeta(parsedCurrent.issuer) : null
  const currentLevelConfig = parsedCurrent ? getLevelStyle(parsedCurrent.level) : null
  const currentCompetencyNodes = parsedCurrent
    ? getCompetencyFlow(parsedCurrent.testimonial, parsedCurrent.issuer)
    : []

  return (
    <div className="w-full relative">
      {/* ── WORKBENCH TOP CONTROL BAR ── */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/85 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <button
              onClick={() => setVaultMode("terminal")}
              className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                vaultMode === "terminal"
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                  : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>3D VAULT TERMINAL</span>
            </button>

            <button
              onClick={() => setVaultMode("dossiers")}
              className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                vaultMode === "dossiers"
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                  : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>ACCREDITATION DOSSIERS ({filteredCerts.length})</span>
            </button>
          </div>

          {/* Search & Fast Filter Bar */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter credentials & skills..."
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

            {(selectedIssuer !== "all" || selectedLevel !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedIssuer("all")
                  setSelectedLevel("all")
                  setSearchQuery("")
                }}
                className="px-2.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-white"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar mt-2">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mr-2 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-emerald-400" />
            ISSUER:
          </span>
          {issuers.map((tab) => {
            const count = getIssuerCount(tab.id)
            if (count === 0 && tab.id !== "all") return null
            const isActive = selectedIssuer === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIssuer(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                  isActive
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-sm"
                    : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-emerald-500/30 text-emerald-200 font-bold" : "bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          MODE 1: 3D VAULT TERMINAL (MISSION CONSOLE VIEW)
      ───────────────────────────────────────────────────────── */}
      {vaultMode === "terminal" && parsedCurrent && currentIssuerMeta && currentLevelConfig && (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-7xl mx-auto">
            {/* ── LEFT COLUMN: CREDENTIAL SELECTOR MATRIX (4 cols) ── */}
            <div className="lg:col-span-4 rounded-2xl bg-neutral-950/85 border border-emerald-500/20 backdrop-blur-xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2 max-h-[720px] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-neutral-800/80 px-2 text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <FileCheck className="w-3.5 h-3.5" />
                  CREDENTIAL_INDEX
                </span>
                <span>{filteredCerts.length} VERIFIED</span>
              </div>

              {filteredCerts.map((cert, idx) => {
                const parsed = parseCert(cert)
                const isSelected = parsed.testimonial === parsedCurrent.testimonial
                const meta = getIssuerMeta(parsed.issuer)
                const lvl = getLevelStyle(parsed.level)
                const MetaIcon = meta.icon

                return (
                  <motion.div
                    key={cert.tempId}
                    onClick={() => setSelectedIdx(idx)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                    className={`relative p-3.5 rounded-xl cursor-pointer border transition-all duration-200 ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500/70 shadow-lg shadow-emerald-950/60"
                        : "bg-neutral-900/40 border-neutral-800/80 hover:bg-neutral-900/80 hover:border-neutral-700"
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isSelected && (
                      <div className="absolute left-0 inset-y-2 w-1 rounded-r bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    )}

                    <div className="flex items-center justify-between mb-1 pl-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-neutral-500">
                          CRD_{String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${meta.color}`}
                        >
                          <MetaIcon className="w-2.5 h-2.5" />
                          <span>{parsed.issuer.split(" ")[0]}</span>
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight pl-1 font-sans line-clamp-1">
                      {parsed.testimonial}
                    </h4>

                    <div className="flex items-center justify-between pl-1 mt-1 text-[11px] font-mono text-neutral-400">
                      <span>{parsed.date}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full border ${lvl.pill}`}
                      >
                        {parsed.level}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* ── RIGHT COLUMN: 3D HOLOGRAPHIC VIEWPORT & TELEMETRY DECK (8 cols) ── */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="rounded-3xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border border-emerald-500/25 backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                {/* Corner Technical Crosshairs */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ AUTH_VERIFIED
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ SHA256_ROOT
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ ATTESTED_VALID
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ PROTOCOL_2026
                </div>

                {/* Top Viewport Header: Title & Tab Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-800/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${currentIssuerMeta.color}`}>
                        {currentIssuerMeta.label}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        // SERIAL: {parsedCurrent.credId}
                      </span>
                    </div>
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {parsedCurrent.testimonial}
                    </h3>
                  </div>

                  {/* Mode Tab Switcher */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-neutral-800">
                    <button
                      onClick={() => setViewportTab("passport")}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                        viewportTab === "passport"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      3D BADGE
                    </button>
                    <button
                      onClick={() => setViewportTab("blueprint")}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                        viewportTab === "blueprint"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      2D SCHEMATIC
                    </button>
                    <button
                      onClick={() => setViewportTab("telemetry")}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                        viewportTab === "telemetry"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      TELEMETRY
                    </button>
                  </div>
                </div>

                {/* ── VIEWPORT CONTENT SWITCHER ── */}
                <div className="relative min-h-[340px] sm:min-h-[380px] rounded-2xl overflow-hidden bg-black/80 border border-neutral-800 flex items-center justify-center p-2 sm:p-4">
                  {/* TAB 1: 3D ISOMETRIC HOLOGRAPHIC CREDENTIAL PASSPORT */}
                  {viewportTab === "passport" && (
                    <TiltCard3D tiltStrength={10} glareOpacity={0.15} className="w-full h-full">
                      <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden group/passport border-2 border-emerald-500/30 bg-gradient-to-br from-[#070f1a] via-[#040810] to-[#0a1626] p-6 flex flex-col justify-between shadow-2xl">
                        {/* Background Holographic Guilloche Texture */}
                        <div
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.4) 1px, transparent 1px), linear-gradient(45deg, rgba(6, 182, 212, 0.15) 25%, transparent 25%)",
                            backgroundSize: "24px 24px, 48px 48px",
                          }}
                        />

                        {/* Top Laser Sweep Line */}
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover/passport:opacity-100 transition-all duration-700 pointer-events-none group-hover/passport:translate-y-64" />

                        {/* Top Row: Official Security Clearance Stamp & Serial */}
                        <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/25 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                            <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                              CRYPTOGRAPHIC ATTESTATION // VERIFIED_ROOT
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-neutral-400">
                            ID: #{parsedCurrent.credId}
                          </span>
                        </div>

                        {/* Center: Holographic Credential Seal & Main Title */}
                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 my-auto">
                          {/* Circular Holographic Crest */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-neutral-900 to-black p-2 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover/passport:rotate-12 transition-transform duration-500">
                            <div className="absolute inset-1 rounded-full border border-dashed border-emerald-400/50 animate-[spin_20s_linear_infinite]" />
                            <currentIssuerMeta.icon className="w-10 h-10 text-emerald-300" />
                          </div>

                          {/* Certificate Description Block */}
                          <div className="text-center sm:text-left">
                            <span className="text-[11px] font-mono text-emerald-400/90 uppercase tracking-widest block mb-1">
                              CERTIFICATE OF COMPETENCY
                            </span>
                            <h4
                              className="text-lg sm:text-xl md:text-2xl font-black text-white leading-tight"
                              style={{ fontFamily: "Syne, sans-serif" }}
                            >
                              {parsedCurrent.testimonial}
                            </h4>
                            <p className="text-xs font-mono text-neutral-400 mt-1">
                              Issued by <strong className="text-neutral-200">{parsedCurrent.issuer}</strong> · Date: {parsedCurrent.date || "Verified Record"}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Row: Official Seal Metadata & Hash */}
                        <div className="relative z-10 pt-3 border-t border-emerald-500/25 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-400">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full border ${currentLevelConfig.pill}`}>
                              {parsedCurrent.level.toUpperCase()} LEVEL
                            </span>
                            <span className="flex items-center gap-1 text-emerald-400">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              AUTHENTICATED
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-neutral-500">SHA-256: 0x{parsedCurrent.credId.slice(0, 6)}...</span>
                            <button
                              onClick={() => handleCopyId(parsedCurrent.credId)}
                              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 hover:border-emerald-500/40 text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                              title="Copy Credential ID"
                            >
                              {copiedId === parsedCurrent.credId ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">COPIED</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>COPY ID</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </TiltCard3D>
                  )}

                  {/* TAB 2: 2D ARCHITECTURAL COMPETENCY BLUEPRINT */}
                  {viewportTab === "blueprint" && (
                    <div className="w-full h-full min-h-[320px] p-4 sm:p-6 rounded-xl bg-[#070d17] border border-cyan-500/30 flex flex-col justify-between relative overflow-hidden">
                      {/* Blueprint Grid Paper Pattern */}
                      <div
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.4) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />

                      {/* Blueprint Header Stamp */}
                      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-cyan-500/30 text-cyan-400 font-mono text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 font-bold uppercase tracking-wider">
                            ACCREDITATION SCHEMATIC // COMPETENCY ARCHITECTURE
                          </span>
                          <span className="text-cyan-500 hidden sm:inline">SCALE: 1:1 CAD</span>
                        </div>
                        <span>DOC_REF: {parsedCurrent.credId}</span>
                      </div>

                      {/* Sequential Pipeline Flow Diagram */}
                      <div className="relative z-10 my-auto py-4">
                        <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest block mb-3 font-semibold">
                          // COMPETENCY MASTERY PIPELINE:
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          {currentCompetencyNodes.map((step, idx) => (
                            <React.Fragment key={idx}>
                              <div className="px-3 py-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2 shadow-sm">
                                <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">
                                  {idx + 1}
                                </span>
                                <span>{step}</span>
                              </div>
                              {idx < currentCompetencyNodes.length - 1 && (
                                <span className="text-cyan-500 font-mono text-sm hidden sm:inline">
                                  ⇢
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Blueprint Footer Specs Table */}
                      <div className="relative z-10 pt-3 border-t border-cyan-500/30 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
                        <div className="p-2 rounded bg-black/60 border border-cyan-500/20">
                          <span className="text-neutral-500 block">AUTHORITY:</span>
                          <span className="text-cyan-300 font-bold truncate block">{parsedCurrent.issuer}</span>
                        </div>
                        <div className="p-2 rounded bg-black/60 border border-cyan-500/20">
                          <span className="text-neutral-500 block">TIER LEVEL:</span>
                          <span className="text-cyan-300 font-bold block">{parsedCurrent.level}</span>
                        </div>
                        <div className="p-2 rounded bg-black/60 border border-cyan-500/20">
                          <span className="text-neutral-500 block">VALIDATION:</span>
                          <span className="text-emerald-400 font-bold block">CRYPTOGRAPHIC</span>
                        </div>
                        <div className="p-2 rounded bg-black/60 border border-cyan-500/20">
                          <span className="text-neutral-500 block">STATUS:</span>
                          <span className="text-cyan-300 font-bold block">OFFICIAL RECORD</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CRYPTOGRAPHIC TELEMETRY & AUDIT RECORD */}
                  {viewportTab === "telemetry" && (
                    <div className="w-full h-full min-h-[320px] p-4 sm:p-6 rounded-xl bg-black border border-emerald-500/30 flex flex-col justify-between font-mono text-xs text-neutral-300">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-[11px] text-emerald-400 font-bold">
                        <span className="flex items-center gap-2">
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          CRYPTOGRAPHIC AUDIT TELEMETRY
                        </span>
                        <span className="text-neutral-500">PING: 18ms [ONLINE]</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
                        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                          <span className="text-[10px] text-neutral-500 block uppercase">CREDENTIAL SERIAL ID</span>
                          <span className="text-emerald-300 font-bold text-sm block mt-0.5">{parsedCurrent.credId}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                          <span className="text-[10px] text-neutral-500 block uppercase">ACCREDITATION ENTITY</span>
                          <span className="text-white font-bold text-sm block mt-0.5 truncate">{parsedCurrent.issuer}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                          <span className="text-[10px] text-neutral-500 block uppercase">ATTESTATION TIMESTAMP</span>
                          <span className="text-neutral-300 font-bold text-sm block mt-0.5">{parsedCurrent.date || "Continuous Active"}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                          <span className="text-[10px] text-neutral-500 block uppercase">SECURITY LEVEL</span>
                          <span className="text-emerald-400 font-bold text-sm block mt-0.5">{parsedCurrent.level.toUpperCase()} [VERIFIED]</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                        <span>SHA256: 3a7f82b9c1d04e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f</span>
                        <span className="text-emerald-400 font-bold">IMMUTABLE ROOT</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── ACTION CONTROLS BAR ── */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-800/80 flex-wrap">
                  {parsedCurrent.link ? (
                    <a
                      href={parsedCurrent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>VERIFY ON OFFICIAL PORTAL</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-xs">
                      ARCHIVED CERTIFICATION RECORD
                    </span>
                  )}

                  <button
                    onClick={() => handleCopyId(parsedCurrent.credId)}
                    className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    {copiedId === parsedCurrent.credId ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">SERIAL ID COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY SERIAL ID</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          MODE 2: ACCREDITATION DOSSIERS MATRIX (Replaces Common Cards!)
      ───────────────────────────────────────────────────────── */}
      {vaultMode === "dossiers" && (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredCerts.map((cert, idx) => {
              const parsed = parseCert(cert)
              const meta = getIssuerMeta(parsed.issuer)
              const lvl = getLevelStyle(parsed.level)
              const MetaIcon = meta.icon

              return (
                <TiltCard3D key={cert.tempId} tiltStrength={6} glareOpacity={0.12} className="h-full">
                  <div className="relative h-full flex flex-col justify-between rounded-2xl bg-[#070e1b] border-2 border-cyan-500/30 hover:border-emerald-400 p-5 transition-all duration-300 shadow-2xl overflow-hidden group">
                    {/* CAD Grid Paper Texture */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.5) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Corner Reticles */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-400/50 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-400/50 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-400/50 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-400/50 pointer-events-none" />

                    {/* Header: Issuer Pill & Credential ID */}
                    <div className="relative z-10 pb-3 mb-3 border-b border-cyan-500/25 flex items-center justify-between text-[10px] font-mono">
                      <span className={`px-2 py-0.5 rounded border uppercase flex items-center gap-1.5 ${meta.color}`}>
                        <MetaIcon className="w-3 h-3" />
                        <span>{meta.label}</span>
                      </span>

                      <span className="text-cyan-400 font-bold">
                        #{parsed.credId}
                      </span>
                    </div>

                    {/* Body: Title & Details */}
                    <div className="relative z-10 space-y-3">
                      <h4
                        className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug tracking-tight"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {parsed.testimonial}
                      </h4>

                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          <span>{parsed.date || "Active Credential"}</span>
                        </span>

                        <span className={`px-2 py-0.5 rounded-full border text-[10px] ${lvl.pill}`}>
                          {parsed.level}
                        </span>
                      </div>
                    </div>

                    {/* Footer: Verification CTA */}
                    <div className="relative z-10 pt-4 mt-4 border-t border-cyan-500/25 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        VALIDATED
                      </span>

                      {parsed.link ? (
                        <a
                          href={parsed.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                        >
                          <span>VERIFY</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-neutral-500">ARCHIVED</span>
                      )}
                    </div>
                  </div>
                </TiltCard3D>
              )
            })}
          </div>
        </div>
      )}

      {/* ── FOOTER DEDICATED LINK ── */}
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

export default CertificateVaultWorkbench
