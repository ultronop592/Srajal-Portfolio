"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Send, RotateCcw, ShieldCheck, Sparkles, User, Briefcase, Mail } from "lucide-react"

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
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Quick Action Prompts
  const suggestionPills = [
    { label: "🔍 What is UnLegalize?", query: "Tell me about the UnLegalize hackathon project" },
    { label: "🏆 List Anthropic Certifications", query: "Show me Srajal's Anthropic MCP and AI certifications" },
    { label: "💼 AI/ML Internship Details", query: "What did Srajal do during his Mirai School of Technology internship?" },
    { label: "📞 How to Contact / Reach", query: "Give me Srajal's contact email, phone, and social links" },
  ]

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
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

    if (q.includes("project") || q.includes("unlegalize") || q.includes("rag") || q.includes("email") || q.includes("build") || q.includes("code") || q.includes("make") || q.includes("waterborne") || q.includes("fake news")) {
      intent = "projects"
      toolName = "search_projects_db"
      toolArgs = `{"query": "${userQuery.slice(0, 30)}"}`
    } else if (q.includes("skill") || q.includes("python") || q.includes("language") || q.includes("framework") || q.includes("libraries") || q.includes("tool") || q.includes("tech") || q.includes("stack") || q.includes("dsa") || q.includes("sql")) {
      intent = "skills"
      toolName = "get_technical_skills"
      toolArgs = `{"category": "all"}`
    } else if (q.includes("cert") || q.includes("anthropic") || q.includes("mcp") || q.includes("claude") || q.includes("credential") || q.includes("microsoft") || q.includes("deloitte")) {
      intent = "certifications"
      toolName = "fetch_verified_credentials"
      toolArgs = `{"issuer": "all"}`
    } else if (q.includes("intern") || q.includes("experience") || q.includes("job") || q.includes("work") || q.includes("mirai") || q.includes("school") || q.includes("codec")) {
      intent = "experience"
      toolName = "get_employment_history"
      toolArgs = `{"detailed": true}`
    } else if (q.includes("college") || q.includes("university") || q.includes("study") || q.includes("education") || q.includes("degree") || q.includes("cgpa") || q.includes("bbd")) {
      intent = "education"
      toolName = "read_academic_record"
      toolArgs = `{"degree": "BTech"}`
    } else if (q.includes("contact") || q.includes("email") || q.includes("mail") || q.includes("phone") || q.includes("reach") || q.includes("connect") || q.includes("social") || q.includes("linkedin") || q.includes("whatsapp")) {
      intent = "contact"
      toolName = "get_contact_anchors"
      toolArgs = `{"channel": "all"}`
    } else if (q.includes("hire") || q.includes("why") || q.includes("recru") || q.includes("position") || q.includes("open") || q.includes("opportunity")) {
      intent = "hire"
      toolName = "evaluate_candidate_fit"
      toolArgs = `{"role": "AI_ML_Intern"}`
    }

    addLog(`[agent] Intent classified: [${intent.toUpperCase()}]. Active MCP tools registered.`, "agent")
    
    // Phase 3: MCP Handshake
    await delay(500)
    addLog(`[mcp] JSON-RPC Call -> tools/call {'name': '${toolName}', 'arguments': ${toolArgs}}`, "info")
    
    // Phase 4: Tool Execution Result
    await delay(700)
    let toolResultText = ""
    if (intent === "projects") {
      toolResultText = "Retrieved 3 matching major project nodes from vector index: [UnLegalize (Hackathon 2nd Place), Multi Source Agentic RAG System, Cold Email Generator AI]."
    } else if (intent === "skills") {
      toolResultText = "Retrieved skills metadata: Languages: Python, C/C++, SQL | Core: Pandas, NumPy, Scikit-learn, TensorFlow, Keras | Tools: Hugging Face, LangChain, Qdrant, Docker, n8n."
    } else if (intent === "certifications") {
      toolResultText = "Retrieved 14 verified certificates: [Anthropic Advanced MCP (March 2026), Anthropic AI Fluency (May 2026), Anthropic Claude 101, Microsoft Generative AI, Deloitte Data Analytics]."
    } else if (intent === "experience") {
      toolResultText = "Retrieved 1 internship node: [Mirai School of Technology - July to August 2025, developed trip itineraries with n8n and sentiment agent with Gemini API]."
    } else if (intent === "education") {
      toolResultText = "Retrieved academic sheet: [Babu Banarasi Das University, Lucknow. Degree: B.Tech CSE (AI). Duration: 2023 - 2027. CGPA: 8.4/10]."
    } else if (intent === "contact") {
      toolResultText = "Retrieved active channels: [Email: srajaltiwari902@gmail.com, Phone: +919919084211, Location: Lucknow, India, Socials: LinkedIn, GitHub, Kaggle]."
    } else if (intent === "hire") {
      toolResultText = "Retrieved evaluation parameters: Candidate shows solid engineering structures, 10+ AI projects, advanced Anthropic credentials, B.Tech AI academic focus, and practical n8n workflow experience."
    } else {
      toolResultText = "Retrieved base profile data: Srajal Tiwari - AI/ML Engineer and GenAI Builder seeking internship opportunities."
    }
    addLog(`[tool-response] Success. ${toolResultText}`, "success")

    // Phase 5: Synthesis
    await delay(600)
    addLog("[agent] Synthesizing intelligent profile response. Typewriter output loading...", "agent")
    
    // Phase 6: Final Typewriter Response
    await delay(800)
    let finalAnswer = ""
    if (intent === "projects") {
      finalAnswer = `🤖 AGENT RESPONSE: Here are Srajal's top AI/ML projects:
      
1. ⚖️ **UnLegalize (Hackathon 2nd Place - April 2026)**
   * **Details**: AI-powered legal clause simplifier for Indian rental contracts. Built the complete FastAPI backend, OCR document parser, custom regex splitting, and locally fine-tuned Gemma 3 (270M) using PEFT and LoRA adapters.
   * **GitHub**: [github.com/ultronop592/Con-Tech_Srajal.git](https://github.com/ultronop592/Con-Tech_Srajal.git)

2. 🧠 **Multi Source Agentic RAG System (2026)**
   * **Details**: Production-ready RAG system utilizing Qdrant Cloud vector search and Gemini 2.5 Flash. Features dynamic agent routing, hybrid (dense + BM25) retrieval, real-time response streaming, and PDF chunk ingestion.
   * **GitHub**: [github.com/ultronop592/MutliSouce-Agentic-RAG-System.git](https://github.com/ultronop592/MutliSouce-Agentic-RAG-System.git)

3. ✉️ **Cold Email Generator AI (2026)**
   * **Details**: GenAI agent taking job URL inputs, reading candidate resumes via LangChain and ChromaDB, and producing personalized emails with full reasoning pipelines.
   * **GitHub**: [github.com/ultronop592/Cold-Email-AI.git](https://github.com/ultronop592/Cold-Email-AI.git)

Would you like details on any of Srajal's other model implementations (like Spam Detection or Movie Recommenders)?`
    } else if (intent === "skills") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal possesses a highly focused and modern AI/ML tech stack:
      
