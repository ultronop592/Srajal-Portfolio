"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Trophy,
  Award,
  ExternalLink,
  Eye,
  ShieldCheck,
  Zap,
  Sparkles,
  X,
  Maximize2,
  CheckCircle2,
  Calendar,
  Building2,
  Code2,
} from "lucide-react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

export interface AchievementItem {
  id: string
  title: string
  category: "hackathons" | "programs" | "dsa" | "certifications"
  badge: string
  badgeType: "gold" | "emerald" | "cyan" | "purple"
  issuer: string
  date: string
  highlight: string
  tags: string[]
  imageUrl: string
  proofUrl: string
  proofType: "image" | "pdf"
  featured?: boolean
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "kalpathon-winner",
    title: "UnLegalize — AI Legal Simplification",
    category: "hackathons",
    badge: "🏆 2nd Place Winner",
    badgeType: "gold",
    issuer: "Kalpathon 2.0 • BBD University",
    date: "April 2026",
    highlight:
      "Awarded 2nd Place out of dozens of competitive teams. Engineered UnLegalize: fine-tuned Gemma-3 270M via LoRA (PEFT) on Indian tenancy laws, integrated OCR contract parsing, clause-level risk scoring, and sub-second FastAPI inference.",
    tags: ["Gemma-3 270M", "LoRA / PEFT", "FastAPI", "OCR", "Legal AI"],
    imageUrl: "/WhatsApp Image 2026-05-14 at 9.27.07 AM.jpeg",
    proofUrl: "/WhatsApp Image 2026-05-14 at 9.27.07 AM.jpeg",
    proofType: "image",
    featured: true,
  },
  {
    id: "amazon-ml-school",
    title: "Amazon ML Summer School 2026",
    category: "programs",
    badge: "🌟 Amazon ML Scholar",
    badgeType: "gold",
    issuer: "Amazon Science • Virtual",
    date: "July – August 2026",
    highlight:
      "Selected for Amazon's flagship machine learning program. Completed 8 comprehensive modules delivered live by Amazon Scientists covering Deep Neural Networks, Generative AI, Large Language Models, Agentic AI, and Causal Inference.",
    tags: ["Amazon Scientists", "Deep Learning", "Generative AI", "Causal Inference"],
    imageUrl: "/images/amazon-ml-summer-school-2026.png",
    proofUrl: "/Amazon-ML-Summer-School-2026-Acknowledgement.pdf",
    proofType: "pdf",
    featured: true,
  },
  {
    id: "google-agentic-ai",
    title: "Project Drishti — Agentic AI System",
    category: "hackathons",
    badge: "☁️ Google Cloud Hackathon",
    badgeType: "cyan",
    issuer: "Google Cloud × Hack2skill",
    date: "2026",
    highlight:
      "Engineered Project Drishti at Google Cloud Agentic AI Day Hackathon. Architected autonomous multi-agent workflows with Gemini APIs, multi-tool calling, function execution pipelines, and cloud deployment.",
    tags: ["Agentic AI", "Google Cloud", "Gemini API", "Multi-Agent"],
    imageUrl: "/images/hack2skill-certificate-20-281-29.png",
    proofUrl: "/images/hack2skill-certificate-20-281-29.png",
    proofType: "image",
    featured: true,
  },
  {
    id: "leetcode-streak",
    title: "100+ Days LeetCode DSA Streak",
    category: "dsa",
    badge: "⚡ 100-Day DSA Streak",
    badgeType: "emerald",
    issuer: "LeetCode & GitHub • 2025–2026",
    date: "2025 – 2026",
    highlight:
      "Maintained a strict 100+ consecutive days coding streak on LeetCode across Advanced Data Structures, Dynamic Programming, and Graph Algorithms, with 350+ GitHub contributions demonstrating relentless problem-solving discipline.",
    tags: ["Data Structures", "Algorithms", "Dynamic Programming", "350+ Solved"],
    imageUrl: "/images/leetcode-100-days-badge.png",
    proofUrl: "/images/leetcode-100-days-badge.png",
    proofType: "image",
  },
  {
    id: "kaggle-ai-agents",
    title: "5-Day AI Agents & Vibe Coding",
    category: "certifications",
    badge: "🤖 AI Agents Specialist",
    badgeType: "emerald",
    issuer: "Kaggle × Google",
    date: "July 30, 2026",
    highlight:
      "Completed an intensive 5-day agentic AI engineering track covering autonomous agents, multi-agent coordination, tool-calling architectures, prompt chains, and modern AI-assisted vibe-coding patterns.",
    tags: ["AI Agents", "Agentic Workflows", "Kaggle", "Google"],
    imageUrl: "/5-Day AI Agents_ Intensive Vibe Coding Course.png",
    proofUrl: "/5-Day AI Agents_ Intensive Vibe Coding Course.png",
    proofType: "image",
  },
  {
    id: "startup-school",
    title: "Startup School: Prompt to Prototype",
    category: "programs",
    badge: "🚀 Google for Startups",
    badgeType: "cyan",
    issuer: "Google for Startups × Scaler",
    date: "2025",
    highlight:
      "Selected for 2-week intensive AI product lifecycle track by Google for Startups and Scaler, mastering foundation model prompting, creative asset generation, rapid prototyping, and production deployment.",
    tags: ["Google Startups", "Prompt Engineering", "AI Prototyping", "Scaler"],
    imageUrl: "/images/google-startup-school-certificate.png",
    proofUrl: "/images/google-startup-school-certificate.png",
    proofType: "image",
  },
  {
    id: "mission-upskill",
    title: "Mission Upskill India AI Summit",
    category: "programs",
    badge: "🇮🇳 National AI Summit",
    badgeType: "purple",
    issuer: "MeitY × Digital India × HCL GUVI",
    date: "2026",
    highlight:
      "Participated in the AI Impact Summit organized with the Ministry of Electronics & IT (MeitY) and HCL GUVI. Gained hands-on experience in Gemini AI Studio rapid prototyping, deep learning concepts, and enterprise AI readiness.",
    tags: ["MeitY", "Digital India", "HCL GUVI", "Gemini Studio"],
    imageUrl: "/images/hcl-guvi-ai-summit-certificate.jpg",
    proofUrl: "/images/hcl-guvi-ai-summit-certificate.jpg",
    proofType: "image",
  },
  {
    id: "gdg-badges",
    title: "Google GDG & Gen AI Exchange",
    category: "certifications",
    badge: "🔷 Verified Badges",
    badgeType: "cyan",
    issuer: "GDG Lucknow & Gen AI Exchange",
    date: "2025",
    highlight:
      "Earned verified technical skill badges and milestones in Generative AI architectures, prompt optimization, and Cloud AI tooling from Google Developer Groups Lucknow and Google Gen AI Exchange.",
    tags: ["GDG", "Gen AI Exchange", "Google Cloud", "AI Badges"],
    imageUrl: "/images/screenshot-202025-11-15-20102310.png",
    proofUrl: "/images/screenshot-202025-11-15-20102310.png",
    proofType: "image",
  },
  {
    id: "bbdu-exhibition",
    title: "Esports Strategy Hub Exhibition",
    category: "hackathons",
    badge: "🎯 Software Exhibition",
    badgeType: "emerald",
    issuer: "BBD University",
    date: "2025",
    highlight:
      "Demonstrated 'Esports Strategy Hub' at BBDU Software Exhibition. Commended by faculty and peers for full-stack data modeling, real-time match analytics, and predictive strategy dashboards.",
    tags: ["BBDU", "Software Demo", "Real-Time Analytics", "Full Stack"],
    imageUrl: "/images/whatsapp-20image-202025-11-15-20at-2010.jpeg",
    proofUrl: "/images/whatsapp-20image-202025-11-15-20at-2010.jpeg",
    proofType: "image",
  },
  {
    id: "coding-ninjas",
    title: "Ninja Slayground 2.0 Coding Sprint",
    category: "dsa",
    badge: "⚔️ 21-Day Challenge",
    badgeType: "purple",
    issuer: "Coding Ninjas",
    date: "2025",
    highlight:
      "Completed 21 consecutive days of rigorous algorithmic challenges on Coding Ninjas platform, solving intricate data structures, recursion, dynamic programming, and optimization problems under timed constraints.",
    tags: ["Coding Ninjas", "Competitive Coding", "DSA", "Problem Solving"],
    imageUrl: "/images/screenshot-202025-11-15-20101639.png",
    proofUrl: "/images/screenshot-202025-11-15-20101639.png",
    proofType: "image",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Milestones", count: ACHIEVEMENTS_DATA.length },
  {
    id: "hackathons",
    label: "🏆 Hackathons & Wins",
    count: ACHIEVEMENTS_DATA.filter((a) => a.category === "hackathons").length,
  },
  {
    id: "programs",
    label: "🌟 Honors & Fellowships",
    count: ACHIEVEMENTS_DATA.filter((a) => a.category === "programs").length,
  },
  {
    id: "dsa",
    label: "⚡ DSA & Streaks",
    count: ACHIEVEMENTS_DATA.filter((a) => a.category === "dsa").length,
  },
  {
    id: "certifications",
    label: "📜 AI Specializations",
    count: ACHIEVEMENTS_DATA.filter((a) => a.category === "certifications").length,
  },
]

