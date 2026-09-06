"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Send, RotateCcw, ShieldCheck, Sparkles, User, Briefcase, Mail } from "lucide-react"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

interface MessageLog {
  text: string
  type: "info" | "success" | "warning" | "error" | "input" | "agent" | "tool"
  timestamp: string
}

export default function McpTerminal() {
  const [logs, setLogs] = useState<MessageLog[]>([
    { text: "🤖 Srajal's AI Ambassador Client v2.0.0", type: "success", timestamp: "22:15:00" },
    { text: "Connected via Model Context Protocol (MCP) to Local portfolio-db server.", type: "info", timestamp: "22:15:01" },
    { text: "Ask me anything about Srajal's AI/ML projects, n8n internship, Anthropic certifications, or academic records. I will query local databases in real-time!", type: "info", timestamp: "22:15:02" },
  ])
  const [input, setInput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const logsContainerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Quick Action Prompts
  const suggestionPills = [
    { label: "🔍 What is UnLegalize?", query: "Tell me about the UnLegalize hackathon project" },
    { label: "🏆 List Anthropic Certifications", query: "Show me Srajal's Anthropic MCP and AI certifications" },
    { label: "💼 AI/ML Internship Details", query: "What did Srajal do during his Mirai School of Technology internship?" },
    { label: "📞 How to Contact / Reach", query: "Give me Srajal's contact email, phone, and social links" },
  ]

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
    }
  }, [logs])

  const addLog = (text: string, type: MessageLog["type"] = "info") => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    setLogs((prev) => [...prev, { text, type, timestamp }])
  }

  const handleQuery = async (userQuery: string) => {
    if (isRunning || !userQuery.trim()) return
    setIsRunning(true)

    // Add user question to terminal logs
    addLog(userQuery, "input")
    setInput("")

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    const q = userQuery.toLowerCase()

    // Phase 1: Ingestion
    await delay(350)
    addLog("[agent] Ingested user query. Identifying search parameters...", "agent")

    // Phase 2: Intent Classification
    await delay(450)
    let intent: "projects" | "skills" | "certifications" | "experience" | "education" | "contact" | "hire" | "about" = "about"
    let toolName = "query_about_profile"
    let toolArgs = "{}"

    if (
      q.includes("project") ||
      q.includes("agentforge") ||
      q.includes("agent forge") ||
      q.includes("unlegalize") ||
      q.includes("rag") ||
      q.includes("email") ||
      q.includes("waterborne") ||
      q.includes("fake news") ||
      q.includes("movie") ||
      q.includes("disease") ||
      q.includes("esport") ||
      q.includes("spam") ||
      q.includes("loan") ||
      q.includes("build") ||
      q.includes("code") ||
      q.includes("app")
    ) {
      intent = "projects"
      toolName = "search_projects_db"
      toolArgs = `{"query": "${userQuery.slice(0, 40)}"}`
    } else if (
      q.includes("skill") ||
      q.includes("stack") ||
      q.includes("python") ||
      q.includes("typescript") ||
      q.includes("javascript") ||
      q.includes("c++") ||
      q.includes("sql") ||
      q.includes("langchain") ||
      q.includes("langgraph") ||
      q.includes("fastapi") ||
      q.includes("next") ||
      q.includes("react") ||
      q.includes("pytorch") ||
      q.includes("tensorflow") ||
      q.includes("qdrant") ||
      q.includes("chroma") ||
      q.includes("docker") ||
      q.includes("n8n") ||
      q.includes("tool") ||
      q.includes("framework") ||
      q.includes("language") ||
      q.includes("dsa")
    ) {
      intent = "skills"
      toolName = "get_technical_skills"
      toolArgs = `{"category": "all"}`
    } else if (
      q.includes("cert") ||
      q.includes("kaggle") ||
      q.includes("vibe coding") ||
      q.includes("anthropic") ||
      q.includes("mcp") ||
      q.includes("claude") ||
      q.includes("bedrock") ||
      q.includes("aws") ||
      q.includes("microsoft") ||
      q.includes("one roadmap") ||
      q.includes("deloitte") ||
      q.includes("forage") ||
      q.includes("hp life") ||
      q.includes("credential")
    ) {
      intent = "certifications"
      toolName = "fetch_verified_credentials"
      toolArgs = `{"issuer": "all"}`
    } else if (
      q.includes("intern") ||
      q.includes("experience") ||
      q.includes("job") ||
      q.includes("work") ||
      q.includes("om software") ||
      q.includes("omsoftwares") ||
      q.includes("omcrm") ||
      q.includes("mirai") ||
      q.includes("codec")
    ) {
      intent = "experience"
      toolName = "get_employment_history"
      toolArgs = `{"detailed": true}`
    } else if (
      q.includes("amazon") ||
      q.includes("achievement") ||
      q.includes("award") ||
      q.includes("summer school") ||
      q.includes("kalpathon") ||
      q.includes("streak") ||
      q.includes("hackathon") ||
      q.includes("startup school") ||
      q.includes("hcl") ||
      q.includes("guvi") ||
      q.includes("ninja") ||
      q.includes("gdg") ||
      q.includes("badge")
    ) {
      intent = "achievements"
      toolName = "fetch_achievements_and_credentials"
      toolArgs = `{"category": "achievements_and_credentials"}`
    } else if (
      q.includes("college") ||
      q.includes("university") ||
      q.includes("bbd") ||
      q.includes("study") ||
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("cgpa") ||
      q.includes("grade") ||
      q.includes("year") ||
      q.includes("batch") ||
      q.includes("btech")
    ) {
      intent = "education"
      toolName = "read_academic_record"
      toolArgs = `{"degree": "BTech"}`
    } else if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("mail") ||
      q.includes("phone") ||
      q.includes("call") ||
      q.includes("reach") ||
      q.includes("connect") ||
      q.includes("social") ||
      q.includes("linkedin") ||
      q.includes("github") ||
      q.includes("kaggle") ||
      q.includes("location") ||
      q.includes("address") ||
      q.includes("lucknow")
    ) {
      intent = "contact"
      toolName = "get_contact_anchors"
      toolArgs = `{"channel": "all"}`
    } else if (
      q.includes("hire") ||
      q.includes("why") ||
      q.includes("recru") ||
      q.includes("position") ||
      q.includes("open") ||
      q.includes("opportunity") ||
      q.includes("fit") ||
      q.includes("candidate")
    ) {
      intent = "hire"
      toolName = "evaluate_candidate_fit"
      toolArgs = `{"role": "AI_ML_Engineer"}`
    }

    addLog(`[agent] Intent classified: [${intent.toUpperCase()}]. Active MCP tools registered.`, "agent")

    // Phase 3: MCP Handshake
    await delay(500)
    addLog(`[mcp] JSON-RPC Call -> tools/call {'name': '${toolName}', 'arguments': ${toolArgs}}`, "info")

    // Phase 4: Tool Execution Result
    await delay(700)
    let toolResultText = ""
    if (intent === "projects") {
      toolResultText = "Retrieved 11 project nodes from vector index: [1. AgentForge (Multi-Agent WorkForce), 2. UnLegalize (Hackathon 2nd Place), 3. Multi Source Agentic RAG System, 4. Cold Email Generator AI, 5. Waterborne Disease Predictor, 6. Fake News Classifier, 7. Movie Recommender, 8. Disease Predictor, 9. Esports Strategy Hub, 10. Spam Email Detector, 11. Loan Approval Predictor]."
    } else if (intent === "skills") {
      toolResultText = "Retrieved technical skills matrix: Languages: Python, C++, SQL | Frameworks: Transformers (Hugging Face), Vision Transformers (ViT), vLLM, LangChain, LangGraph, FastAPI, PyTorch, TensorFlow/Keras, Scikit-learn, Next.js 15 | Concepts: AI Agents & Multi-Agent Systems, LLM Evaluation (LangSmith), LLM Inference & Quantization, VAE & Autoencoders, RAG, MCP, LoRA/PEFT | Tools & Vectors: LangSmith, vLLM, Qdrant Cloud, ChromaDB, Pinecone, FAISS, Docker, AWS, GCP."
    } else if (intent === "certifications") {
      toolResultText = "Retrieved 17 verified credentials: [Kaggle × Google 5-Day AI Agents (July 2026), Anthropic AI Fluency (May 2026), Anthropic Advanced MCP (March 2026), Claude 101, Claude with Bedrock, AWS Agentic AI, Microsoft GenAI, One Roadmap AI Engineer & Python/SQL, Deloitte Cyber & Analytics]."
    } else if (intent === "experience") {
      toolResultText = "Retrieved employment records: [1. React Developer Intern @ Om Softwares (6 Months 2026, Flagship OMCRM Next.js 15 production UI & docs, FastAPI, PostgreSQL, WebSockets, Docker), 2. AI Intern @ Mirai School of Technology (July-August 2025, n8n + Gemini AI Travel Planner, Sentiment BI Agent, Multimodal Telegram Chatbot)]."
    } else if (intent === "achievements") {
      toolResultText = "Retrieved major achievements: [1. Kaggle × Google 5-Day AI Agents Course (July 2026), 2. Amazon ML Summer School 2026 (Letter of Acknowledgement by Amazon Scientists), 3. 2nd Place Kalpathon 2.0 Hackathon (UnLegalize), 4. 100+ Days LeetCode Streak, 5. Google Startup School: Prompt to Prototype, 6. HCL GUVI AI Impact Summit 2026]."
    } else if (intent === "education") {
      toolResultText = "Retrieved academic sheet: [Babu Banarasi Das University, Lucknow. Degree: B.Tech CSE (Artificial Intelligence). Status: 4th-Year Student (2023 - 2027). Academic Metric: CGPA 8.4/10]."
    } else if (intent === "contact") {
      toolResultText = "Retrieved active channels: [Email: srajaltiwari902@gmail.com, Phone: +91 9919084211, Location: Lucknow, India, Socials: LinkedIn, GitHub, Kaggle]."
    } else if (intent === "hire") {
      toolResultText = "Retrieved candidate evaluation metrics: 4th-year BTech CSE (AI) student at BBDU (CGPA 8.4), Ex Amazon ML Summer School 2026 scholar, 2nd Place Kalpathon 2.0 Hackathon Winner, Anthropic MCP expert, 11+ deployed AI projects. Actively seeking AI/ML engineering roles."
    } else {
      toolResultText = "Retrieved full candidate profile: Srajal Tiwari — 4th-year B.Tech AI Student at BBD University (CGPA 8.4), Ex Amazon ML Summer School 2026 scholar, Agentic AI & Generative AI Engineer actively seeking full-time roles."
    }
    addLog(`[tool-response] Success. ${toolResultText}`, "success")

    // Phase 5: Synthesis
    await delay(600)
    addLog("[agent] Synthesizing intelligent profile response. Typewriter output loading...", "agent")

    // Phase 6: Final Typewriter Response
    await delay(800)
    let finalAnswer = ""
    if (intent === "projects") {
      finalAnswer = `🤖 AGENT RESPONSE: Here are Srajal's featured AI/ML & Full-Stack software projects:

1. 🛠️ **AgentForge (2026)**
   * **Overview**: Multi-agent workforce platform coordinating specialized AI agents via LangGraph for task planning, research, execution, and QA verification.
   * **Tech**: LangGraph, FastAPI, Next.js, MCP, SQLite, Python, SSE Streaming.
   * **Links**: [GitHub](https://github.com/ultronop592/Agent-Forge.git) | [Live Demo](https://agent-forge-tawny.vercel.app/)

2. ⚖️ **UnLegalize (Hackathon 2nd Place - April 2026)**
   * **Overview**: AI-powered legal clause simplifier for Indian rental agreements using locally fine-tuned Gemma 3 (270M) via LoRA/PEFT, OCR document parsing, and FastAPI backend.
   * **Tech**: Gemma 3 270M, LoRA, PEFT, FastAPI, OCR, Python.
   * **Links**: [GitHub](https://github.com/ultronop592/Con-Tech_Srajal.git) | [Live Demo](https://con-tech-srajal.vercel.app/)

3. 🧠 **Multi Source Agentic RAG System (2026)**
   * **Overview**: Production RAG platform with dynamic query routing, hybrid (dense + BM25) retrieval, real-time streaming, and PDF drag-and-drop ingestion.
   * **Tech**: Qdrant Cloud, Gemini 2.5 Flash, FastAPI, Next.js.
   * **Links**: [GitHub](https://github.com/ultronop592/MutliSouce-Agentic-RAG-System.git) | [Live Demo](https://mutli-souce-agentic-rag-system.vercel.app)

4. ✉️ **Cold Email Generator AI (2026)**
   * **Overview**: Production GenAI pipeline reading candidate resumes and job post URLs to generate personalized emails with complete AI reasoning.
   * **Tech**: LangChain, Groq LLM, ChromaDB, FastAPI.
   * **Links**: [GitHub](https://github.com/ultronop592/Cold-Email-AI.git) | [Live Demo](http://cold-email-ai-peach.vercel.app/)

Other deployed projects include Waterborne Disease Predictor (Bi-LSTM), Fake News Classifier (Bi-LSTM), Movie Recommender (TF-IDF), Spam Email Detector (96.77% accuracy), and Loan Approval Predictor!`
    } else if (intent === "skills") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal possesses a comprehensive AI/ML and full-stack engineering stack:

