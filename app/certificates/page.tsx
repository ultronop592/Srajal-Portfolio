"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Award,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  FolderGit2,
} from "lucide-react"
import { CertificatesGrid, type Certificate } from "@/components/ui/certificates-grid"

export const CERTIFICATIONS_DATA: Certificate[] = [
  {
    tempId: 0,
    testimonial: "AI Fluency: AI Capabilities & Limitations",
    by: "Anthropic • May 19 2026",
    level: "Intermediate",
    link: "https://verify.skilljar.com/c/gutkha2in57t",
  },
  {
    tempId: 1,
    testimonial: "Model Context Protocol: Advanced Topics",
    by: "Anthropic • March 4 2026",
    level: "Advanced",
    link: "https://verify.skilljar.com/c/676s2waduew6",
  },
  {
    tempId: 2,
    testimonial: "Introduction To Model Context Protocol",
    by: "Anthropic • March 4 2026",
    level: "Beginner",
    link: "https://verify.skilljar.com/c/38cewzq2oxx9",
  },
  {
    tempId: 3,
    testimonial: "Claude 101",
    by: "Anthropic Academy • March 17, 2026",
    level: "Advanced",
    link: "https://verify.skilljar.com/c/7acndjj3z4hf",
  },
  {
    tempId: 4,
    testimonial: "Claude with Amazon Bedrock",
    by: "Anthropic • June 9, 2026",
    level: "Advanced",
    link: "https://verify.skilljar.com/c/hfsptk66qau3",
  },
  {
    tempId: 5,
    testimonial: "Introduction To Agent Skills",
    by: "Anthropic • March 5 2026",
    level: "Intermediate",
    link: "https://verify.skilljar.com/c/bfu2bargdtsr",
  },
  {
    tempId: 6,
    testimonial: "Agentic AI",
    by: "AWS Skill Builder • 2026",
    level: "Intermediate",
    link: "blob:https://skillbuilder.aws/5088dd93-ca21-4d84-a104-9f20eda473f5",
  },
  {
    tempId: 7,
    testimonial: "AWS IAM User",
    by: "AWS Skill Builder • 2026",
    level: "Beginner",
    link: "blob:https://skillbuilder.aws/914d0044-34f2-4613-b350-6f2a7d6d9fe4",
  },
  {
    tempId: 8,
    testimonial: "Introduction to generative AI concepts",
    by: "Microsoft • July 8, 2025",
    level: "Beginner",
    link: "https://learn.microsoft.com/api/achievements/share/en-us/Megatronop-1266/E5AFMQKP?sharingId=702D0E153711BFB4",
  },
  {
    tempId: 9,
    testimonial: "AI Engineer Certification",
    by: "One Roadmap • May 29, 2025",
    level: "Advanced",
    link: "https://oneroadmap.io/skills/ai/certificate/CERT-3F16AC9E",
  },
  {
    tempId: 10,
    testimonial: "Introduction to Machine Learning",
    by: "Microsoft • May 5, 2025",
    level: "Intermediate",
    link: "https://learn.microsoft.com/api/achievements/share/en-us/Megatronop-1266/JU8CZFWT?sharingId=702D0E153711BFB4",
  },
  {
    tempId: 11,
    testimonial: "AI for Beginners",
    by: "Hp Life • July, 2025",
    level: "Beginner",
    link: "https://www.life-global.org/certificate/415697e9-b0e1-4145-bf49-59e92ebb93b3",
  },
  {
    tempId: 12,
    testimonial: "Data Science and Analytics",
    by: "Hp Life • July 2025",
    level: "Intermediate",
    link: "https://www.life-global.org/certificate/d5df5eaa-4ff7-4d01-b379-02b242676a2d",
  },
  {
    tempId: 13,
    testimonial: "Python Certification",
    by: "One Roadmap • May 21, 2025",
    level: "Expert",
    link: "https://oneroadmap.io/skills/python/certificate/CERT-5F6E870D",
  },
  {
    tempId: 14,
    testimonial: "SQL Certification",
    by: "One Roadmap • May 21, 2025",
    level: "Advanced",
    link: "https://oneroadmap.io/skills/sql/certificate/CERT-8D939C0E",
  },
  {
    tempId: 15,
    testimonial: "Cyber Security Protocol",
    by: "Deloitte (Forage) • July 7, 2025",
    level: "Professional",
    link: "https://lnkd.in/g5iQCfJ6",
  },
  {
    tempId: 16,
    testimonial: "Data Analytics Matrix",
    by: "Deloitte (Forage) • July 7, 2025",
    level: "Professional",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Deloitte/YPWCiGNTkr6QxcpEu_Deloitte_completion_certificate.pdf",
  },
]

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-neutral-950 to-neutral-950" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/70 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#certifications"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/skills"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-neutral-300 hover:text-emerald-300 bg-neutral-900/60 hover:bg-neutral-800 border border-white/[0.08] transition-colors"
            >
              Skills Matrix →
            </Link>
          </div>
        </div>
      </header>

      {/* Page Body */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-12 max-w-6xl space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AUTHENTICATED INDUSTRY ACCREDITATIONS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Verified Certifications & Credentials
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base font-mono leading-relaxed"
          >
            Official accreditations spanning Model Context Protocol, Agentic AI, Cloud Engineering, Deep Learning, and Quantitative Analytics from leading research labs and enterprise technology providers.
          </motion.p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl font-bold text-emerald-400 font-mono">17</span>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Total Credentials
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl font-bold text-amber-400 font-mono">6</span>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Anthropic / MCP
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl font-bold text-sky-400 font-mono">4</span>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Microsoft & AWS
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/[0.06] text-center space-y-1">
            <span className="text-2xl font-bold text-purple-400 font-mono">100%</span>
            <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
              Verifiable Online
            </p>
          </div>
        </div>

        {/* Interactive Certificates Grid with Search and Filter */}
        <CertificatesGrid testimonials={CERTIFICATIONS_DATA} showViewAllLink={false} />

        {/* Verification Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-neutral-900/30 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-mono">
                Direct Verification Links
              </h4>
              <p className="text-xs text-neutral-400 font-mono">
                All certificates include verifiable share IDs hosted directly on Skilljar, Microsoft Learn, AWS Skill Builder, or Forage servers.
              </p>
            </div>
          </div>
          <Link
            href="/skills"
            className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-emerald-400 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/30 transition-colors shrink-0"
          >
            Review Skills Matrix →
          </Link>
        </div>
      </main>
    </div>
  )
}
