"use client"
import type React from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Download, Github, Linkedin, Mail, MapPin, Phone, Code, GraduationCap, Briefcase, Twitter, MessageSquare, Sparkles, Layers, ArrowUpRight, ExternalLink, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollToHashClient } from "@/components/portfolio/scroll-to-hash-client"
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar"
import { NeonButton } from "@/components/ui/neon-button"
import { AnimatedFeatureSpotlight } from "@/components/ui/feature-spotlight"
import { CertificatesGrid } from "@/components/ui/certificates-grid"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { SkillsInteractiveSection } from "@/components/ui/skills-interactive-section"
import { CodeIcon, LayersIcon, GearIcon, LightningBoltIcon } from "@radix-ui/react-icons"
import { PinContainer } from "@/components/ui/3d-pin"
import { FallingPattern } from "@/components/ui/falling-pattern"
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail"
import { Timeline } from "@/components/ui/timeline"

const CursorBlob = dynamic(() => import("@/components/cursor-blob").then(m => ({ default: m.CursorBlob })), { ssr: false })
const HeroImageZoom = dynamic(() => import("@/components/ui/image-zoom").then(m => ({ default: m.HeroImageZoom })), { ssr: false })
const SplineSceneBasic = dynamic(() => import("@/components/spline-scene-demo").then(m => ({ default: m.SplineSceneBasic })), { ssr: false })
const NavbarFrosted = dynamic(() => import("@/components/ui/navbar-frosted"), { ssr: false })
const HeroShowcase = dynamic(() => import("@/components/ui/hero-showcase"), { ssr: false })
const PrismaHero = dynamic(() => import("@/components/ui/prisma-hero").then(m => ({ default: m.PrismaHero })), { ssr: false })
const CpuArchitecture = dynamic(() => import("@/components/ui/cpu-architecture").then(m => ({ default: m.CpuArchitecture })), { ssr: false })
const DisplayCards = dynamic(() => import("@/components/ui/display-cards"), { ssr: false })
const HeroScrollDemo = dynamic(() => import("@/components/hero-scroll-demo"), { ssr: false })
const TiltCard3D = dynamic(() => import("@/components/ui/tilt-card-3d").then(m => ({ default: m.TiltCard3D })), { ssr: false })
const NeuralBackground = dynamic(() => import("@/components/ui/neural-background"), { ssr: false })
const ElegantCarousel = dynamic(() => import("@/components/ui/elegant-carousel"), { ssr: false })
const GatewayFlow = dynamic(() => import("@/components/ui/gateway-flow"), { ssr: false })
const McpTerminal = dynamic(() => import("@/components/ui/mcp-terminal"), { ssr: false })
const ThreeDBackground = dynamic(() => import("@/components/ui/three-d-background"), { ssr: false })
const AchievementsSection = dynamic(() => import("@/components/ui/achievements-section"), { ssr: false })