* 💻 **Languages**: Python, TypeScript, JavaScript, C/C++, SQL
* 🤖 **AI/ML & Agentic Frameworks**: LangChain, LangGraph, PyTorch, TensorFlow/Keras, Scikit-learn, Pandas, NumPy
* ⚡ **GenAI & Vector Search**: Qdrant Cloud, ChromaDB, Hugging Face Hub, PEFT/LoRA (Fine-Tuning), Gemini API, Groq LLM
* 🌐 **Full-Stack & Systems**: React 19, Next.js 15, FastAPI, PostgreSQL, Redis, Celery, WebSockets, Docker
* 🛠️ **Workflow & Dev Tools**: n8n Workflow Automation, Git & GitHub, Cursor IDE, Google Colab`
    } else if (intent === "certifications") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal holds 17 verified industry credentials:

* 🤖 **5-Day AI Agents: Intensive Vibe Coding Course** – *Kaggle × Google (July 30, 2026)*: Intensive training on AI Agents, agentic workflows, and AI-assisted development.
* 🌟 **Amazon ML Summer School 2026 (Letter of Acknowledgement)** – Selective program with sessions by Amazon Scientists covering Supervised/Unsupervised Learning, DNNs, LLMs, Agentic AI, RL, and Causal Inference.
* 🛡️ **Model Context Protocol: Advanced Topics** – *Anthropic (March 2026)*
* 🧠 **AI Fluency: Capabilities & Limitations** – *Anthropic (May 2026)*
* 📘 **Claude 101 & Claude with Amazon Bedrock** – *Anthropic Academy*
* ⚙️ **Agentic AI & AWS IAM** – *AWS Skill Builder*
* 📜 **AI Engineer, Python & SQL Certifications** – *One Roadmap*
* 🚀 **Startup School: Prompt to Prototype** – *Google for Startups x Scaler*
* 📊 **Cyber Security & Data Analytics** – *Deloitte (Forage)*`
    } else if (intent === "experience") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal has solid industry internship experience:

