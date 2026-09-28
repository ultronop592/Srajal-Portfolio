"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ExternalLink,
  Github,
  BookOpen,
  ArrowUpRight,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Activity,
  Shield,
  Database,
  Code,
  Zap,
  CheckCircle2,
  Sliders,
  Maximize2,
  FileCode,
  Workflow,
  Search,
  ChevronRight,
  Monitor,
  GitBranch,
  Radio,
} from "lucide-react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"
import { ProjectDetailModal, type ProjectSlide } from "@/components/ui/project-detail-modal"

/* ─────────────────────────────────────────────────────────
   PROJECT BLUEPRINT WORKBENCH
   • Replaces conventional cards with an Interactive 3D Mission Control
     & Technical Blueprint Schematics Dossier
   • 3 Interactive Viewport Modes:
     1. [3D VIEWPORT // LIVE UI]: 3D isometric tilt canvas with laser scanline
     2. [2D SCHEMATIC // BLUEPRINT FLOW]: Technical architectural drafting diagram
     3. [TELEMETRY // SYSTEM SPECS]: Monospace performance specs & metrics
   • Selector Rail with live deployment status and quick category filtering
   • Technical blueprint drafting annotations, ruler markers & CAD crosshairs
   • Direct modal linkage to detailed 9-stage architecture & LangGraph specs
───────────────────────────────────────────────────────── */

interface ProjectBlueprintWorkbenchProps {
  projects: ProjectSlide[]
  filterOptions: string[]
  activeTags: string[]
  onTagToggle: (tag: string) => void
  onClearTags: () => void
}