* **Languages**: Python, SQL, C/C++
* **AI/ML & Deep Learning**: Scikit-learn, TensorFlow, Keras, Pandas, NumPy, Matplotlib, Seaborn
* **Generative AI & Agents**: LangChain, ChromaDB, Qdrant Cloud (Vector Databases), Gemini API, Hugging Face Hub, PEFT/LoRA (Fine-Tuning adapters)
* **Automation & Tools**: n8n (Advanced AI workflow orchestration), Docker, Cursor IDE, Git & GitHub, MySQL

His expertise combines core mathematical concepts (ML/DL, Neural Networks, DSA) with practical generative AI deployments.`
    } else if (intent === "certifications") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal holds 12+ industry credentials, with advanced qualifications from **Anthropic**:
      
* **Model Context Protocol (Advanced Topics)** – *Anthropic (March 2026)*: Verified expert in building, securing, and scaling MCP servers to link LLMs with external tools.
* **AI Fluency: Capabilities & Limitations** – *Anthropic (May 2026)*: Advanced training on prompt reasoning and model capacities.
* **Introduction to Model Context Protocol** – *Anthropic (March 2026)*
* **Claude 101 & Agent Skills** – *Anthropic Academy (March 2026)*
* **AI Engineer & Python/SQL Certifications** – *One Roadmap (2025)*
* **Generative AI & Machine Learning Foundations** – *Microsoft (2025)*
* **Data Analytics & Cybersecurity Protocols** – *Deloitte Virtual Experience (Forage, 2025)*

All certs have verified skilljar links which you can review directly in the Certifications timeline below!`
    } else if (intent === "experience") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal gained valuable remote industry experience during his internship:
      