1. 💼 **React Developer Intern @ Om Softwares** (6 Months, 2026)
   * **Product & UI Architecture**: Designed and built production-ready user interfaces across all pages of the flagship **OMCRM** enterprise platform for upcoming launch using Next.js 15, React 19, TypeScript, and Tailwind CSS along with technical documentation.
   * **Backend & Infrastructure**: Built FastAPI backend endpoints, managed PostgreSQL schemas, WebSockets live syncing, Redis/Celery queue processing, and Docker containers.

2. 🤖 **Artificial Intelligence Intern @ Mirai School of Technology** (July – August 2025)
   * **AI Travel Planner**: Built automated travel itinerary system with n8n workflow orchestration, Gemini LLM, and Google Sheets storage.
   * **Feedback Sentiment Agent**: Engineered BI sentiment analysis pipeline classifying café customer feedback into Google Sheets.
   * **Multimodal Chatbot**: Programmed a conversational Telegram AI bot with voice input processing using Gemini API & n8n.`
    } else if (intent === "achievements") {
      finalAnswer = `🤖 AGENT RESPONSE: Here are Srajal's major recognized achievements:

1. 🌟 **Amazon ML Summer School 2026**: Earned official Letter of Acknowledgement after completing Amazon's selective integrated ML program led by Amazon Scientists.
2. 🤖 **Kaggle × Google 5-Day AI Agents Course**: Certified in building advanced AI agents and agentic workflows (July 2026).
3. 🥈 **Hackathon 2nd Place Winner (KALPATHON 2.0)**: Won 2nd place building *UnLegalize*, an AI legal clause simplification app with fine-tuned Gemma 3 (270M) and OCR parsing.
4. 🔥 **100+ Days LeetCode Coding Streak**: Maintained 100+ consecutive days of algorithmic problem solving on LeetCode.
5. 🚀 **Google Startup School Alum**: Completed 2-week programme by Google for Startups x Scaler on AI product deployment.
6. 🏛️ **HCL GUVI AI Impact Summit 2026**: Participated in Mission Upskill India pre-summit event by Ministry of Electronics & IT / Digital India / INDIAai.`
    } else if (intent === "education") {
      finalAnswer = `🤖 AGENT RESPONSE: Here is Srajal's academic profile:

