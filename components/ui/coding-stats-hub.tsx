"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Code, Flame, Trophy, GitCommit, Award, ExternalLink, Activity, Sparkles, Terminal } from "lucide-react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

/* ─────────────────────────────────────────────────────────
   CYBER DIAGNOSTIC CODING STATS HUB
   • Metric counters: 100+ Days, 500+ Commits, 350+ Solved, 2nd Place
   • Tab switcher: Verified Screenshot vs Live Metric Breakdown
   • 3D Tilt framing with animated laser scanlines
───────────────────────────────────────────────────────── */

const TELEMETRY_COUNTERS = [
  {
    icon: Flame,
    value: "100+",
    label: "Consecutive Days",
    subtext: "LeetCode Algorithmic Streak",
    color: "from-amber-400 to-orange-500",
    border: "border-amber-500/30",
    bg: "bg-amber-950/20",
  },
  {
    icon: GitCommit,
    value: "500+",
    label: "Yearly Commits",
    subtext: "GitHub Open-Source Telemetry",
    color: "from-emerald-400 to-cyan-500",
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/20",
  },
  {
    icon: Code,
    value: "350+",
    label: "Problems Solved",
    subtext: "DSA, ML & Optimization",
    color: "from-cyan-400 to-blue-500",
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/20",
  },
  {
    icon: Trophy,
    value: "2nd Place",
    label: "Hackathon Podium",
    subtext: "Kalpathon 2.0 National Finalist",
    color: "from-emerald-400 to-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/20",
  },
]

export default function CodingStatsHub() {
  const [githubTab, setGithubTab] = useState<"snapshot" | "metrics">("snapshot")
  const [leetcodeTab, setLeetcodeTab] = useState<"snapshot" | "metrics">("snapshot")

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* ── LIVE TELEMETRY RIBBON ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {TELEMETRY_COUNTERS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className={`relative rounded-2xl p-4 sm:p-5 border ${item.border} ${item.bg} backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden group`}
          >
            {/* Corner cyber tick */}
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400/40 group-hover:bg-emerald-400 transition-colors" />

            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-700/60 text-emerald-400 group-hover:scale-110 transition-transform">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest truncate">
                {item.label}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mb-1">
              <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.value}
              </span>
            </div>

            <div className="text-[11px] font-mono text-neutral-400/90 line-clamp-1">
              {item.subtext}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── 3D STATS TILES ── */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* 1. GITHUB STATS CARD */}
        <TiltCard3D tiltStrength={8} glareOpacity={0.15} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-emerald-500/25 bg-neutral-950/90 backdrop-blur-xl shadow-2xl hover:border-emerald-500/60 transition-all duration-500 group flex flex-col justify-between"
          >
            {/* Diagnostic Header Bar */}
            <div className="flex items-center justify-between p-3.5 px-5 bg-neutral-900/90 border-b border-emerald-500/15">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold">
                <Github className="h-4 w-4" />
                <span>GITHUB // SYSTEM_TELEMETRY</span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setGithubTab("snapshot")}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    githubTab === "snapshot"
                      ? "bg-emerald-500/20 text-emerald-300 font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  SNAPSHOT
                </button>
                <button
                  onClick={() => setGithubTab("metrics")}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    githubTab === "metrics"
                      ? "bg-emerald-500/20 text-emerald-300 font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  METRICS
                </button>
              </div>
            </div>

            {/* Corner Cyber Brackets */}
            <div className="absolute top-12 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />
            <div className="absolute top-12 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />

            {/* Card Content Area */}
            <div className="relative min-h-[280px] p-4 flex items-center justify-center">
              {githubTab === "snapshot" ? (
                <a
                  href="https://github.com/ultronop592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full overflow-hidden rounded-xl border border-neutral-800 group/img"
                >
                  <img
                    src="/Screenshot 2026-08-24 123542.png"
                    alt="GitHub Stats"
                    className="w-full h-auto object-cover filter brightness-95 group-hover/img:scale-105 group-hover/img:brightness-105 transition-all duration-500"
                  />
                  {/* Subtle laser scanline sweep */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="w-full space-y-4 py-2 font-mono">
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Total Repositories</span>
                    <span className="text-emerald-400 font-bold">30+ Repos</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Top Production Stack</span>
                    <span className="text-cyan-300 font-semibold">Python • TypeScript • Next.js</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Open-Source Contributions</span>
                    <span className="text-emerald-400 font-bold">500+ Annual Commits</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">CI/CD & Deployment</span>
                    <span className="text-neutral-200">GitHub Actions • Docker • Vercel</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300/90">
                    ⚡ Production repos include AgentForge (LangGraph), CloudOps AI (AWS Remediation), and Meeting Intelligence Agent.
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-3.5 px-5 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-500">USER: @ultronop592</span>
              <a
                href="https://github.com/ultronop592"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <span>VISIT REPOSITORIES</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </TiltCard3D>

        {/* 2. LEETCODE STATS CARD */}
        <TiltCard3D tiltStrength={8} glareOpacity={0.15} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden border border-emerald-500/25 bg-neutral-950/90 backdrop-blur-xl shadow-2xl hover:border-emerald-500/60 transition-all duration-500 group flex flex-col justify-between"
          >
            {/* Diagnostic Header Bar */}
            <div className="flex items-center justify-between p-3.5 px-5 bg-neutral-900/90 border-b border-emerald-500/15">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold">
                <Code className="h-4 w-4" />
                <span>LEETCODE // DIAGNOSTIC</span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setLeetcodeTab("snapshot")}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    leetcodeTab === "snapshot"
                      ? "bg-emerald-500/20 text-emerald-300 font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  SNAPSHOT
                </button>
                <button
                  onClick={() => setLeetcodeTab("metrics")}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                    leetcodeTab === "metrics"
                      ? "bg-emerald-500/20 text-emerald-300 font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  METRICS
                </button>
              </div>
            </div>

            {/* Corner Cyber Brackets */}
            <div className="absolute top-12 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />
            <div className="absolute top-12 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-20" />

            {/* Card Content Area */}
            <div className="relative min-h-[280px] p-4 flex items-center justify-center">
              {leetcodeTab === "snapshot" ? (
                <a
                  href="https://leetcode.com/u/SrajalTiwari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full overflow-hidden rounded-xl border border-neutral-800 group/img"
                >
                  <img
                    src="/Screenshot 2026-08-24 123451.png"
                    alt="LeetCode Stats"
                    className="w-full h-auto object-cover filter brightness-95 group-hover/img:scale-105 group-hover/img:brightness-105 transition-all duration-500"
                  />
                  {/* Subtle laser scanline sweep */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="w-full space-y-4 py-2 font-mono">
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Current Coding Streak</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                      100+ Days Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Core Problem Domains</span>
                    <span className="text-emerald-400 font-semibold">Trees • Graphs • Dynamic Programming</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Languages Used</span>
                    <span className="text-cyan-300">C++ • Python</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Algorithm Proficiency</span>
                    <span className="text-emerald-300 font-bold">Binary Search • Two Pointers • Backtracking</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900 border border-emerald-500/20 text-[11px] text-neutral-300">
                    🧩 Rigorous daily problem solving applying memory-efficient spatial complexity and optimal O(N log N) runtimes.
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-3.5 px-5 bg-neutral-950 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-500">USER: @SrajalTiwari</span>
              <a
                href="https://leetcode.com/u/SrajalTiwari/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <span>VIEW LEETCODE PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </TiltCard3D>
      </div>
    </div>
  )
}
