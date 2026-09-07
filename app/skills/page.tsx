"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Code,
  Layers,
  Cpu,
  Wrench,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  FolderGit2,
  Award,
} from "lucide-react"
import { SkillsInteractiveSection } from "@/components/ui/skills-interactive-section"
import { BentoCard } from "@/components/ui/bento-grid"

const SKILLS_DATA = {
  languages: ["Python", "C++", "SQL"],
  frameworks: [
    "Transformers (Hugging Face)",
    "Vision Transformers (ViT)",
    "LangChain",
    "LangGraph",
    "vLLM",
    "FastAPI",
    "PyTorch",
    "TensorFlow/Keras",
    "Scikit-learn",
    "Pandas & NumPy",
    "Next.js 15",
    "React 19",
  ],
  concepts: [
    "AI Agents & Multi-Agent Systems",
    "LLM Evaluation & Benchmarking",
    "LLM Inference & Quantization",
    "Retrieval-Augmented Generation (RAG)",
    "VAE & Autoencoders",
    "Vision Transformers (ViTs)",
    "LoRA Fine-Tuning & PEFT",
    "Model Context Protocol (MCP)",
    "Deep Learning & Generative AI",
    "Semantic & Hybrid Search",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
  ],
  tools: [
    "LangSmith (LLM Eval & Tracing)",
    "vLLM Serving Engine",
    "Hugging Face Hub",
    "Qdrant Cloud",
    "ChromaDB",
    "Pinecone",
    "FAISS",
    "Docker",
    "AWS",
    "Google Cloud Platform",
    "Git & GitHub",
    "Cursor IDE",
    "Vercel",
  ],
}

const CATEGORIES = [
  {
    id: "languages",
    name: "Languages",
    tagline: "CORE SYNTAX & RUNTIMES",
    Icon: Code,
    description: SKILLS_DATA.languages.join(" • "),
    items: SKILLS_DATA.languages,
    href: "/#projects",
    cta: "View Projects",
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    tagline: "AI / LLM & FULLSTACK",
    Icon: Layers,
    description: SKILLS_DATA.frameworks.join(" • "),
    items: SKILLS_DATA.frameworks,
    href: "/#projects",
    cta: "Production Stack",
  },
  {
    id: "concepts",
    name: "Concepts & Paradigms",
    tagline: "ALGORITHMS & PARADIGMS",
    Icon: Cpu,
    description: SKILLS_DATA.concepts.join(" • "),
    items: SKILLS_DATA.concepts,
    href: "/#agent-sandbox",
    cta: "Explore Concepts",
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    tagline: "DEV & AUTOMATION PIPELINES",
    Icon: Wrench,
    description: SKILLS_DATA.tools.join(" • "),
    items: SKILLS_DATA.tools,
    href: "/certificates",
    cta: "View Credentials",
  },
]

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/20 via-neutral-950 to-neutral-950" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/70 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#skills"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400 hover:text-emerald-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/certificates"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-neutral-300 hover:text-emerald-300 bg-neutral-900/60 hover:bg-neutral-800 border border-white/[0.08] transition-colors"
            >
              Certifications →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-12 max-w-6xl space-y-12">
        {/* Page Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY MATRIX</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Skills & Technical Stack
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base font-mono leading-relaxed"
          >
            A curated inventory of programming languages, agentic architectures, deep learning frameworks, and cloud vector databases utilized across production systems.
          </motion.p>
        </div>

        {/* Interactive Skills Grid */}
        <SkillsInteractiveSection categories={CATEGORIES} showViewAllLink={false} />

        {/* Deep Dive Cards: Core Specializations */}
        <div className="pt-8 border-t border-white/[0.06] space-y-6">
          <div className="text-center md:text-left space-y-1">
            <h2
              className="text-2xl font-bold text-white tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Core Architectural Pillars
            </h2>
            <p className="text-xs text-neutral-400 font-mono">
              Key domains where Srajal designs, fine-tunes, and orchestrates systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                Agentic AI & Multi-Agent Workflows
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Specialized in stateful multi-agent systems with LangGraph, Model Context Protocol (MCP) servers, tool use, and automated evaluation loops.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                LLM Fine-Tuning & Serving
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Experience in parameter-efficient fine-tuning (LoRA / PEFT), quantized weight deployment via vLLM, and real-time streaming inference APIs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                High-Performance Full-Stack
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                FastAPI backend architecture with asynchronous event-driven pipelines, Qdrant/Pinecone hybrid vector search, and Next.js 15 client interfaces.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900/60 to-neutral-950 border border-emerald-500/20 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
            Explore Applied Projects & Verification
          </h3>
          <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-xl mx-auto">
            Review live working demonstrations powered by these skills, or examine verified industry credentials from Anthropic, Microsoft, and AWS.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>View Featured Projects</span>
            </Link>
            <Link
              href="/certificates"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-emerald-400 bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/30 transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Inspect Certifications</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