* **Degree**: B.Tech in Computer Science and Engineering (Specialization in Artificial Intelligence)
* **Institution**: Babu Banarasi Das University (BBDU), Lucknow, India
* **Year & Batch**: 4th-Year Student (Batch 2023 - 2027)
* **CGPA**: **8.4 / 10**
* **Core Academic Subjects**: Machine Learning, Deep Learning, Generative AI, Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS).`
    } else if (intent === "contact") {
      finalAnswer = `🤖 AGENT RESPONSE: Here are Srajal's direct contact channels:

* 📧 **Email**: [srajaltiwari902@gmail.com](mailto:srajaltiwari902@gmail.com)
* 📞 **Phone**: [+91 9919084211](tel:+919919084211)
* 📍 **Location**: Lucknow, Uttar Pradesh, India
* 💼 **LinkedIn**: [linkedin.com/in/srajal-tiwari-7229172b9](https://linkedin.com/in/srajal-tiwari-7229172b9)
* 💻 **GitHub**: [github.com/ultronop592](https://github.com/ultronop592)
* 📊 **Kaggle**: [kaggle.com/srajaltiwari76](https://www.kaggle.com/srajaltiwari76)
* 🧩 **LeetCode**: [leetcode.com/u/SrajalTiwari](https://leetcode.com/u/SrajalTiwari/)`
    } else if (intent === "hire") {
      finalAnswer = `🤖 AGENT RESPONSE: Why Srajal Tiwari is an ideal candidate for AI/ML & Generative AI Engineering roles:

1. 🌟 **Amazon ML Summer School 2026 Scholar**: Selected for Amazon's competitive machine learning program, learning directly from Amazon Scientists across GenAI, LLMs, Deep Learning, and RL.
2. 🏆 **Proven Builder & Hackathon Winner**: 2nd Place in Kalpathon 2.0 (UnLegalize — fine-tuned Gemma-3 270M with PEFT/LoRA), creator of AgentForge (LangGraph multi-agent orchestration) and Multi-Source Agentic RAG.
3. ⚡ **Agentic AI & MCP Certified**: Certified directly by Anthropic in Model Context Protocol (MCP) architecture and Claude agentic workflows.
4. 🎓 **Academic Rigor**: 4th-year B.Tech student in CSE (Artificial Intelligence) at BBDU maintaining a **8.4 / 10 CGPA**.
5. 🚀 **Ready to Deploy**: Actively interviewing and ready to contribute to high-impact production AI systems from day one.`
    } else {
      finalAnswer = `🤖 AGENT RESPONSE: Welcome! I am Srajal's AI Portfolio Ambassador connected via Model Context Protocol (MCP).

I can answer any detail about his portfolio:
* Ask about **"projects"** or specific apps like **"AgentForge"**, **"UnLegalize"**, **"Agentic RAG"**, or **"Cold Email AI"**.
* Ask about **"experience"** or **"Om Softwares"** / **"Mirai"** to learn about his industry internships.
* Ask about **"achievements"** or **"Amazon ML Summer School"** / **"Kaggle"** / **"hackathon"**.
* Ask about **"skills"** to inspect his Python, TypeScript, LangChain, LangGraph, Qdrant, Next.js, and FastAPI stack.
* Ask about **"certifications"** to see his Anthropic MCP, AWS, Microsoft, and Google credentials.
* Ask about **"education"** to check his BBD University 4th-year status & 8.4 CGPA.
* Ask about **"contact"** for email, phone, and social profile links.`
    }

    addLog(finalAnswer, "success")
    setIsRunning(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRunning || !input.trim()) return
    handleQuery(input)
  }

  return (
    <TiltCard3D tiltStrength={6} glareOpacity={0.08} className="w-full max-w-4xl mx-auto">
      <div className="w-full rounded-2xl overflow-hidden border border-emerald-500/25 bg-neutral-950/90 shadow-2xl flex flex-col min-h-[540px] backdrop-blur-xl relative group">
        {/* Dynamic scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-terminal-scanline opacity-[0.03] z-10 rounded-2xl" />

        {/* Corner Reticles */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-30" />
        <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-30" />
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-30" />
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none z-30" />

        {/* Terminal Title Bar */}
        <div className="bg-neutral-900/95 border-b border-emerald-500/15 px-5 py-4 flex justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <Terminal className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-gray-200 tracking-wider">mcp-portfolio-agent ~ active-session</span>
            <div className="flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">MCP ACTIVE</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700" />
            <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/40 border border-emerald-500/20" />
          </div>
        </div>

        {/* Interactive Logs Window */}
        <div ref={logsContainerRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto max-h-[380px] min-h-[320px] flex flex-col gap-3.5 relative bg-neutral-950/70 scrollbar-thin select-text">
          <AnimatePresence initial={false}>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 leading-relaxed"
              >
                <span className="text-[10px] text-emerald-500/50 mt-1 select-none font-mono tracking-wider">[{log.timestamp}]</span>
                <div className="flex-1">
                  {log.type === "input" && (
                    <div className="text-emerald-400 font-semibold flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">❯</span> {log.text}
                    </div>
                  )}
                  {log.type === "info" && <div className="text-gray-300">{log.text}</div>}
                  {log.type === "success" && <div className="text-emerald-400 font-medium">{log.text}</div>}
                  {log.type === "agent" && <div className="text-emerald-400/80 italic text-xs">{log.text}</div>}
                  {log.type === "tool" && <div className="text-amber-400/90 font-mono text-xs">{log.text}</div>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Suggestion Pills */}
        <div className="p-3 bg-neutral-950/95 border-t border-emerald-500/10 flex flex-wrap gap-2 z-20">
          {suggestionPills.map((pill, idx) => (
            <button
              key={idx}
              disabled={isRunning}
              onClick={() => handleQuery(pill.query)}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/30 hover:bg-emerald-500/15 border border-emerald-500/20 hover:border-emerald-500/50 text-xs text-neutral-300 hover:text-emerald-300 transition-all font-mono disabled:opacity-50 shadow-sm"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Command Line Input */}
        <div className="p-4 bg-neutral-900/95 border-t border-emerald-500/15 flex items-center gap-3 z-20">
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
            <span className="text-emerald-400 font-mono font-bold text-base">❯</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRunning ? "Agent processing query..." : "Ask AI Agent (e.g., 'What are Srajal's skills?')..."}
              disabled={isRunning}
              className="flex-1 bg-transparent font-mono text-sm text-gray-100 placeholder-gray-500 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isRunning || !input.trim()}
              className="p-2 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all disabled:opacity-30 flex items-center gap-1.5 text-xs font-mono font-semibold"
            >
              <span>SEND</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

          <button
            onClick={() => {
              setLogs([
                { text: "🤖 Srajal's AI Ambassador Client v2.0.0", type: "success", timestamp: "22:15:00" },
                { text: "Connected via Model Context Protocol (MCP) to Local portfolio-db server.", type: "info", timestamp: "22:15:01" },
              ])
              setIsRunning(false)
            }}
            className="p-2 px-2.5 bg-neutral-900 hover:bg-neutral-800 border border-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center justify-center"
            title="Reset Ambassador"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </TiltCard3D>
  )
}