* **Artificial Intelligence Intern** at **Mirai School of Technology** (July 2025 – August 2025)
  * **AI-Powered Trip Planner**: Built complete automation itineraries using n8n for workflow orchestration, integrating Gemini to generate travel schedules, and logging coordinates automatically to Google Sheets.
  * **Feedback Sentiment Agent**: Engineered a BI pipeline capturing forms and utilizing Gemini as a classifier to rate café feedback with 95%+ classification accuracy.
  * **Multimodal Chatbot**: Programmed a conversational Telegram chatbot that handles advanced voice and audio inputs using the Gemini API and n8n backend.

He also completed a remote AI Internship at **Codec Technologies** in early 2025, specializing in clean data preprocessing, model tuning, and supervised training.`
    } else if (intent === "education") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal's academic profile is built on solid AI foundations:
      
* **Degree**: B.Tech in Computer Science and Engineering (Specialization in Artificial Intelligence)
* **Institution**: Babu Banarasi Das University, Lucknow, India
* **Batch**: 2023 - 2027 (Currently entering 3rd year)
* **Academic Metric**: Cumulative GPA of **8.4 / 10**
* **Key Subjects**: Machine Learning, Deep Learning, Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS).`
    } else if (intent === "contact") {
      finalAnswer = `🤖 AGENT RESPONSE: Srajal is highly responsive and open to internship offers. Here are his verified contact channels:
      
* 📧 **Email**: [srajaltiwari902@gmail.com](mailto:srajaltiwari902@gmail.com)
* 📞 **Phone**: [+91 9919084211](tel:+919919084211)
* 💼 **LinkedIn**: [linkedin.com/in/srajal-tiwari-7229172b9](https://linkedin.com/in/srajal-tiwari-7229172b9)
* 💻 **GitHub**: [github.com/ultronop592](https://github.com/ultronop592)
* 📊 **Kaggle**: [kaggle.com/srajaltiwari76](https://www.kaggle.com/srajaltiwari76)

Feel free to send a message directly or schedule a virtual session using the Calendly CTA at the bottom of the page!`
    } else if (intent === "hire") {
      finalAnswer = `🤖 AGENT RESPONSE: Here is why Srajal Tiwari is a high-value candidate for an AI/ML internship role:
      
1. **Agentic AI & MCP Specialization**: Srajal holds advanced, verified certifications directly from **Anthropic** in Model Context Protocol and Claude workflows, putting him at the forefront of the agentic revolution.
2. **Production-Ready Builds**: He doesn't just build toy models. His projects (like UnLegalize and Multi-Source RAG) use industry-standard stacks: FastAPI, Qdrant Cloud vector search, Next.js, and local model fine-tuning (LoRA).
3. **Internship Experience**: He has already successfully deployed AI automations (n8n, Gemini voice chatbost, sheets integrations) during his time at Mirai School of Technology.
4. **Strong Academic Metrics**: Maintaining an **8.4 CGPA** at BBD University, proving strong study discipline and logical aptitude.

He is prepared to join your team and contribute to actual codebases starting immediately!`
    } else {
      finalAnswer = `🤖 AGENT RESPONSE: Hello! I am Srajal's AI Portfolio Ambassador, connected via the Model Context Protocol.
      
I can provide detailed, verified answers about Srajal's background:
* Type **"projects"** or **"unlegalize"** to review his AI/ML code builds.
* Type **"skills"** to inspect his technical tools and languages.
* Type **"certifications"** to see his advanced Anthropic credentials.
* Type **"experience"** to learn about his remote AI internships.
* Type **"contact"** to get phone numbers, emails, and LinkedIn links.

How can I help you evaluate Srajal's fit for your engineering team today?`
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
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-emerald-500/25 bg-neutral-950/80 shadow-2xl flex flex-col min-h-[520px] backdrop-blur-xl relative">
      {/* Dynamic scanline overlay for retro-modern tech style */}
      <div className="absolute inset-0 pointer-events-none bg-terminal-scanline opacity-[0.03] z-10 rounded-2xl" />

      {/* Terminal Title Bar */}
      <div className="bg-neutral-900/90 border-b border-emerald-500/10 px-5 py-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <Terminal className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-gray-300 tracking-wider">mcp-portfolio-agent ~ active-session</span>
          <div className="flex items-center gap-1.5 ml-3 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">LLM SECURE</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700" />
          <div className="h-3 w-3 rounded-full bg-neutral-800 border border-neutral-700" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/30 border border-emerald-500/10" />
        </div>
      </div>

      {/* Interactive Logs Window */}
      <div className="flex-1 p-6 font-mono text-sm overflow-y-auto max-h-[380px] min-h-[320px] flex flex-col gap-3.5 relative bg-black/40 scrollbar-thin select-text">
        <AnimatePresence initial={false}>
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 leading-relaxed"
            >
              <span className="text-[10px] text-emerald-500/40 mt-1 select-none font-mono tracking-wider">[{log.timestamp}]</span>
              <div
                className={`flex-1 font-mono whitespace-pre-wrap ${
                  log.type === "success"
                    ? "text-emerald-400 selection:bg-emerald-500/20"
                    : log.type === "warning"
                      ? "text-amber-400 selection:bg-amber-500/20"
                      : log.type === "error"
                        ? "text-rose-500 selection:bg-rose-500/20"
                        : log.type === "input"
                          ? "text-sky-300 font-bold selection:bg-sky-500/20"
                          : log.type === "agent"
                            ? "text-purple-400 font-medium selection:bg-purple-500/20"
                            : log.type === "tool"
                              ? "text-gray-400 italic selection:bg-gray-700/30"
                              : "text-gray-300 selection:bg-gray-700/30"
                }`}
              >
                {/* Visual icons based on output lines */}
                {log.type === "input" && <span className="text-sky-400 mr-1 select-none">$</span>}
                {log.type === "agent" && <span className="text-purple-400 mr-1 select-none">⚙️</span>}
                {log.type === "tool" && <span className="text-gray-500 mr-1 select-none">🛠️</span>}
                {log.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={logsEndRef} />
      </div>

      {/* Suggestion Prompt Pills */}
      <div className="px-6 py-3 bg-neutral-900/20 border-t border-emerald-500/10 flex flex-col gap-2 z-20">
        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-1 select-none">
          <Sparkles className="h-3 w-3 text-emerald-500" />
          Click to Query Srajal's Ambassador Agent:
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestionPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleQuery(pill.query)}
              disabled={isRunning}
              className="px-3 py-1.5 rounded-full bg-neutral-900 border border-gray-800 text-gray-400 text-xs font-mono font-medium hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 disabled:opacity-50 transition-all duration-200"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Input Controls */}
      <div className="bg-neutral-950 p-4 border-t border-emerald-500/15 flex items-stretch gap-3 z-20">
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 bg-black/60 border border-gray-800 focus-within:border-emerald-500/50 rounded-xl px-4 py-3 transition-colors">
          <span className="text-emerald-500 font-mono font-bold select-none">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isRunning}
            placeholder={isRunning ? "Agent resolving local tools. Please wait..." : "Ask the AI agent anything... (e.g. 'unlegalize', 'certs', 'phone')"}
            className="flex-1 bg-transparent font-mono text-sm text-gray-200 focus:outline-none placeholder-gray-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isRunning || !input.trim()}
            className="text-emerald-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-emerald-500 transition-colors"
            title="Submit Query"
          >
            <Send className="h-4.5 w-4.5" />
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
          className="px-3.5 bg-neutral-900 hover:bg-neutral-800 border border-gray-800 rounded-xl text-gray-500 hover:text-white transition-colors flex items-center justify-center"
          title="Reset Ambasssador"
        >
          <RotateCcw className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  )
}
