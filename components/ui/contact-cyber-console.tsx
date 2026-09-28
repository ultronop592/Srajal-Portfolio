"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, Github, Linkedin, Twitter, Code, Copy, Check, ExternalLink, Send, Sparkles, MessageSquare } from "lucide-react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   CYBER COMMUNICATIONS CONSOLE
   • 1-click clipboard copy with animated verification
   • Pre-filled fast dispatch intent buttons for recruiters
   • 3D Tilt cards with brand hover aura & corner reticles
   • Live encrypted communication status header
───────────────────────────────────────────────────────── */

const QUICK_DISPATCH_PROMPTS = [
  {
    label: "Schedule Interview",
    subject: "Interview Invitation: AI/ML Engineering Role",
    body: "Hi Srajal,\n\nWe came across your portfolio and were very impressed with your work on AgentForge, CloudOps AI, and your selective participation in the Amazon ML Summer School. We would like to schedule an interview with you.",
  },
  {
    label: "Discuss Agentic AI / RAG",
    subject: "Discussion: Agentic AI & RAG Architecture",
    body: "Hi Srajal,\n\nI saw your work on LangGraph multi-agent orchestration and pgvector semantic retrieval. I'd love to connect and discuss technical collaboration or engineering opportunities.",
  },
  {
    label: "General Inquiry",
    subject: "Connecting with Srajal Tiwari",
    body: "Hi Srajal,\n\nReaching out from your portfolio website. Let's connect!",
  },
]

export default function ContactCyberConsole() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey(null)
    }, 2200)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      
      {/* ── TOP TELEMETRY STATUS BANNER ── */}
      <div className="flex items-center justify-between p-3.5 px-5 rounded-2xl bg-neutral-950/90 border border-emerald-500/25 backdrop-blur-xl shadow-xl font-mono text-xs text-neutral-400 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            DISPATCH // CHANNEL_ONLINE
          </span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-neutral-400 hidden sm:inline">24H RESPONSE SLA</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-neutral-500">ENCRYPTION:</span>
          <span className="text-emerald-300 font-semibold">TLS_1.3 // VERIFIED</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">STATUS:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            OPEN TO OFFERS
          </span>
        </div>
      </div>

      {/* ── TWO 3D COLUMNS: DIRECT DISPATCH & SOCIAL RADAR ── */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: DIRECT CONTACT */}
        <TiltCard3D tiltStrength={6} glareOpacity={0.08} className="w-full">
          <div className="h-full rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-black border border-emerald-500/20 hover:border-emerald-500/50 p-6 sm:p-8 transition-all duration-300 shadow-2xl relative group flex flex-col justify-between">
            {/* Corner Cyber Brackets */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                  <span className="text-emerald-500">▸</span> Direct Dispatch
                </h3>
                <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  PRIORITY_INBOX
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {/* Email Item */}
                <div className="relative group/item p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 hover:bg-neutral-900/90 transition-all duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 group-hover/item:scale-110 transition-transform">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono text-neutral-500 block uppercase">PRIMARY EMAIL</span>
                        <a
                          href="mailto:srajaltiwari902@gmail.com"
                          className="text-xs sm:text-sm text-neutral-200 font-mono font-medium hover:text-emerald-300 transition-colors truncate block"
                        >
                          srajaltiwari902@gmail.com
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard("srajaltiwari902@gmail.com", "email")}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-emerald-500/20 border border-neutral-700 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-300 transition-all text-xs font-mono flex items-center gap-1.5 shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copiedKey === "email" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="relative group/item p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 hover:bg-neutral-900/90 transition-all duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 group-hover/item:scale-110 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-mono text-neutral-500 block uppercase">PHONE / WHATSAPP</span>
                        <a
                          href="tel:+919919084211"
                          className="text-xs sm:text-sm text-neutral-200 font-mono font-medium hover:text-emerald-300 transition-colors block"
                        >
                          +91 9919084211
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard("+919919084211", "phone")}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-emerald-500/20 border border-neutral-700 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-300 transition-all text-xs font-mono flex items-center gap-1.5 shrink-0"
                      title="Copy phone to clipboard"
                    >
                      {copiedKey === "phone" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Fast Recruiter Dispatch Prompts */}
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Quick Dispatch Prompts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_DISPATCH_PROMPTS.map((p, idx) => (
                    <a
                      key={idx}
                      href={`mailto:srajaltiwari902@gmail.com?subject=${encodeURIComponent(p.subject)}&body=${encodeURIComponent(p.body)}`}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-emerald-500/25 hover:border-emerald-400 hover:bg-emerald-950/40 text-neutral-300 hover:text-emerald-300 text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{p.label}</span>
                      <Send className="w-3 h-3 text-emerald-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[10px] font-mono text-neutral-500">
              LOCATION: LUCKNOW, INDIA (IST // UTC+5:30)
            </div>
          </div>
        </TiltCard3D>

        {/* RIGHT COLUMN: PROFESSIONAL HUBS & SOCIAL RADAR */}
        <TiltCard3D tiltStrength={6} glareOpacity={0.08} className="w-full">
          <div className="h-full rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-black border border-emerald-500/20 hover:border-emerald-500/50 p-6 sm:p-8 transition-all duration-300 shadow-2xl relative group flex flex-col justify-between">
            {/* Corner Cyber Brackets */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                  <span className="text-emerald-500">▸</span> Professional Radar
                </h3>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  VERIFIED_NETWORKS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    handle: "@ultronop592",
                    href: "https://github.com/ultronop592",
                    desc: "30+ Repositories & Agentic Systems",
                    border: "hover:border-emerald-400 hover:bg-emerald-950/20",
                    iconColor: "text-emerald-400",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    handle: "Srajal Tiwari",
                    href: "https://linkedin.com/in/srajal-tiwari-7229172b9",
                    desc: "Professional History & Recommendations",
                    border: "hover:border-cyan-400 hover:bg-cyan-950/20",
                    iconColor: "text-cyan-400",
                  },
                  {
                    icon: Twitter,
                    label: "X (Twitter)",
                    handle: "@SrajalT54493802",
                    href: "https://x.com/SrajalT54493802",
                    desc: "Applied AI, Agentic Workflows & Tech",
                    border: "hover:border-blue-400 hover:bg-blue-950/20",
                    iconColor: "text-blue-400",
                  },
                  {
                    icon: Code,
                    label: "Kaggle",
                    handle: "srajaltiwari76",
                    href: "https://www.kaggle.com/srajaltiwari76",
                    desc: "Google/Kaggle AI Agents Certified",
                    border: "hover:border-amber-400 hover:bg-amber-950/20",
                    iconColor: "text-amber-400",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/social p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 ${item.border} transition-all duration-300 flex flex-col justify-between shadow-md`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-black/60 border border-neutral-700/60 ${item.iconColor} group-hover/social:scale-110 transition-transform`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover/social:text-white transition-colors" />
                      </div>
                      <div className="text-white text-sm font-semibold font-mono tracking-tight group-hover/social:text-emerald-300 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400 truncate">
                        {item.handle}
                      </div>
                    </div>
                    <div className="mt-3 text-[10px] text-neutral-500 font-mono line-clamp-1 border-t border-neutral-800 pt-2">
                      {item.desc}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>LEETCODE: @SrajalTiwari</span>
              <span className="text-emerald-400/80 font-bold">100+ DAYS ACTIVE</span>
            </div>
          </div>
        </TiltCard3D>
      </div>
    </div>
  )
}
