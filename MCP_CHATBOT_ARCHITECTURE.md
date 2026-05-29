# 📟 Model Context Protocol (MCP) Portfolio Agent: System Architecture

This document provides a comprehensive architectural breakdown of the **Interactive AI Portfolio Ambassador Chatbot** implemented in Srajal Tiwari's portfolio. It explains the system's design, operational lifecycle, and how it delivers intelligent, real-time responses **completely offline without external API dependencies**.

---

## 🗺️ Architectural Concept & Flow

The AI Portfolio Agent simulates the **Model Context Protocol (MCP)**—an open-standard client/server protocol designed by Anthropic to link LLM clients (like Claude) securely with local tools and resources. 

The chatbot operates as a self-contained, unified sandbox where the client-side browser serves as both the **AI Client Coordinator** and the **Local MCP Tool Server**.

### System Interaction Diagram

```mermaid
graph TD
    User([Recruiter / Visitor]) -->|1. Type Question or Click Pill| UI[Chatbot UI Terminal]
    UI -->|2. Ingest Query| Client[Client Coordinator Engine]
    Client -->|3. Route Keyword Intent| Parser{Natural Language Intent Classifier}
    
    Parser -->|Intent: PROJECTS| Tool1[search_projects_db]
    Parser -->|Intent: SKILLS| Tool2[get_technical_skills]
    Parser -->|Intent: CERTS| Tool3[fetch_verified_credentials]
    Parser -->|Intent: EXP| Tool4[get_employment_history]
    Parser -->|Intent: EDU| Tool5[read_academic_record]
    Parser -->|Intent: CONTACT| Tool6[get_contact_anchors]
    Parser -->|Intent: HIRE| Tool7[evaluate_candidate_fit]
    
    Tool1 & Tool2 & Tool3 & Tool4 & Tool5 & Tool6 & Tool7 -->|4. Handshake logs / JSON-RPC Tools Call| RPC[Simulated MCP Server Protocol]
    RPC -->|5. Local Indexed Retrieval| DB[(Offline Knowledge Base)]
    DB -->|6. JSON Response| RPC
    RPC -->|7. Tool Outputs| Client
    Client -->|8. Synthesis Typewriter Loop| UI
    UI -->|9. Render Dynamic Summary & Clickable Anchors| User
```

---

## 🛠️ MCP JSON-RPC Exchange Protocol

To demonstrate your direct expertise in the Model Context Protocol, the terminal visually logs the actual JSON-RPC messages exchanged between the client and the mock local server:

1. **Client Request (`tools/list`)**: Handshakes with the server to find registered capabilities.
2. **Client Call (`tools/call`)**: Triggered dynamically when intent is classified.
   ```json
   {
     "jsonrpc": "2.0",
     "method": "tools/call",
     "params": {
       "name": "search_projects_db",
       "arguments": {
         "query": "unlegalize rental agreement"
       }
     },
     "id": 14
   }
   ```
3. **Server Response**:
   ```json
   {
     "jsonrpc": "2.0",
     "result": {
       "content": [
         {
           "type": "text",
           "text": "Retrieved project: UnLegalize. Tech: Gemma-3-270M-LoRA, FastAPI..."
         }
       ]
     },
     "id": 14
   }
   ```

---

## ⚡ How It Delivers Answers Without External APIs

Standard chatbots usually call expensive, high-latency cloud APIs (like OpenAI or Gemini endpoints), which present several critical problems for portfolios:
* **Latency**: Waiting 3 to 7 seconds for an API response hurts visitor engagement.
* **Hosting Costs**: Unlimited API routes expose developers to billing risks.
* **Security**: Exposing API keys in client-side bundles is a major vulnerability.
* **Server Maintenance**: Serverless functions can experience cold starts or failures.

### 💡 The Solution: Localized Intent Routing & Semantic Mapping

Srajal's portfolio uses a **Client-Side Semantic Search Router** paired with a **Structured Offline Knowledge Base** to eliminate all APIs:

1. **Intelligent Keyword Parser**: The chatbot utilizes a multi-layered local parser mapping regex and keyword configurations (e.g. `unlegalize` ➔ `projects`, `mcp` ➔ `certifications`, `internship` ➔ `experience`).
2. **Deterministic RAG (Retrieval-Augmented Generation)**: The local database is pre-structured inside the component’s compiled memory. When a matching intent is flagged, it pulls exact, rich metadata payloads matching Srajal's real B.Tech scores, internship schedules, and codebases.
3. **Asynchronous Typewriter Streaming**: The system pushes the gathered data through a typing accumulator. Micro-delays are mathematically calculated per sentence to perfectly mimic high-speed streaming tokens from an active LLM inference engine.

---

## 🌟 Strategic Advantages

* ✅ **0ms Network Overhead**: Answers stream instantly with zero network requests, wowing recruiters.
* ✅ **100% Offline Resilience**: Runs perfectly even in offline environments or slow mobile networks.
* ✅ **Vercel Edge Deployable**: The entire site remains completely static, allowing it to be served globally on CDN edges.
* ✅ **Agentic Demonstration**: Visually details your understanding of agent logs, planning, tool schemas, and JSON-RPC messages—proving you can build these pipelines in commercial environments.