export default function AchievementsSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [previewItem, setPreviewItem] = useState<AchievementItem | null>(null)

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewItem(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    if (previewItem) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [previewItem])

  const filteredItems =
    activeTab === "all"
      ? ACHIEVEMENTS_DATA
      : ACHIEVEMENTS_DATA.filter((item) => item.category === activeTab)

  const getBadgeStyles = (type: AchievementItem["badgeType"]) => {
    switch (type) {
      case "gold":
        return "bg-amber-950/70 border-amber-500/40 text-amber-300 shadow-amber-950/40"
      case "cyan":
        return "bg-cyan-950/70 border-cyan-500/40 text-cyan-300 shadow-cyan-950/40"
      case "purple":
        return "bg-purple-950/70 border-purple-500/40 text-purple-300 shadow-purple-950/40"
      case "emerald":
      default:
        return "bg-emerald-950/70 border-emerald-500/40 text-emerald-300 shadow-emerald-950/40"
    }
  }

  return (
    <div className="w-full relative">
      {/* ── TOP STATS HUD TICKER ── */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-3 rounded-2xl bg-neutral-950/80 border border-emerald-500/20 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-emerald-500/10">
            <div className="p-2.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Hackathon Podium
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono">
                2nd Place Winner
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-emerald-500/10">
            <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Industry Scholar
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono">
                Amazon ML School
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-emerald-500/10">
            <div className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Coding Streak
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono">
                100+ Days LeetCode
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/60 border border-emerald-500/10">
            <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                Verified Proofs
              </div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono">
                10 Verified Records
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10 max-w-4xl mx-auto">
        {CATEGORIES.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-950/60 scale-[1.02]"
                  : "bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:border-emerald-500/30 hover:text-neutral-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? "bg-emerald-500/30 text-emerald-200"
                    : "bg-neutral-900 text-neutral-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── ACHIEVEMENTS CARDS GRID ── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const badgeStyle = getBadgeStyles(item.badgeType)

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <TiltCard3D
                  tiltStrength={6}
                  glareOpacity={0.12}
                  className="h-full rounded-2xl"
                >
                  <div
                    className={`group relative h-full flex flex-col justify-between rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-2xl ${
                      item.featured
                        ? "bg-neutral-950/90 border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-emerald-950/50"
                        : "bg-neutral-950/80 border-emerald-500/15 hover:border-emerald-500/50"
                    }`}
                  >
                    {/* Corner Cyber Brackets */}
                    <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none z-20" />
                    <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none z-20" />
                    <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none z-20" />
                    <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 group-hover:scale-110 transition-all pointer-events-none z-20" />

                    {/* Top Glowing Ambient Edge */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* CARD UPPER: PREVIEW IMAGE CONTAINER */}
                    <div>
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-950 border-b border-emerald-500/15">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-contain p-2 sm:p-3 filter brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                          loading="lazy"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                          }}
                        />

                        {/* Dark Gradient Overlay at Bottom of Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                        {/* Top-Left Floating Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border shadow-md backdrop-blur-md ${badgeStyle}`}
                          >
                            {item.badge}
                          </span>
                        </div>

                        {/* Top-Right Status Dot */}
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/75 border border-emerald-500/30 backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold tracking-wider">
                            VERIFIED
                          </span>
                        </div>

                        {/* Quick View Button Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-black text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all transform hover:scale-105 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick Preview</span>
                          </button>
                          <a
                            href={item.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-neutral-900/90 border border-emerald-500/40 text-emerald-300 hover:bg-neutral-800 transition-all cursor-pointer"
                            title="Open Original Proof"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* CARD CONTENT */}
                      <div className="p-6 space-y-4">
                        {/* Meta: Organization & Date */}
                        <div className="flex items-center justify-between text-xs font-mono text-emerald-400/90 gap-2 flex-wrap">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="truncate">{item.issuer}</span>
                          </span>
                          <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-neutral-500" />
                            {item.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight leading-snug"
                          style={{ fontFamily: "Syne, sans-serif" }}
                        >
                          {item.title}
                        </h3>

                        {/* Summary / Impact */}
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                          {item.highlight}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER ACTIONS */}
                    <div className="px-6 pb-6 pt-2 border-t border-emerald-500/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Document</span>
                      </button>

                      <a
                        href={item.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-semibold transition-all duration-200"
                      >
                        <span>
                          {item.proofType === "pdf" ? "Open PDF" : "Credential"}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── LIGHTBOX / PROOF PREVIEW MODAL ── */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-neutral-950 border border-emerald-500/30 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-emerald-500/20 bg-neutral-900/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4
                      className="text-base sm:text-lg font-bold text-white tracking-tight"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {previewItem.title}
                    </h4>
                    <p className="text-xs font-mono text-emerald-400">
                      {previewItem.issuer} • {previewItem.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewItem.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <span>Open Full</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewItem(null)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Media Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-black/60 flex flex-col items-center justify-center min-h-[350px]">
                {previewItem.proofType === "pdf" ? (
                  <div className="w-full h-[550px] rounded-xl overflow-hidden border border-emerald-500/20 bg-neutral-950">
                    <iframe
                      src={`${previewItem.proofUrl}#toolbar=0`}
                      className="w-full h-full"
                      title={previewItem.title}
                    />
                  </div>
                ) : (
                  <div className="relative max-h-[60vh] max-w-full overflow-hidden rounded-xl border border-emerald-500/20 bg-neutral-950 flex items-center justify-center p-2 shadow-2xl">
                    <img
                      src={previewItem.proofUrl}
                      alt={previewItem.title}
                      className="max-h-[58vh] max-w-full object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* Details Footer inside Modal */}
                <div className="w-full mt-4 p-4 rounded-xl bg-neutral-900/70 border border-emerald-500/15 text-left space-y-2.5">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {previewItem.highlight}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {previewItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