const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"), { ssr: false })
const AnimatedSection = dynamic(() => import("@/components/animated-section"), { ssr: false })
const TypingText = dynamic(() => import("@/components/typing-text"), { ssr: false })

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [profileMode, setProfileMode] = useState<"css" | "canvas" | "webgl">("css")
  const [showLanding, setShowLanding] = useState(true)
  const [active, setActive] = useState<string | null>(null)
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [projectViewMode, setProjectViewMode] = useState<"showcase" | "grid">("showcase")

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
      window.scrollTo(0, 0)
    }
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent successfully!")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleDownloadResume = () => {
    const resumeUrl = "/Srajal_Tiwari_Resume.pdf"
    window.open(resumeUrl, "_blank", "noopener,noreferrer")
  }

  const handleExplore = () => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }, 50)
    }
    setShowLanding(false)
  }

  const skills = {
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

  const allProjects = [
    {
      title: "AgentForge",
      description: "Autonomous Multi-Agent Workforce Orchestrator",
      tagline: "Agentic AI System",
      brief: "Coordinates specialized AI agents through LangGraph to execute complex multi-step tasks with shared state, persistent memory, and automated QA verification loops.",
      details:
        "AgentForge coordinates specialized AI agents through LangGraph to handle complex multi-step tasks with shared state, memory, and QA verification. Built with a FastAPI backend, Next.js frontend, SSE log streaming, and MCP tool integration for extensible agent workflows.",
      github: "https://github.com/ultronop592/Agent-Forge.git",
      liveDemo: "https://agent-forge-tawny.vercel.app/",
      tech: ["LangGraph", "FastAPI", "Next.js 15", "MCP", "SQLite", "Python"],
      category: "ai",
      image: "/AgentForge.png",
      metrics: ["Multi-Agent System", "SSE Log Streaming", "MCP Extensible"],
      specs: [
        { label: "CORE ENGINE", value: "LangGraph Multi-Agent" },
        { label: "STREAMING", value: "Server-Sent Events (SSE)" },
        { label: "TOOLING", value: "Model Context Protocol (MCP)" },
      ],
      achievements: [
        "Architected multi-agent cycle graph with state verification nodes and automated rollback loops.",
        "Integrated Model Context Protocol (MCP) servers to give agents live filesystem and web tool execution.",
        "Delivered sub-100ms real-time log event streaming on Next.js 15 frontend.",
      ],
    },
    {
      title: "UnLegalize",
      description: "Privacy-First Contract Simplifier & Risk Analyzer",
      tagline: "Local SLM & PEFT",
      brief: "Converts complex Indian rental and lease agreements into plain English with per-clause risk scoring using a locally fine-tuned Gemma 3 (270M) model via LoRA.",
      details:
        "UnLegalize is an AI-powered legal clause simplification tool developed during a hackathon, where it secured 2nd place. It focuses on Indian rental and leave-and-license agreements, converting complex legal jargon into clear, actionable English using a fine-tuned small language model (Gemma 3 - 270M) with LoRA. Complete backend built on FastAPI with OCR for PDF/image contract parsing. The system runs 100% locally without external APIs, guaranteeing total privacy and zero inference costs.",
      github: "https://github.com/ultronop592/Con-Tech_Srajal.git",
      liveDemo: "https://con-tech-srajal.vercel.app/",
      tech: ["Gemma 3 270M", "LoRA", "PEFT", "FastAPI", "OCR", "Python"],
      category: "ai",
      image: "/Screenshot 2026-04-27 193253.png",
      metrics: ["Hackathon: 2nd Place", "100% Local Inference", "Zero API Cost"],
      specs: [
        { label: "CORE SLM", value: "Gemma 3 (270M)" },
        { label: "FINE-TUNING", value: "PEFT / LoRA (Local)" },
        { label: "RECOGNITION", value: "2nd Place Hackathon" },
      ],
      achievements: [
        "Won 2nd Place at Hackathon for innovative local edge AI applied to legal tech.",
        "Fine-tuned Gemma 3 270M on custom Indian contract corpus using Parameter-Efficient Fine-Tuning (PEFT/LoRA).",
        "Engineered local OCR and regex clause-splitter executing on consumer hardware with 0 external API calls.",
      ],
    },
    {
      title: "Multi-Source Agentic RAG",
      description: "Enterprise Knowledge Router & Hybrid Retrieval Platform",
      tagline: "Production RAG Platform",
      brief: "Production-grade RAG architecture featuring intelligent agentic query routing across isolated Qdrant vector collections with hybrid dense + BM25 search.",
      details:
        "Full-stack production RAG system with agentic query routing across isolated knowledge collections. Features hybrid dense + BM25 retrieval, parallel execution, real-time streaming, and drag-and-drop PDF ingestion. Built with FastAPI, Next.js, Qdrant Cloud, and Gemini 2.5 Flash for intelligent document interaction.",
      github: "https://github.com/ultronop592/MutliSouce-Agentic-RAG-System.git",
      liveDemo: "https://mutli-souce-agentic-rag-system.vercel.app",
      tech: ["FastAPI", "Next.js", "Qdrant Cloud", "Gemini 2.5", "RAG", "Python"],
      category: "ai",
      image: "/RAG.png",
      metrics: ["Production-Ready", "Hybrid Retrieval", "Real-Time Streaming"],
      specs: [
        { label: "RETRIEVAL", value: "Hybrid Dense + BM25" },
        { label: "VECTOR DB", value: "Qdrant Cloud (Isolated)" },
        { label: "LLM INFERENCE", value: "Gemini 2.5 Flash" },
      ],
      achievements: [
        "Implemented hybrid reciprocal rank fusion (RRF) combining dense embeddings with sparse BM25 keyword matching.",
        "Engineered autonomous agentic query router to dynamically partition user inquiries into isolated Qdrant collections.",
        "Built streaming token delivery pipeline with optimistic UI updates and instant PDF drag-and-drop ingestion.",
      ],
    },
    {
      title: "Cold Email Generator AI",
      description: "Autonomous Cold Outreach Reasoning Pipeline",
      tagline: "GenAI Pipeline",
      brief: "End-to-end GenAI reasoning pipeline that extracts job requirements, performs semantic resume matching via ChromaDB, and drafts hyper-personalized outreach.",
      details:
        "Production-grade Gen AI pipeline that takes a job posting URL and a candidate resume PDF, then generates personalized cold emails with full AI reasoning. The system intelligently analyzes job requirements and candidate qualifications to craft targeted, compelling cold emails. Built with LangChain, Groq LLM API, ChromaDB, and FastAPI for efficient document processing and intelligent email generation.",
      github: "https://github.com/ultronop592/Cold-Email-AI.git",
      liveDemo: "http://cold-email-ai-peach.vercel.app/",
      tech: ["LangChain", "Groq LLM", "ChromaDB", "FastAPI", "Python", "Next.js"],
      category: "ai",
      image: "/Screenshot 2026-03-19 224454.png",
      metrics: ["AI Reasoning Engine", "Resume Vector Match", "Production Grade"],
      specs: [
        { label: "ORCHESTRATOR", value: "LangChain Pipeline" },
        { label: "LLM BACKEND", value: "Groq Llama-3 (Fast)" },
        { label: "EMBEDDINGS", value: "ChromaDB Vector Store" },
      ],
      achievements: [
        "Automated scrapers parsing target job postings and converting candidate PDFs into vector embeddings.",
        "Engineered multi-stage reasoning prompts to match candidate accomplishments to specific job requirements.",
        "Optimized generation latency to under 1.5 seconds using Groq high-speed Llama-3 inference endpoints.",
      ],
    },
    {
      title: "Waterborne Disease Predictor",
      description: "Deep Learning Clinical Prognosis Sequence Model",
      tagline: "Medical Deep Learning",
      brief: "Bidirectional LSTM sequence model analyzing patient pathology reports and longitudinal symptoms for rapid waterborne disease risk forecasting.",
      details:
        "A Bi-LSTM model that analyzes medical reports to predict waterborne diseases, showcasing advanced NLP and sequence modeling skills with calibrated clinical evaluation metrics.",
      github: "https://github.com/ultronop592/WaterBrone-Diease-Prediction.git",
      liveDemo: "https://waterbrone-diease-prediction-byble.streamlit.app/",
      tech: ["Deep Learning", "Bi-LSTM", "NLP", "Streamlit", "Python", "TensorFlow"],
      category: "ai",
      image: "/images/waterborne-disease-predictor.png",
      metrics: ["Bi-LSTM Architecture", "Medical NLP", "Real-Time Prediction"],
      specs: [
        { label: "NEURAL MODEL", value: "Bidirectional LSTM" },
        { label: "FRAMEWORK", value: "TensorFlow / Keras" },
        { label: "FRONTEND", value: "Streamlit Cloud" },
      ],
      achievements: [
        "Constructed deep recurrent sequence architecture capturing bidirectional temporal symptom dependencies.",
        "Trained on comprehensive clinical pathology corpus with cross-validated ROC-AUC optimization.",
        "Deployed interactive web application enabling real-time clinical assessment.",
      ],
    },
    {
      title: "Fake News Classifier",
      description: "Misinformation Detection & Sentiment Classifier",
      tagline: "NLP Sequence Model",
      brief: "Recurrent text classification pipeline using bidirectional recurrent neural networks to detect misinformation in journalistic articles with 95%+ accuracy.",
      details:
        "Built a Fake News Classifier using Bidirectional LSTM for accurate text classification, preprocessed with custom tokenizers, stopword filtering, and embedding matrices.",
      github: "https://github.com/ultronop592/FakeNews-Classifier-using-RNN.git",
      liveDemo: "https://fakenews-classifier-using-rnn-6.onrender.com/",
      tech: ["TensorFlow", "Keras", "Deep Learning", "LSTM", "Python"],
      category: "ai",
      image: "/fake-news-classifier.png",
      metrics: ["95%+ Validation Accuracy", "LSTM Recurrent Core", "Live Webhook"],
      specs: [
        { label: "ARCHITECTURE", value: "Bi-LSTM Recurrent Net" },
        { label: "BENCHMARK", value: "95%+ Validation Accuracy" },
        { label: "ENVIRONMENT", value: "Render Cloud Deployed" },
      ],
      achievements: [
        "Developed custom NLP preprocessing pipeline handling tokenization, lemmatization, and padding.",
        "Trained dense word embeddings to identify linguistic markers of sensationalism and misleading claims.",
        "Packaged model inference inside containerized microservice deployed to Render.",
      ],
    },
    {
      title: "Movie Recommendation Engine",
      description: "Vectorized Content-Based Recommendation System",
      tagline: "Recommendation Engine",
      brief: "Content-based recommendation engine leveraging high-dimensional TF-IDF vectorization and cosine similarity indexing over 10,000+ films.",
      details:
        "End-to-end movie recommender with TF‑IDF and cosine similarity using OMDB API metadata. Provides instant sub-second similarity rankings and interactive poster views.",
      github: "https://github.com/ultronop592/Movie-Recommendation-System.git",
      liveDemo: "https://movierecommendationssystem76.streamlit.app/",
      tech: ["Python", "Streamlit", "Scikit-learn", "NLP", "OMDB API"],
      category: "ai",
      image: "/movie-recommender.png",
      metrics: ["TF-IDF Vector Space", "Cosine Similarity", "10k+ Film Catalog"],
      specs: [
        { label: "VECTORIZER", value: "TF-IDF N-Grams" },
        { label: "METRIC", value: "Cosine Distance Matrix" },
        { label: "CATALOG", value: "10,000+ Titles (OMDB)" },
      ],
      achievements: [
        "Vectorized multi-attribute film metadata (cast, director, genres, synopsis) into sparse feature space.",
        "Constructed in-memory cosine similarity matrix for sub-50ms recommendation lookups.",
        "Integrated dynamic API fetching for real-time poster and trailer metadata display.",
      ],
    },
    {
      title: "Multi-Condition Health Predictor",
      description: "Clinical Diagnostics Classification System",
      tagline: "Clinical Machine Learning",
      brief: "Supervised diagnostic classification platform predicting diabetes onset and cardiovascular disease using calibrated SVM and logistic regression models.",
      details:
        "Built multi-disease prediction system using SVM and Logistic Regression with clean clinical metric scaling and interactive Streamlit UI.",
      github: "https://github.com/ultronop592/ML_PUBLIC_DIEASES_Syste-.git",
      liveDemo: "https://mldieaseswebappbysrajal.streamlit.app/",
      tech: ["Python", "Scikit-learn", "Streamlit", "Pandas"],
      category: "ai",
      image: "/multiple-diseases-prediction.png",
      metrics: ["Multi-Disease Support", "Calibrated SVM", "Real-Time Inference"],
      specs: [
        { label: "ALGORITHMS", value: "Support Vector Machines" },
        { label: "DIAGNOSTICS", value: "Cardio & Diabetes Onset" },
        { label: "EVALUATION", value: "Calibrated Confusion Matrix" },
      ],
      achievements: [
        "Preprocessed high-variance clinical datasets with standard scaling and feature importance pruning.",
        "Implemented multi-model ensemble providing probabilistic risk confidence scores to clinicians.",
        "Shipped responsive Streamlit application designed for zero-install medical screenings.",
      ],
    },
    {
      title: "Esports Strategy Hub",
      description: "Interactive Telemetry & Tactical Strategy Visualizer",
      tagline: "Interactive Web Platform",
      brief: "High-performance telemetry visualization platform for esports teams, rendering real-time strategy heatmaps, positional telemetry, and match analytics.",
      details:
        "Web application for esports team strategy visualization and match preparation, built with React, TypeScript, and modern canvas visualizers.",
      github: "https://github.com/ultronop592/esportsstrategyhub",
      liveDemo: "https://ultronop592.github.io/esportsstrategyhub/",
      tech: ["React", "TypeScript", "Tailwind CSS", "Analytics"],
      category: "web",
      image: "/esports-strategy-hub.png",
      metrics: ["TypeScript SPA", "Interactive Canvas", "Strategy Heatmaps"],
      specs: [
        { label: "UI ENGINE", value: "React & TypeScript" },
        { label: "GRAPHICS", value: "Canvas Heatmap Overlay" },
        { label: "HOSTING", value: "GitHub Pages SPA" },
      ],
      achievements: [
        "Engineered interactive canvas layer mapping player positions and tactical timings.",
        "Built clean component hierarchy in TypeScript with strict typing and fluid UI transitions.",
        "Deployed static single-page application with 100/100 Lighthouse performance score.",
      ],
    },
    {
      title: "Spam Detection Engine",
      description: "High-Precision NLP Email Security Classifier",
      tagline: "NLP Security",
      brief: "Production text classification engine with N-gram TF-IDF vectorization achieving 96.77% accuracy for automated email threat mitigation.",
      details:
        "Logistic regression with TF‑IDF vectorization achieving 96.77% validation accuracy with sub-millisecond per-message classification.",
      github: "https://github.com/ultronop592/Spam-emails-Prediction-web-app.git",
      liveDemo: "https://spamemailpredictionwebappbysrajal.streamlit.app/",
      tech: ["Python", "Scikit-learn", "TF-IDF", "Streamlit"],
      category: "ai",
      image: "/spam-email-detection.png",
      metrics: ["96.77% Accuracy", "Sub-Millisecond Inference", "N-Gram Parsing"],
      specs: [
        { label: "ACCURACY", value: "96.77% Cross-Validated" },
        { label: "CLASSIFIER", value: "Logistic Regression" },
        { label: "PIPELINE", value: "N-Gram TF-IDF Vectorizer" },
      ],
      achievements: [
        "Benchmarked Naive Bayes, Random Forest, and Logistic Regression; achieved 96.77% top accuracy.",
        "Engineered token sanitization stripping malicious obfuscation and tracking tokens.",
        "Deployed lightweight inference server processing hundreds of emails per second.",
      ],
    },
    {
      title: "Loan Approval Predictor",
      description: "Automated Credit Risk Scoring & Underwriting AI",
      tagline: "Financial Machine Learning",
      brief: "Credit underwriting classification model utilizing automated outlier detection, MinMax feature scaling, and support vector machines.",
      details:
        "Implemented data preprocessing and feature scaling for loan approval predictions, handling class imbalance and categorical demographic variables.",
      github: "https://github.com/ultronop592/Loan-Approval-Predictioon-System.git",
      liveDemo: "https://loanapprovalpredictivesystembysrajal.streamlit.app/",
      tech: ["Python", "Pandas", "Scikit-learn", "SVM"],
      category: "ai",
      image: "/loan-approval-prediction.png",
      metrics: ["SVM Classifier", "Outlier Imputation", "Automated Underwriting"],
      specs: [
        { label: "CORE MODEL", value: "Support Vector Machine" },
        { label: "SCALING", value: "MinMax & One-Hot Encoding" },
        { label: "ACCURACY", value: "78% Out-of-Sample Benchmark" },
      ],
      achievements: [
        "Handled missing values and skewness across multi-dimensional applicant financial records.",
        "Tuned SVM hyperplanes with radial basis function (RBF) kernel for non-linear decision boundary.",
        "Built interactive form interface demonstrating immediate approval probability calculations.",
      ],
    },
  ]

  // Filter projects based on activeTags (categories or tech keywords)
  const projects = activeTags.length > 0
    ? allProjects.filter(p => p.tech.some(t => activeTags.includes(t)) || activeTags.includes(p.category))
    : allProjects

  const filterOptions = ["ai", "web", "FastAPI", "Next.js", "Python", "Deep Learning", "Gemma 3 270M", "RAG", "LangChain"]

  const certifications = [
    {
      name: "AI Fluency: AI Capabilities & Limitations",
      issuer: "Anthropic",
      date: "May 19 2026",
      link: "https://verify.skilljar.com/c/gutkha2in57t",
      level: "Intermediate",
    },
    {
      name: "Model Context Protocol: Advanced Topics",
      issuer: "Anthropic",
      date: "March 4 2026",
      link: "https://verify.skilljar.com/c/676s2waduew6",
      level: "Advanced",
    },
    {
      name: "Introduction To Model Context Protocol",
      issuer: "Anthropic",
      date: "March 4 2026",
      link: "https://verify.skilljar.com/c/38cewzq2oxx9",
      level: "Beginner",
    },
    {
      name: "Claude 101",
      issuer: "Anthropic Academy",
      date: "March 17, 2026",
      link: "https://verify.skilljar.com/c/7acndjj3z4hf",
      level: "Advanced",
    },
    {
      name: "Claude with Amazon Bedrock",
      issuer: "Anthropic",
      date: "June 9, 2026",
      link: "https://verify.skilljar.com/c/hfsptk66qau3",
      level: "Advanced",
    },
    {
      name: "Agentic AI",
      issuer: "AWS Skill Builder",
      date: "Date not listed",
      link: "blob:https://skillbuilder.aws/5088dd93-ca21-4d84-a104-9f20eda473f5",
      level: "Intermediate",
    },
    {
      name: "AWS IAM User",
      issuer: "AWS Skill Builder",
      date: "Date not listed",
      link: "blob:https://skillbuilder.aws/914d0044-34f2-4613-b350-6f2a7d6d9fe4",
      level: "Beginner",
    },
    {
      name: "Introduction to generative AI concepts",
      issuer: "Microsoft",
      date: "July 8, 2025",
      link: "https://learn.microsoft.com/api/achievements/share/en-us/Megatronop-1266/E5AFMQKP?sharingId=702D0E153711BFB4",
      level: "Beginner",
    },
    {
      name: "AI Engineer Certification",
      issuer: "One Roadmap",
      date: "May 29, 2025",
      link: "https://oneroadmap.io/skills/ai/certificate/CERT-3F16AC9E",
      level: "Advanced",
    },
    {
      name: "Introduction to Machine Learning",
      issuer: "Microsoft",
      date: "May 5, 2025",
      link: "https://learn.microsoft.com/api/achievements/share/en-us/Megatronop-1266/JU8CZFWT?sharingId=702D0E153711BFB4",
      level: "Intermediate",
    },
    {
      name: "AI for Beginners",
      issuer: "Hp Life",
      date: "July, 2025",
      link: "https://www.life-global.org/certificate/415697e9-b0e1-4145-bf49-59e92ebb93b3",
      level: "Beginner",
    },
    {
      name: "Data Science and Analytics",
      issuer: "Hp Life",
      date: "July 2025",
      link: "https://www.life-global.org/certificate/d5df5eaa-4ff7-4d01-b379-02b242676a2d",
      level: "Intermediate",
    },
    {
      name: "Python Certification",
      issuer: "One Roadmap",
      date: "May 21, 2025",
      link: "https://oneroadmap.io/skills/python/certificate/CERT-5F6E870D",
      level: "Expert",
    },
    {
      name: "SQL Certification",
      issuer: "One Roadmap",
      date: "May 21, 2025",
      link: "https://oneroadmap.io/skills/sql/certificate/CERT-8D939C0E",
      level: "Advanced",
    },
    {
      name: "Cyber Security Protocol",
      issuer: "Deloitte (Forage)",
      date: "July 7, 2025",
      link: "https://lnkd.in/g5iQCfJ6",
      level: "Professional",
    },
    {
      name: "Data Analytics Matrix",
      issuer: "Deloitte (Forage)",
      date: "July 7, 2025",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Deloitte/YPWCiGNTkr6QxcpEu_Deloitte_completion_certificate.pdf",
      level: "Professional",
    },
    {
      name: "Introduction To Agent Skills",
      issuer: "Anthropic",
      date: "March 5 2026",
      link: "https://verify.skilljar.com/c/bfu2bargdtsr",
      level: "Intermediate",
    },
  ]

  const aboutMeCards = [
    {
      icon: <GraduationCap className="size-4 text-emerald-400" />,
      title: "Education",
      description: "4th Year B.Tech CSE (AI) · CGPA: 8.4",
      date: "2023 - 2027",
      iconClassName: "bg-emerald-950/60 border border-emerald-500/30",
      titleClassName: "text-emerald-300 font-mono",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-2xl before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60 grayscale-[70%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-emerald-400" />,
      title: "Recognition",
      description: "Ex Amazon ML School 2026",
      date: "Selected ML Scholar",
      iconClassName: "bg-emerald-950/60 border border-emerald-500/30",
      titleClassName: "text-emerald-300 font-mono",
      className:
        "[grid-area:stack] translate-x-10 translate-y-8 hover:-translate-y-4 before:absolute before:w-[100%] before:rounded-2xl before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-black/60 grayscale-[70%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Briefcase className="size-4 text-emerald-400" />,
      title: "Status",
      description: "Seeking AI / ML Roles",
      date: "Actively Interviewing",
      iconClassName: "bg-emerald-950/60 border border-emerald-500/30",
      titleClassName: "text-emerald-300 font-mono",
      className: "[grid-area:stack] translate-x-20 translate-y-16 hover:translate-y-6",
    },
  ]

  const skillFeatures = [
    {
      Icon: CodeIcon,
      name: "Languages",
      tagline: "CORE SYNTAX & RUNTIMES",
      description: skills.languages.join(" • "),
      href: "#skills",
      cta: "Core Languages",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: LayersIcon,
      name: "Frameworks & Libraries",
      tagline: "AI / LLM & FULLSTACK",
      description: skills.frameworks.join(" • "),
      href: "#skills",
      cta: "Tech Stack",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: LightningBoltIcon,
      name: "Concepts & Domains",
      tagline: "ALGORITHMS & PARADIGMS",
      description: skills.concepts.join(" • "),
      href: "#skills",
      cta: "Expertise Areas",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-span-1 lg:row-span-1",
    },
    {
      Icon: GearIcon,
      name: "Tools & Platforms",
      tagline: "DEV & AUTOMATION PIPELINES",
      description: skills.tools.join(" • "),
      href: "#skills",
      cta: "Development Tools",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-span-1 lg:row-span-1",
    },
  ]

  const focusRailItems: FocusRailItem[] = projects.map((project, index) => ({
    id: index,
    title: project.title,
    description: project.description,
    meta: project.tech.slice(0, 2).join(" • "),
    imageSrc: project.image,
    href: project.liveDemo,
    github: project.github,
    tech: project.tech,
  }))

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      {showLanding && <SplineSceneBasic isLanding={true} onExplore={handleExplore} />}

      {!showLanding && <CursorBlob />}

      {!showLanding && (
        <>
          <ScrollToHashClient />
          <ThreeDBackground />

          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <GatewayFlow
              className="w-full h-full"
              speed={1}
              density={1}
              size={1}
              opacity={0.85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"></div>
          </div>

          <div className="fixed top-0 left-0 right-0 z-50">
            <NavbarFrosted />
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-[84px] right-6 z-50 group">
            <a href="#agent-sandbox">
              <NeonButton
                variant="ghost"
                size="lg"
                className="font-semibold shadow-lg !border-emerald-500/40 !bg-emerald-500/10 hover:!bg-emerald-500/20 !text-emerald-400"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI Agent
              </NeonButton>
            </a>
          </div>

          <div className="fixed bottom-6 right-6 z-50 group">
            <NeonButton
              onClick={handleDownloadResume}
              variant="ghost"
              size="lg"
              className="font-semibold shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </NeonButton>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-emerald-500/15 border border-gray-500/40 rounded text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Last Updated: August 2026
            </div>
          </div>

          <main className="relative z-10 pt-20" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
            {/* Hero: self-contained full-screen section */}
            <PrismaHero
              title="Srajal Tiwari"
              showAsterisk={true}
              subtitle="4th-year B.Tech Computer Science & AI student at BBDU (CGPA 8.4). Ex-Amazon ML Summer School 2026 scholar & Kalpathon 2.0 Hackathon 2nd place winner. Specializing in autonomous multi-agent systems (LangGraph, MCP), SLM fine-tuning (PEFT/LoRA), and enterprise hybrid RAG. Actively seeking full-time AI/ML engineering roles."
              ctaText="Explore Projects"
              ctaHref="#projects"
              onDownloadResume={handleDownloadResume}
              showNav={false}
            />


            <section id="about-me" className="py-16 px-4">
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    About Me
                  </span>
                </motion.h2>

                <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
                  {/* DisplayCards on the left */}
                  <div className="flex-1 flex justify-center">
                    <DisplayCards cards={aboutMeCards} />
                  </div>

                  {/* Info Card on the right */}
                  <TiltCard3D tiltStrength={8} glareOpacity={0.1} className="flex-1 w-full">
                    <Card className="relative bg-neutral-950/85 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl transition-all duration-500 shadow-2xl overflow-hidden group">
                      {/* Corner brackets */}
                      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "Syne, sans-serif" }}>
                                <span className="pulsing-prompt text-emerald-400">▸</span>
                                Profile
                              </h3>
                              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                SYS_VERIFIED
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              4th-year B.Tech student in Computer Science & Engineering (Artificial Intelligence) at Babu Banarasi Das University, Lucknow (CGPA: 8.4/10). Ex-participant at Amazon ML Summer School 2026 (selected among top applicants across India, mentored by Amazon Scientists in Deep Learning, Generative AI, and Reinforcement Learning), and 2nd Place Winner at Kalpathon 2.0 Hackathon. Passionate about architecting production agentic workflows (LangGraph, MCP), fine-tuning local SLMs (LoRA/PEFT), and enterprise multi-source RAG systems. Actively seeking full-time AI/ML engineering roles.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "Syne, sans-serif" }}>
                              <span className="pulsing-prompt text-emerald-400">▸</span>
                              Education
                            </h3>
                            <div className="space-y-3">
                              <div className="border-l-2 border-emerald-500/40 pl-4 hover:border-emerald-400 transition-colors bg-emerald-500/5 p-3 rounded-r-xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                                  <span className="text-white font-semibold text-sm">B.Tech in Computer Science & Engineering (AI)</span>
                                </div>
                                <p className="text-gray-400 text-xs font-mono">Babu Banarasi Das University, Lucknow · 4th Year Student</p>
                                <div className="flex items-center gap-4 mt-2 text-xs">
                                  <span className="text-gray-400 font-mono">Expected: 2027</span>
                                  <span className="text-emerald-400 font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">CGPA: 8.4 / 10</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "Syne, sans-serif" }}>
                              <span className="pulsing-prompt text-emerald-400">▸</span>
                              Contact
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              <a href="mailto:srajaltiwari902@gmail.com" className="flex items-center p-2.5 rounded-xl border border-emerald-500/15 bg-neutral-900/60 hover:border-emerald-500/40 hover:bg-neutral-900/90 transition-all group/item">
                                <Mail className="h-4 w-4 mr-3 text-emerald-400 group-hover/item:scale-110 transition-transform" />
                                <div className="overflow-hidden">
                                  <div className="text-gray-400 text-[10px] font-mono">EMAIL</div>
                                  <span className="text-xs text-neutral-200 truncate block font-mono">srajaltiwari902@gmail.com</span>
                                </div>
                              </a>

                              <a href="tel:+919919084211" className="flex items-center p-2.5 rounded-xl border border-emerald-500/15 bg-neutral-900/60 hover:border-emerald-500/40 hover:bg-neutral-900/90 transition-all group/item">
                                <Phone className="h-4 w-4 mr-3 text-emerald-400 group-hover/item:scale-110 transition-transform" />
                                <div>
                                  <div className="text-gray-400 text-[10px] font-mono">PHONE</div>
                                  <span className="text-xs text-neutral-200 font-mono">+91 9919084211</span>
                                </div>
                              </a>

                              <div className="flex items-center p-2.5 rounded-xl border border-emerald-500/15 bg-neutral-900/60 sm:col-span-2">
                                <MapPin className="h-4 w-4 mr-3 text-emerald-400" />
                                <div>
                                  <div className="text-gray-400 text-[10px] font-mono">LOCATION</div>
                                  <span className="text-xs text-neutral-200 font-mono">Lucknow, India</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard3D>
                </div>
              </div>
            </section>

            <AnimatedSection id="agent-sandbox" className="py-20 px-4 bg-black/30 border-y border-gray-900" delay={0.12}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Agentic AI Sandbox (MCP)
                  </span>
                </motion.h2>
                <McpTerminal />
              </div>
            </AnimatedSection>

            <AnimatedSection id="stats" className="py-20 px-4" delay={0.08}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Coding Stats
                  </span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* GitHub Stats */}
                  <TiltCard3D tiltStrength={10} glareOpacity={0.12} className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-neutral-950/85 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-500 cursor-pointer group shadow-2xl"
                    >
                      {/* Diagnostic Header Bar */}
                      <div className="flex items-center justify-between p-3.5 px-5 bg-neutral-900/90 border-b border-emerald-500/15">
                        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold">
                          <Github className="h-4 w-4" />
                          <span>GITHUB // STATS</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400/60 uppercase">
                          LIVE METRICS ↗
                        </span>
                      </div>

                      {/* Corner Brackets */}
                      <div className="absolute top-12 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute top-12 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

                      <a href="https://github.com/ultronop592" target="_blank" rel="noopener noreferrer" className="block relative">
                        <img
                          src="/Screenshot 2026-08-24 123542.png"
                          alt="GitHub Stats"
                          className="w-full h-auto object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-[1.02] transition-all duration-500"
                        />
                      </a>
                    </motion.div>
                  </TiltCard3D>

                  {/* LeetCode Stats */}
                  <TiltCard3D tiltStrength={10} glareOpacity={0.12} className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-neutral-950/85 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-500 cursor-pointer group shadow-2xl"
                    >
                      {/* Diagnostic Header Bar */}
                      <div className="flex items-center justify-between p-3.5 px-5 bg-neutral-900/90 border-b border-emerald-500/15">
                        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold">
                          <Code className="h-4 w-4" />
                          <span>LEETCODE // DIAGNOSTIC</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400/60 uppercase">
                          PROFILE STATS ↗
                        </span>
                      </div>

                      {/* Corner Brackets */}
                      <div className="absolute top-12 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute top-12 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

                      <a href="https://leetcode.com/u/SrajalTiwari/" target="_blank" rel="noopener noreferrer" className="block relative">
                        <img
                          src="/Screenshot 2026-08-24 123451.png"
                          alt="LeetCode Stats"
                          className="w-full h-auto object-cover filter brightness-95 group-hover:brightness-105 group-hover:scale-[1.02] transition-all duration-500"
                        />
                      </a>
                    </motion.div>
                  </TiltCard3D>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection id="explore" className="py-0">
              <HeroScrollDemo />
            </AnimatedSection>

            <AnimatedSection id="skills" className="py-20 px-4" delay={0.1}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Skills & Expertise
                  </span>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <SkillsInteractiveSection
                    categories={[
                      {
                        id: "languages",
                        name: "Languages",
                        tagline: "CORE SYNTAX & RUNTIMES",
                        Icon: CodeIcon,
                        description: skills.languages.join(" • "),
                        items: skills.languages,
                        href: "/skills",
                        cta: "Full Matrix",
                      },
                      {
                        id: "frameworks",
                        name: "Frameworks & Libraries",
                        tagline: "AI / LLM & FULLSTACK",
                        Icon: LayersIcon,
                        description: skills.frameworks.join(" • "),
                        items: skills.frameworks,
                        href: "/skills",
                        cta: "Full Matrix",
                      },
                      {
                        id: "concepts",
                        name: "Concepts & Domains",
                        tagline: "ALGORITHMS & PARADIGMS",
                        Icon: LightningBoltIcon,
                        description: skills.concepts.join(" • "),
                        items: skills.concepts,
                        href: "/skills",
                        cta: "Full Matrix",
                      },
                      {
                        id: "tools",
                        name: "Tools & Platforms",
                        tagline: "DEV & AUTOMATION PIPELINES",
                        Icon: GearIcon,
                        description: skills.tools.join(" • "),
                        items: skills.tools,
                        href: "/skills",
                        cta: "Full Matrix",
                      },
                    ]}
                  />
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection id="projects" className="py-20 px-4" delay={0.1}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </motion.h2>

                {/* Filter Buttons */}
                <motion.div
                  className="flex flex-wrap justify-center items-center gap-2.5 mb-12 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    onClick={() => setActiveTags([])}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all duration-300 ${activeTags.length === 0
                        ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-neutral-900 border border-gray-800 text-gray-400 hover:border-emerald-500/30 hover:text-gray-300'
                      }`}
                  >
                    Clear Filters ({allProjects.length})
                  </button>
                  {filterOptions.map((tag) => {
                    const isActive = activeTags.includes(tag)
                    const count = allProjects.filter(p => p.tech.includes(tag) || p.category === tag).length
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          if (isActive) {
                            setActiveTags(prev => prev.filter(t => t !== tag))
                          } else {
                            setActiveTags(prev => [...prev, tag])
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-xs flex items-center gap-1.5 transition-all duration-300 ${isActive
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold'
                            : 'bg-neutral-900 border border-gray-800 text-gray-500 hover:border-emerald-500/30 hover:text-gray-300'
                          }`}
                      >
                        <span>{tag.toUpperCase()}</span>
                        <span className="text-[9px] px-1 bg-black/40 text-gray-500 rounded-full font-bold">{count}</span>
                      </button>
                    )
                  })}
                </motion.div>

                {/* View Mode Switcher: Showcase Slider vs Compact Grid */}
                <div className="flex items-center justify-center gap-2 mb-10">
                  <button
                    onClick={() => setProjectViewMode("showcase")}
                    className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                      projectViewMode === "showcase"
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/10"
                        : "bg-neutral-900/80 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED SHOWCASE</span>
                  </button>
                  <button
                    onClick={() => setProjectViewMode("grid")}
                    className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 transition-all duration-300 ${
                      projectViewMode === "grid"
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/10"
                        : "bg-neutral-900/80 border border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>COMPACT GRID ({projects.length})</span>
                  </button>
                </div>
              </div>

              {projectViewMode === "showcase" ? (
                <ElegantCarousel projects={projects} />
              ) : (
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="group relative flex flex-col justify-between rounded-2xl bg-neutral-950/85 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/50 p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden"
                      >
                        {/* Corner Cyber Brackets */}
                        <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
                        <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

                        {/* Top: Image & Overlay */}
                        <div>
                          <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-neutral-900 border border-gray-800">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover filter brightness-[0.92] group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {project.tagline || project.category.toUpperCase()}
                            </div>

                            {project.metrics && project.metrics[0] && (
                              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                                {project.metrics[0]}
                              </div>
                            )}
                          </div>

                          {/* Title & Tagline */}
                          <div className="mb-2">
                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-sans">
                              {project.title}
                            </h3>
                            <p className="text-xs font-mono text-emerald-400/80 mt-0.5">
                              {project.description}
                            </p>
                          </div>

                          {/* Brief (1-2 sentences, never overflowing) */}
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                            {project.brief || project.details.split(".")[0] + "."}
                          </p>

                          {/* Specs Mini HUD */}
                          {project.specs && project.specs.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {project.specs.slice(0, 2).map((sp, i) => (
                                <div key={i} className="p-2 rounded-lg bg-neutral-900/90 border border-emerald-500/10">
                                  <div className="text-[9px] font-mono uppercase text-gray-400 truncate">{sp.label}</div>
                                  <div className="text-[11px] font-mono font-semibold text-gray-200 truncate">{sp.value}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tech Badges */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.tech.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-neutral-900 border border-gray-800 text-[10px] font-mono text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="px-1.5 py-0.5 rounded bg-neutral-900/60 text-[9px] font-mono text-gray-500">
                                +{project.tech.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-800/80">
                          {project.liveDemo && project.liveDemo !== "#" && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                          {project.github && project.github !== "#" && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-gray-800 text-gray-300 hover:text-white transition-colors"
                              title="Source Code"
                            >
                              <Github size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>


            <AnimatedSection id="certifications" className="py-20 px-4" delay={0.14}>
              <span id="components" className="sr-only pointer-events-none" />
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Certifications
                  </span>
                </motion.h2>
                <CertificatesGrid
                  testimonials={certifications.map((cert, i) => ({
                    tempId: i,
                    testimonial: cert.name,
                    by: cert.issuer + " • " + cert.date,
                    level: cert.level,
                    link: cert.link,
                  }))}
                />
              </div>
            </AnimatedSection>

            <section id="experience" className="py-16 px-4">
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Experience
                  </span>
                </motion.h2>
                <Timeline
                  data={[
                    {
                      title: "2026",
                      content: (
                        <div className="space-y-6">
                          <div className="relative group bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-7 transition-all duration-300 shadow-2xl overflow-hidden">
                            {/* Corner brackets */}
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />
                            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />
                            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />

                            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                              <div>
                                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                                  React Developer Intern
                                </h4>
                                <p className="text-base text-emerald-400 font-mono font-semibold">Om Softwares</p>
                              </div>
                              <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-semibold shadow-sm">
                                6 Months Internship
                              </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-5">
                              Worked as a React Developer Intern at <strong className="text-white font-semibold">Om Softwares</strong> building <strong className="text-white font-semibold">OMCRM</strong> — a comprehensive enterprise CRM platform scheduled for imminent launch. Leveraged Next.js 15, React 19, and TypeScript to architect, design, and implement production-ready UI across all application pages, backed by thorough technical documentation and clean code architecture.
                            </p>

                            <div className="mb-5">
                              <span className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest block mb-2 font-mono">
                                // Technologies & Stack:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {[
                                  "React",
                                  "Next.js 15",
                                  "React 19",
                                  "TypeScript",
                                  "Tailwind CSS",
                                  "Python",
                                  "FastAPI",
                                  "PostgreSQL",
                                  "Redis",
                                  "Celery",
                                  "Docker",
                                  "WebSockets",
                                  "JWT",
                                ].map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all cursor-default"
                                  >
                                    #{tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              <span className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest block mb-1 font-mono">
                                // Key Contributions & Features:
                              </span>
                              <ul className="space-y-2.5 text-gray-300 text-sm">
                                <li className="flex items-start">
                                  <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Production-Ready Next.js UI & Docs:</strong> Designed and developed production-ready UI across all CRM pages using Next.js 15, React 19, TypeScript, and Tailwind CSS, complete with full technical documentation for upcoming commercial launch.
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Pipeline & Lead Management:</strong> Developed core modules for lead management, customer & contact directories, deals tracking, and sales pipeline management.
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Analytics & AI Lead Intelligence:</strong> Created dynamic analytics dashboards and integrated AI Lead Intelligence features to evaluate, score, and surface high-value prospects.
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Backend APIs & Integrations:</strong> Contributed to backend API development using Python and FastAPI, managing PostgreSQL schemas, Google Sheets data synchronization, communication modules, and invoice generation.
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Real-Time & Production Infrastructure:</strong> Implemented secure JWT-based authentication, real-time live data syncing with WebSockets, asynchronous task processing using Redis & Celery, and containerized development using Docker.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="relative group bg-neutral-950/80 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/60 rounded-2xl p-7 transition-all duration-300 shadow-2xl overflow-hidden">
                            {/* Corner brackets */}
                            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-500/30 group-hover:border-amber-400 transition-all duration-300 pointer-events-none" />
                            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-500/30 group-hover:border-amber-400 transition-all duration-300 pointer-events-none" />
                            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-500/30 group-hover:border-amber-400 transition-all duration-300 pointer-events-none" />
                            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-500/30 group-hover:border-amber-400 transition-all duration-300 pointer-events-none" />

                            <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 uppercase tracking-widest">
                                    Educational Program
                                  </span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                                  Amazon ML Summer School 2026
                                </h4>
                                <p className="text-base text-amber-400 font-mono font-semibold">Amazon</p>
                              </div>
                              <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-mono font-semibold">
                                Jul 11 – Aug 2, 2026
                              </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-5">
                              Successfully completed <strong className="text-white font-semibold">Amazon ML Summer School 2026</strong>, a rigorous, invitation-based integrated learning program focused on Machine Learning concepts and applications, with sessions delivered live by <strong className="text-amber-400 font-semibold">Amazon Scientists</strong>. Received a <strong className="text-white font-semibold">Letter of Acknowledgement</strong> from the Amazon ML Summer School Team.
                            </p>

                            <div className="mb-5">
                              <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-widest block mb-2 font-mono">
                                // Curriculum Covered:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {[
                                  "Supervised Learning",
                                  "Deep Neural Networks",
                                  "Dimensionality Reduction",
                                  "Unsupervised Learning",
                                  "Sequential Learning",
                                  "Reinforcement Learning",
                                  "Generative AI & LLMs",
                                  "Agentic AI",
                                  "Causal Inference",
                                ].map((topic) => (
                                  <span
                                    key={topic}
                                    className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/25 text-amber-300 text-xs font-mono font-medium hover:border-amber-500/60 hover:bg-amber-500/10 transition-all cursor-default"
                                  >
                                    #{topic}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2.5">
                              <span className="text-[11px] font-bold text-amber-400/80 uppercase tracking-widest block mb-1 font-mono">
                                // Highlights:
                              </span>
                              <ul className="space-y-2.5 text-gray-300 text-sm">
                                <li className="flex items-start">
                                  <span className="text-amber-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Structured ML Curriculum:</strong> Covered the complete spectrum of modern Machine Learning from classical supervised/unsupervised methods through advanced Deep Neural Networks, Sequential Learning, and Reinforcement Learning.
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-amber-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Advanced AI Topics:</strong> Gained structured exposure to Generative AI, Large Language Models, Agentic AI systems, and Causal Inference — areas directly aligned with the frontier of AI Engineering.
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <span className="text-amber-400 mr-2 font-bold">▸</span>
                                  <span>
                                    <strong className="text-white font-semibold">Amazon Scientists:</strong> Participated in live Q&A and technical sessions with practicing Amazon Scientists, gaining firsthand insights into production ML systems and industry research directions.
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="mt-5 pt-4 border-t border-amber-500/20 flex items-center justify-between flex-wrap gap-3">
                              <span className="text-xs text-gray-400 font-mono">Credential: Letter of Acknowledgement · Issued: 18 August 2026</span>
                              <a
                                href="/Amazon-ML-Summer-School-2026-Acknowledgement.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/40 rounded-xl hover:bg-amber-500/30 hover:border-amber-500/70 transition-all duration-200 shadow-md"
                              >
                                View Acknowledgement ↗
                              </a>
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: "2025",
                      content: (
                        <div className="relative group bg-neutral-950/80 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl p-7 transition-all duration-300 shadow-2xl overflow-hidden">
                          {/* Corner brackets */}
                          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />
                          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />
                          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />
                          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all duration-300 pointer-events-none" />

                          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                            <div>
                              <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                                Artificial Intelligence Intern
                              </h4>
                              <p className="text-base text-emerald-400 font-mono font-semibold">Mirai School of Technology</p>
                            </div>
                            <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-semibold">
                              July – August 2025 · Remote
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm leading-relaxed mb-5">
                            Completed a remote AI internship at Mirai School of Technology, focusing on building real-world AI automation systems using workflow orchestration, LLM integration, and multimodal AI pipelines. Delivered three end-to-end AI projects from design to deployment.
                          </p>

                          <div className="mb-5">
                            <span className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest block mb-2 font-mono">
                              // Technologies & Tools:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {["n8n", "Gemini API", "Google Sheets API", "Telegram Bot API", "LLM Integration", "Workflow Automation"].map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all cursor-default"
                                >
                                  #{tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            <span className="text-[11px] font-bold text-emerald-400/80 uppercase tracking-widest block mb-1 font-mono">
                              // Projects Delivered:
                            </span>
                            <ul className="space-y-2.5 text-gray-300 text-sm">
                              <li className="flex items-start">
                                <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                <span>
                                  <strong className="text-white font-semibold">AI Travel Planner:</strong> Built a fully automated travel itinerary generation system using n8n for workflow orchestration, Gemini LLM for personalized plan generation, and Google Sheets for persistent data storage and automated email delivery.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                <span>
                                  <strong className="text-white font-semibold">Feedback Sentiment Agent:</strong> Engineered an AI-driven business intelligence pipeline that captured customer feedback forms, classified sentiment using the Gemini API as an analytical reasoning agent, and persisted structured results in Google Sheets for business reporting.
                                </span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-emerald-400 mr-2 font-bold">▸</span>
                                <span>
                                  <strong className="text-white font-semibold">Multimodal Telegram Chatbot:</strong> Developed a cross-platform conversational AI chatbot on Telegram using n8n as the backend orchestration layer and Gemini API for conversational intelligence, with support for advanced voice and audio input processing.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </section>

            <AnimatedSection id="achievements" className="py-20 px-4" delay={0.12}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="pulsing-prompt text-emerald-600">▸</span>
                  <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                    Key Achievements
                  </span>
                </motion.h2>
                <motion.p
                  className="text-neutral-400 text-sm sm:text-base text-center max-w-2xl mx-auto mb-12 font-mono"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Validated hackathon podium finishes, industry-led fellowships, algorithmic streaks, and verified credentials.
                </motion.p>
                <AchievementsSection />
              </div>
            </AnimatedSection>

            <section id="contact" className="py-20 px-4">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
                    <span className="pulsing-prompt text-emerald-600">▸</span>
                    <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                      Let's Connect
                    </span>
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    I'm always interested in hearing about new opportunities, projects, and collaborations. Feel free to reach out through any of these channels.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Contact Info Card */}
                  <TiltCard3D tiltStrength={6} glareOpacity={0.06} className="w-full">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 hover:border-emerald-500/50 rounded-2xl p-8 transition-all duration-300 h-full"
                    >
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
                        <span className="pulsing-prompt text-emerald-600">▸</span>
                        Direct Contact
                      </h3>

                      <div className="space-y-4">
                        {[
                          {
                            icon: Mail,
                            label: "Email",
                            href: "mailto:srajaltiwari902@gmail.com",
                            text: "srajaltiwari902@gmail.com",
                            description: "Respond within 24 hours"
                          },
                          {
                            icon: Phone,
                            label: "Phone",
                            href: "tel:+919919084211",
                            text: "+91 9919084211",
                            description: "Available on WhatsApp & Telegram"
                          },
                        ].map((item, i) => (
                          <a
                            key={i}
                            href={item.href}
                            className="group flex items-start p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
                          >
                            <div className="p-3 bg-emerald-500/15 rounded-lg mr-4 group-hover:bg-emerald-500/30 transition-colors">
                              <item.icon className="h-6 w-6 text-emerald-500" />
                            </div>
                            <div>
                              <div className="text-gray-300 text-sm font-medium">{item.label}</div>
                              <div className="text-white text-sm font-semibold mt-1">{item.text}</div>
                              <div className="text-gray-500 text-xs mt-1">{item.description}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </TiltCard3D>

                  {/* Social Links Card */}
                  <TiltCard3D tiltStrength={6} glareOpacity={0.06} className="w-full">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-300 h-full"
                    >
                    <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>

                    <div className="space-y-4">
                      {[
                        {
                          icon: Github,
                          label: "GitHub",
                          href: "https://github.com/ultronop592",
                          handle: "@ultronop592",
                          description: "Open source projects & contributions"
                        },
                        {
                          icon: Linkedin,
                          label: "LinkedIn",
                          href: "https://linkedin.com/in/srajal-tiwari-7229172b9",
                          handle: "Srajal Tiwari",
                          description: "Professional networking & updates"
                        },
                        {
                          icon: Twitter,
                          label: "X (Twitter)",
                          href: "https://x.com/SrajalT54493802",
                          handle: "@SrajalT54493802",
                          description: "Tech insights & industry news"
                        },
                        {
                          icon: Code,
                          label: "Kaggle",
                          href: "https://www.kaggle.com/srajaltiwari76",
                          handle: "srajaltiwari76",
                          description: "Data science & ML competitions"
                        },
                      ].map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
                        >
                          <div className="p-3 bg-emerald-500/15 rounded-lg mr-4 group-hover:bg-emerald-500/30 transition-colors">
                            <item.icon className="h-6 w-6 text-emerald-500" />
                          </div>
                          <div>
                            <div className="text-gray-300 text-sm font-medium">{item.label}</div>
                            <div className="text-white text-sm font-semibold mt-1">{item.handle}</div>
                            <div className="text-gray-500 text-xs mt-1">{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </TiltCard3D>
              </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-16 text-center"
                >
                  <p className="text-gray-400 mb-6">Prefer to discuss directly?</p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    Schedule a Call
                  </a>
                </motion.div>
              </div>
            </section>

            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
          </main>

          <footer className="py-8 px-4 bg-black/80 border-t border-gray-700 relative z-10">
            <div className="container mx-auto">
              <div className="text-center">
                <div className="text-gray-400 mb-2">Srajal Tiwari</div>
                <div className="text-gray-500 text-sm">Built with React.js, Next.js & Tailwind CSS</div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}