export default function ProjectBlueprintWorkbench({
  projects,
  filterOptions,
  activeTags,
  onTagToggle,
  onClearTags,
}: ProjectBlueprintWorkbenchProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [workbenchMode, setWorkbenchMode] = useState<"cockpit" | "blueprints">("cockpit")
  const [viewportTab, setViewportTab] = useState<"ui" | "schematic" | "specs">("ui")
  const [selectedModalProject, setSelectedModalProject] = useState<ProjectSlide | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Ensure selected index is always in bounds
  const currentProject = projects[selectedIdx] || projects[0]

  useEffect(() => {
    if (selectedIdx >= projects.length) {
      setSelectedIdx(0)
    }
  }, [projects.length, selectedIdx])

  // Filter projects by search query
  const filteredProjects = projects.filter((p) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
    )
  })

  // System flow blueprints by project title keyword
  const getSchematicFlow = (proj: ProjectSlide) => {
    if (proj.architecture?.systemFlow && proj.architecture.systemFlow.length > 0) {
      return proj.architecture.systemFlow
    }
    const title = proj.title.toLowerCase()
    if (title.includes("meeting")) {
      return [
        "Audio/Video Stream",
        "Ingestion Buffer",
        "Acoustic Diarization",
        "Whisper STT",
        "LangGraph Extractor",
        "768d pgvector",
        "Jira & Slack Sync",
      ]
    }
    if (title.includes("cloudops")) {
      return [
        "AWS STS Identity",
        "Multi-Service Boto3 Telemetry",
        "26-Rule Audit Engine",
        "Bedrock Reasoning",
        "1-Click Boto3 Remediation",
        "UUID Audit Receipt",
      ]
    }
    if (title.includes("forge")) {
      return [
        "User Objective",
        "LangGraph Supervisor",
        "Planner ➔ Executor",
        "QA Verification Loop",
        "MCP Tool Execution",
        "SSE Client Stream",
      ]
    }
    if (title.includes("unlegalize")) {
      return [
        "Contract Document",
        "OCR Extraction",
        "Regex Clause Chunking",
        "Fine-Tuned Gemma 3",
        "PEFT/LoRA Weights",
        "Risk Rating & Plain English",
      ]
    }
    if (title.includes("rag")) {
      return [
        "User Semantic Query",
        "Intent Router",
        "Qdrant Hybrid Search",
        "Dense + BM25 Fusion",
        "Gemini 2.5 Flash",
        "Streaming Response",
      ]
    }
    if (title.includes("email")) {
      return [
        "Resume + Job URL",
        "Web Scraping Node",
        "ChromaDB Vector Match",
        "Groq Llama-3 Synthesis",
        "Cold Email Output",
      ]
    }
    // Generic production ML pipeline
    return [
      "Input Telemetry",
      "Data Ingestion",
      "Feature Engineering",
      "Model Inference Engine",
      "Evaluation Metrics",
      "Client Dashboard",
    ]
  }

  const schematicNodes = currentProject ? getSchematicFlow(currentProject) : []

  return (
    <div className="w-full relative">
      {/* ── WORKBENCH CONTROL HEADER ── */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-950/80 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <button
              onClick={() => setWorkbenchMode("cockpit")}
              className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                workbenchMode === "cockpit"
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                  : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>3D COMMAND WORKBENCH</span>
            </button>

            <button
              onClick={() => setWorkbenchMode("blueprints")}
              className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                workbenchMode === "blueprints"
                  ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                  : "bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>BLUEPRINT DOSSIER ({projects.length})</span>
            </button>
          </div>

          {/* Search & Fast Filter Bar */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search architecture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            {activeTags.length > 0 && (
              <button
                onClick={onClearTags}
                className="px-2.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mr-2 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-emerald-400" />
            FILTER:
          </span>
          {filterOptions.map((tag) => {
            const isActive = activeTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-sm"
                    : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
                }`}
              >
                #{tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          MODE 1: 3D COMMAND COCKPIT WORKBENCH
      ───────────────────────────────────────────────────────── */}
      {workbenchMode === "cockpit" && currentProject && (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-7xl mx-auto">
            
            {/* ── LEFT COLUMN: INTERACTIVE PROJECT NAVIGATION RAIL (4 cols) ── */}
            <div className="lg:col-span-4 rounded-2xl bg-neutral-950/85 border border-emerald-500/20 backdrop-blur-xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2 max-h-[720px] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-neutral-800/80 px-2 text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  PROJECT_INDEX
                </span>
                <span>{projects.length} ARCHITECTURES</span>
              </div>

              {filteredProjects.map((proj, idx) => {
                const isSelected = proj.title === currentProject.title
                const globalIdx = projects.findIndex((p) => p.title === proj.title)

                return (
                  <motion.div
                    key={proj.title}
                    onClick={() => setSelectedIdx(globalIdx)}
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
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-neutral-500">
                          PRJ_{String(globalIdx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 border border-neutral-800 text-emerald-400 uppercase">
                          {proj.tagline || proj.category}
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight pl-1 font-sans">
                      {proj.title}
                    </h4>

                    <p className="text-[11px] text-neutral-400 line-clamp-1 pl-1 mt-0.5 font-mono">
                      {proj.description}
                    </p>

                    {/* Tech Badges Mini Preview */}
                    <div className="flex flex-wrap gap-1 mt-2 pl-1">
                      {proj.tech.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-400"
                        >
                          {t}
                        </span>
                      ))}
                      {proj.tech.length > 3 && (
                        <span className="text-[9px] font-mono text-neutral-600">
                          +{proj.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* ── RIGHT COLUMN: 3D HOLOGRAPHIC VIEWPORT & TELEMETRY DECK (8 cols) ── */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Main Mission Viewport */}
              <div className="rounded-3xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border border-emerald-500/25 backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                
                {/* Corner Technical Crosshairs */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ 0.00
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ 1.00
                </div>
                <div className="absolute bottom-3 left-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ LAT_OK
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-500/40 pointer-events-none">
                  ✛ SEC_2026
                </div>

                {/* Top Viewport Header: Title & Tab Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-800/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/35 text-emerald-300 uppercase tracking-widest">
                        {currentProject.tagline || currentProject.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        // ARCH_ID: {String(selectedIdx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {currentProject.title}
                    </h3>
                  </div>

                  {/* Mode Tab Switcher */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-neutral-800">
                    <button
                      onClick={() => setViewportTab("ui")}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                        viewportTab === "ui"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      3D UI VIEW
                    </button>
                    <button
                      onClick={() => setViewportTab("schematic")}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                        viewportTab === "schematic"
                          ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      2D BLUEPRINT
                    </button>
                    <button
                      onClick={() => setViewportTab("specs")}
                      className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                        viewportTab === "specs"
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
                  
                  {/* TAB 1: 3D ISOMETRIC UI VIEWPORT */}
                  {viewportTab === "ui" && (
                    <TiltCard3D tiltStrength={10} glareOpacity={0.15} className="w-full h-full">
                      <div className="relative w-full h-[320px] sm:h-[360px] rounded-xl overflow-hidden group/thumb border border-neutral-800">
                        <img
                          src={currentProject.image}
                          alt={currentProject.title}
                          className="w-full h-full object-cover object-top filter brightness-95 group-hover/thumb:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                          }}
                        />

                        {/* Top Technical HUD Coordinates */}
                        <div className="absolute top-2 inset-x-2 flex items-center justify-between text-[9px] font-mono text-emerald-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-emerald-500/20 pointer-events-none">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            VIEWPORT_CAM // ELEVATION 28°
                          </span>
                          <span>RESOLUTION: 1920×1080</span>
                        </div>

                        {/* Hover Laser Scanline */}
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-all duration-700 pointer-events-none group-hover/thumb:translate-y-64" />

                        {/* Bottom Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />

                        {/* Bottom HUD Tags */}
                        {currentProject.metrics && currentProject.metrics[0] && (
                          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 font-semibold shadow-lg">
                            {currentProject.metrics[0]}
                          </div>
                        )}
                      </div>
                    </TiltCard3D>
                  )}

                  {/* TAB 2: 2D ARCHITECTURAL BLUEPRINT FLOW (Technical Drafting Schematic) */}
                  {viewportTab === "schematic" && (
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
                            ARCHITECTURAL DRAFTING // PIPELINE
                          </span>
                          <span className="text-cyan-500 hidden sm:inline">SCALE: 1:1 CAD</span>
                        </div>
                        <span className="text-emerald-400 font-bold">
                          ✓ PRODUCTION CERTIFIED
                        </span>
                      </div>

                      {/* The Flow Diagram Nodes */}
                      <div className="relative z-10 py-6 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-3 min-w-max px-2">
                          {schematicNodes.map((node, i) => (
                            <React.Fragment key={i}>
                              <div className="flex flex-col items-center">
                                <div className="px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-cyan-500/40 shadow-lg text-center min-w-[110px] sm:min-w-[130px] group/node hover:border-emerald-400 hover:scale-105 transition-all">
                                  <div className="text-[9px] font-mono text-cyan-400/80 mb-1 font-bold">
                                    STAGE 0{i + 1}
                                  </div>
                                  <div className="text-xs font-mono font-semibold text-neutral-100 line-clamp-2">
                                    {node}
                                  </div>
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 animate-ping" />
                              </div>

                              {i < schematicNodes.length - 1 && (
                                <div className="flex items-center text-cyan-500 -mt-3">
                                  <div className="w-5 sm:w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-400" />
                                  <ChevronRight className="w-4 h-4 -ml-1 text-emerald-400" />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Blueprint Footer Drafting Metadata */}
                      <div className="relative z-10 pt-3 border-t border-cyan-500/30 flex items-center justify-between text-[10px] font-mono text-cyan-400/70 flex-wrap gap-2">
                        <span>DRAWN BY: SRAJAL TIWARI (AI/ML ENGINEER)</span>
                        <span>ORCHESTRATION: LANGGRAPH & FASTAPI</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: TELEMETRY & SYSTEM SPECS HUD */}
                  {viewportTab === "specs" && (
                    <div className="w-full h-full min-h-[320px] p-4 sm:p-6 rounded-xl bg-neutral-950 border border-emerald-500/25 flex flex-col justify-between font-mono text-xs text-neutral-300 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-emerald-400 text-[11px] font-bold">
                        <span>SYSTEM TELEMETRY HUD</span>
                        <span>RUNTIME: PROD_OK</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {currentProject.specs?.map((sp, i) => (
                          <div key={i} className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                            <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">
                              {sp.label}
                            </span>
                            <span className="text-neutral-100 font-bold">{sp.value}</span>
                          </div>
                        ))}
                      </div>

                      {currentProject.aiLayer && (
                        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300">
                          <span className="font-bold block mb-1">AI CORE LAYER:</span>
                          {currentProject.aiLayer}
                        </div>
                      )}

                      {currentProject.databaseMemory && (
                        <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                          <span className="text-cyan-400 font-bold block mb-1">PERSISTENT MEMORY STORE:</span>
                          {currentProject.databaseMemory}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── DETAILS, SPEC HUD, TECH CHIPS & ACTIONS ── */}
                <div className="mt-6 space-y-5">
                  {/* Brief / Details */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                    {currentProject.brief || currentProject.details}
                  </p>

                  {/* Specs Mini Gauges */}
                  {currentProject.specs && currentProject.specs.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentProject.specs.map((sp, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-neutral-900/90 border border-emerald-500/15"
                        >
                          <div className="text-[9px] font-mono uppercase text-neutral-400 truncate">
                            {sp.label}
                          </div>
                          <div className="text-xs font-mono font-bold text-emerald-300 truncate">
                            {sp.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold">
                      // ARCHITECTURAL STACK:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-neutral-900/80 border border-neutral-700/60 text-xs font-mono text-neutral-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Controls Bar */}
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/80 flex-wrap">
                    {currentProject.liveDemo && currentProject.liveDemo !== "#" && (
                      <a
                        href={currentProject.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>LAUNCH LIVE DEMO</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}

                    {currentProject.github && currentProject.github !== "#" && (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>SOURCE CODE</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedModalProject(currentProject)}
                      className="py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-white font-mono text-xs font-semibold flex items-center gap-2 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>DEEP ARCHITECTURE SPECS</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          MODE 2: ARCHITECTURAL BLUEPRINTS MATRIX (Replaces Boring Card Grid!)
      ───────────────────────────────────────────────────────── */}
      {workbenchMode === "blueprints" && (
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((proj, idx) => {
              const flow = getSchematicFlow(proj)

              return (
                <TiltCard3D key={proj.title} tiltStrength={6} glareOpacity={0.12} className="h-full">
                  <div className="relative h-full flex flex-col justify-between rounded-2xl bg-[#070e1b] border-2 border-cyan-500/30 hover:border-emerald-400 p-5 sm:p-6 transition-all duration-300 shadow-2xl overflow-hidden group">
                    
                    {/* Blueprint CAD Grid Paper Texture */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(6, 182, 212, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.5) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Top Architectural Dossier Title Block */}
                    <div className="relative z-10 pb-3 mb-4 border-b border-cyan-500/30 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                      <div className="flex items-center gap-2">
                        <span className="font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 uppercase">
                          BLUEPRINT_DOC // #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-neutral-500 hidden sm:inline">SCALE: 1:1</span>
                      </div>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        VERIFIED_PROD
                      </span>
                    </div>

                    {/* Image with CAD Blueprint Overlay */}
                    <div className="relative z-10 mb-4 rounded-xl overflow-hidden bg-black/90 border border-cyan-500/30 h-48 group/img">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top filter brightness-90 group-hover/img:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                        }}
                      />
                      
                      {/* Laser Scanline */}
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover/img:opacity-100 transition-all duration-700 pointer-events-none group-hover/img:translate-y-44" />

                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                        {proj.tagline || proj.category.toUpperCase()}
                      </div>

                      {proj.metrics && proj.metrics[0] && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold">
                          {proj.metrics[0]}
                        </div>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div className="relative z-10 mb-4">
                      <h3
                        className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors"
                        style={{ fontFamily: "Syne, sans-serif" }}
                      >
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-emerald-400/90 mt-1">
                        {proj.description}
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-2 font-sans line-clamp-2">
                        {proj.brief || proj.details}
                      </p>
                    </div>

                    {/* Miniature Architectural Pipeline Flow */}
                    <div className="relative z-10 mb-4 p-3 rounded-xl bg-black/60 border border-cyan-500/20">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block mb-1.5 font-bold">
                        // EXECUTION FLOW:
                      </span>
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono text-neutral-300">
                        {flow.slice(0, 4).map((f, i) => (
                          <React.Fragment key={i}>
                            <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 whitespace-nowrap">
                              {f}
                            </span>
                            {i < Math.min(flow.length - 1, 3) && (
                              <span className="text-cyan-400">➔</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="relative z-10 flex flex-wrap gap-1 mb-5">
                      {proj.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-neutral-900 border border-cyan-500/20 text-[10px] font-mono text-neutral-300"
                        >
                          #{t}
                        </span>
                      ))}
                      {proj.tech.length > 5 && (
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 text-[10px] font-mono text-neutral-500">
                          +{proj.tech.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Blueprint Action Bar */}
                    <div className="relative z-10 pt-3 border-t border-cyan-500/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {proj.liveDemo && proj.liveDemo !== "#" && (
                          <a
                            href={proj.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
                          >
                            <span>LIVE DEMO</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {proj.github && proj.github !== "#" && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                            title="Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedModalProject(proj)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>SPECS</span>
                      </button>
                    </div>
                  </div>
                </TiltCard3D>
              )
            })}
          </div>
        </div>
      )}

      {/* ── PROJECT DETAIL MODAL LINKAGE ── */}
      <ProjectDetailModal
        project={selectedModalProject}
        isOpen={!!selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  )
}
