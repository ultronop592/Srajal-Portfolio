"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ExternalLink,
  Github,
  ShieldCheck,
  Cpu,
  Cloud,
  Zap,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react"

export interface ProjectSpec {
  label: string
  value: string
}

export interface ProjectSlide {
  title: string
  description: string
  details: string
  brief?: string
  tagline?: string
  github: string
  liveDemo: string
  tech: string[];
  category: string
  image: string
  metrics?: string[]
  specs?: ProjectSpec[]
  achievements?: string[]
  pipeline?: string[]
  keyFeatures?: string[]
  architecture?: {
    systemFlow?: string[]
    remediationFlow?: string[]
  }
  aiLayer?: string
  awsServices?: string[]
  security?: string[]
}

interface ProjectDetailModalProps {
  project: ProjectSlide | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const isCloudOps =
    project.title.toLowerCase().includes("cloudops") ||
    project.title.toLowerCase().includes("aws infrastructure")

  const specs = project.specs && project.specs.length > 0 ? project.specs : [
    { label: "STACK", value: project.tech.slice(0, 2).join(" • ") },
    { label: "CATEGORY", value: project.category.toUpperCase() },
    { label: "STATUS", value: project.liveDemo !== "#" ? "DEPLOYED" : "OPEN SOURCE" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-500/30 bg-neutral-950/95 shadow-2xl p-5 sm:p-7 md:p-8 flex flex-col gap-6 text-gray-200 scrollbar-thin select-text"
          >
            {/* Corner Cyber Accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/40 pointer-events-none" />

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-gray-400 hover:text-white border border-gray-800 hover:border-emerald-500/40 transition-colors z-20"
              aria-label="Close Case Study"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="pr-10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  {project.category} // ARCHITECTURE TEARDOWN
                </span>
                {project.metrics && project.metrics[0] && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                    {project.metrics[0]}
                  </span>
                )}
                {isCloudOps && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AWS WELL-ARCHITECTED
                  </span>
                )}
              </div>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {project.title}
              </h2>
              <p className="text-emerald-400/90 text-sm sm:text-base mt-1.5 font-mono">
                {project.description}
              </p>
            </div>

            {/* Visual Prominent Screenshot */}
            <div className="relative group rounded-xl overflow-hidden border border-emerald-500/25 bg-neutral-900/80 shadow-xl">
              <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-900/95 border-b border-gray-800 text-[11px] font-mono text-gray-400 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  <span className="ml-2 text-gray-300 font-semibold">{project.title} Console</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE PREVIEW
                </div>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Architecture Pipelines (System + Remediation) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider text-emerald-400">
                  ■ System Architecture Flow
                </h3>
              </div>

              {/* Primary System Architecture Pipeline */}
              <div className="bg-black/70 border border-emerald-500/20 rounded-xl p-4 font-mono text-xs">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Decoupled Stateless Architecture
                  </span>
                  <span className="text-emerald-400/80 font-bold">README SPEC</span>
                </div>

                {isCloudOps ? (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center">
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-emerald-500/20 rounded-lg text-emerald-300 font-semibold shadow-sm">
                      Next.js + React
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-emerald-500/20 rounded-lg text-emerald-300 font-semibold shadow-sm">
                      FastAPI
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-emerald-500/15 border border-emerald-500/40 rounded-lg text-emerald-300 font-bold shadow-sm">
                      Analysis/Compliance Engines
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-emerald-500/20 rounded-lg text-emerald-300 font-semibold shadow-sm">
                      Boto3
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-emerald-500/20 rounded-lg text-emerald-300 font-semibold shadow-sm">
                      AWS Services
                    </div>
                  </div>
                ) : project.title.toLowerCase().includes("legal") ? (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center text-gray-300">
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">OCR Extraction</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Clause Splitter</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">Gemma-3 LoRA</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Risk Scoring HUD</div>
                  </div>
                ) : project.title.toLowerCase().includes("rag") ? (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center text-gray-300">
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">PDF Chunk Ingestion</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Qdrant Cloud Vectors</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">Agentic Router</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Gemini 2.5 Streaming</div>
                  </div>
                ) : project.title.toLowerCase().includes("forge") ? (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center text-gray-300">
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">User Goal Specification</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">LangGraph Multi-Agent</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">MCP Tool Execution</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">SSE Real-Time Logs</div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center text-gray-300">
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Data Ingestion</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Feature Pipeline</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">Model Inference</div>
                    <ArrowRight className="text-emerald-500 w-3.5 h-3.5 shrink-0 rotate-90 md:rotate-0" />
                    <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Prediction Output</div>
                  </div>
                )}
              </div>

              {/* Remediation Flow Pipeline (for CloudOps AI) */}
              {isCloudOps && (
                <div className="bg-black/70 border border-emerald-500/20 rounded-xl p-4 font-mono text-xs">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Autonomous One-Click Remediation State Machine
                    </span>
                    <span className="text-emerald-400/80 font-bold">AIOPS ENGINE</span>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center">
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-red-500/30 text-red-300 rounded-lg font-semibold">
                      Finding
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-amber-500/30 text-amber-300 rounded-lg font-semibold">
                      Review
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-lg font-bold">
                      Boto3 Remediation
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-emerald-500/30 text-emerald-300 rounded-lg font-semibold">
                      Audit Receipt
                    </div>
                    <ArrowRight className="text-emerald-500 w-4 h-4 shrink-0 rotate-90 md:rotate-0" />
                    <div className="w-full md:w-auto px-3 py-2 bg-neutral-900 border border-blue-500/30 text-blue-300 rounded-lg font-semibold">
                      Dashboard Refresh
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* System Specifications Grid */}
            <div>
              <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2.5 text-emerald-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                ■ System Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {specs.map((spec, i) => (
                  <div key={i} className="p-3 rounded-lg bg-neutral-900/90 border border-gray-800">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">{spec.label}</div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5 truncate">{spec.value}</div>
                  </div>
                ))}
                <div className="p-3 rounded-lg bg-neutral-900/90 border border-gray-800">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">CATEGORY</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{project.category.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div>
              <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                ■ Overview
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans mb-3">
                {project.brief || project.description}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                {project.details}
              </p>
            </div>

            {/* Key Features (7 cards) */}
            <div>
              <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-3 text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ■ Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(project.keyFeatures || [
                  "AWS Infrastructure Intelligence",
                  "26-rule Well-Architected Compliance Engine",
                  "FinOps Cost & Waste Analysis",
                  "Interactive AWS Resource Dependency Graph",
                  "AI Cloud Copilot",
                  "One-Click Boto3 Remediation",
                  "Audit Receipt & Security Controls",
                ]).map((feat, idx) => {
                  const parts = feat.split(":")
                  const title = parts[0]
                  const body = parts[1] || ""
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-900/70 border border-emerald-500/15 hover:border-emerald-500/40 transition-colors flex items-start gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-xs font-mono font-bold text-white">
                          {title}
                        </div>
                        {body && (
                          <div className="text-xs text-gray-400 mt-0.5 leading-relaxed font-sans">
                            {body.trim()}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* AI Layer & Bedrock Intelligence */}
            {isCloudOps && (
              <div>
                <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  ■ AI Layer & Copilot Reasoning
                </h3>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-emerald-500/20 text-xs text-gray-300 font-sans leading-relaxed space-y-2">
                  <p>
                    <strong className="text-emerald-400 font-mono">Amazon Bedrock (Nova Lite) & Groq:</strong> Telemetry alarms and configuration drift are ingested into Bedrock LLM endpoints to synthesize root-cause diagnostics in plain English.
                  </p>
                  <p>
                    <strong className="text-emerald-400 font-mono">Automated Terraform (HCL) Synthesis:</strong> In-context copilot automatically generates production-ready, drop-in Terraform code snippets to permanently codify remediations into version-controlled infrastructure.
                  </p>
                  <p>
                    <strong className="text-emerald-400 font-mono">Conversational Ops Copilot:</strong> Cloud engineers can interrogate infrastructure state in natural language (e.g., <em>"Show idle compute in us-east-1"</em> or <em>"Audit public S3 buckets"</em>) with sub-second response streaming.
                  </p>
                </div>
              </div>
            )}

            {/* AWS Services Monitored */}
            {isCloudOps && (
              <div>
                <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-2">
                  <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                  ■ AWS Services Integrated
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: "Amazon EC2", role: "Compute state & security groups" },
                    { name: "Amazon S3", role: "Bucket policies & public ACL checks" },
                    { name: "Amazon RDS", role: "Multi-AZ database telemetry" },
                    { name: "Amazon EBS", role: "gp2 to gp3 volume optimization" },
                    { name: "AWS Lambda", role: "Serverless execution & error rate" },
                    { name: "AWS CloudWatch", role: "Real-time metrics & alarm triggers" },
                    { name: "AWS Cost Explorer", role: "FinOps spend analysis & treemap" },
                    { name: "Security Groups", role: "0.0.0.0/0 ingress lockdown" },
                    { name: "AWS STS & IAM", role: "GetCallerIdentity & ephemeral tokens" },
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-neutral-900/60 border border-gray-800 flex flex-col justify-between"
                    >
                      <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                        {srv.name}
                      </div>
                      <div className="text-[10px] text-gray-400 font-sans mt-0.5">
                        {srv.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security & Governance Controls */}
            {isCloudOps && (
              <div>
                <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  ■ Security & Governance Controls
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    {
                      title: "Zero Credential Persistence",
                      desc: "AWS credentials never touch disk or databases; held solely in ephemeral in-memory session stores with automated expiry.",
                    },
                    {
                      title: "STS Identity Verification",
                      desc: "Real-time authentication validated directly via AWS STS GetCallerIdentity with per-client token isolation.",
                    },
                    {
                      title: "Thread-Safe Audit Receipts",
                      desc: "Every automated remediation generates an immutable UUID audit receipt containing nanosecond execution timestamps, Boto3 signatures, and target resource state.",
                    },
                    {
                      title: "Air-Gapped Simulation Mode",
                      desc: "Safe deterministic demo mode allows evaluating all 26 compliance rules and Boto3 auto-fixes without touching live cloud production resources.",
                    },
                  ].map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-neutral-900/70 border border-emerald-500/15"
                    >
                      <div className="font-mono text-xs font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        {sec.title}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                        {sec.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engineering Highlights / Achievements */}
            <div>
              <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                ■ Key Engineering Highlights
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-sans pl-1">
                {(project.achievements && project.achievements.length > 0
                  ? project.achievements
                  : [
                      "Architected end-to-end production pipeline with robust error boundaries and clean APIs.",
                      "Optimized memory footprint and query response latency for high-throughput inference.",
                      "Deployed with continuous integration, responsive interface, and live operational monitoring.",
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono mt-0.5 shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2.5 text-emerald-400">
                ■ Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-neutral-900 border border-gray-800 text-xs font-mono text-gray-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-800 mt-2">
              {project.liveDemo && project.liveDemo !== "#" && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink size={16} />
                </a>
              )}
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-gray-800 hover:border-emerald-500/40 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95"
                >
                  <Github size={16} />
                  <span>View Source Code</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-400 font-mono text-xs sm:text-sm ml-auto transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
