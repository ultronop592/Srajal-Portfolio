# Srajal Tiwari - AI/ML Engineer Portfolio

A production-grade portfolio website showcasing 10+ AI/ML projects, 12+ industry certifications, and a modern AI/ML tech stack. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS for a modern, interactive user experience.

**Live Site**: [srajal-portfolio.vercel.app](https://srajal-portfolio.vercel.app)

## ✨ Features

### 🎨 Interactive UI Components
- **AI Portfolio Ambassador Chatbot & MCP Simulator** - An interactive conversational assistant styled as a dark-emerald monospace console. Simulates Anthropic's **Model Context Protocol (MCP)** by logging real-time JSON-RPC tools request handshakes before outputting typewriter-synthesized answers to natural language recruiter questions.
- **Animated Hero Section** - Scroll-based animations with stats visualization (9+ Projects, 12+ Certificates, 7+ Achievements, 12+ Tech Stack)
- **3D Effects** - Profile 3D tilt, spline scene viewer, and motion animations
- **Smooth Transitions** - Framer Motion animations for all interactive elements
- **Responsive Design** - Seamless experience across mobile, tablet, and desktop

### 💼 Portfolio Showcase
- **10+ Featured Projects** - Production AI/ML builds including:
  - UnLegalize (Gemma 3 + LoRA legal clause simplification)
  - Multi Source Agentic RAG System (FastAPI, Next.js, Qdrant, Gemini)
  - Cold Email Generator AI (LangChain, Groq LLM, ChromaDB)
  - And more...
- **Project Details** - Live demos and GitHub repositories for each project
- **Technology Tags** - Clear tech stack breakdown per project

### 🏆 Achievements & Credentials
- **12+ Industry Certifications** - Anthropic, Microsoft, Google, Deloitte, and more
- **7+ Major Achievements** - LeetCode streak, Startup School program, HCL GUVI AI Summit, hackathons
- **Autoplay Testimonials** - Animated certificates carousel with descriptions

### 📋 Resume Section
- **Resume Download** - Direct download from Google Drive
- **Resume Viewer** - Embedded resume page
- **Contact Integration** - Email, phone, and social links

### 🎯 Skills & Technologies
- **Languages**: Python, C/C++, SQL
- **Frameworks**: Pandas, NumPy, Scikit-learn, TensorFlow, Keras, Streamlit
- **AI/ML Concepts**: Machine Learning, Deep Learning, Generative AI, Neural Networks, RAG
- **Tools**: Docker, Git, Colab, Hugging Face, LangChain, ChromaDB, FastAPI

## 📁 Project Structure

\`\`\`
Srajal-Portfolio/
├── app/
│   ├── page.tsx                          # Main portfolio page
│   ├── layout.tsx                        # Root layout with metadata
│   ├── globals.css                       # Global styles
│   ├── carousel-demo/page.tsx            # Carousel demo page
│   ├── explore/page.tsx                  # Explore projects page
│   └── resume-pdf/page.tsx               # Resume PDF viewer
├── components/
│   ├── hero-scroll-demo.tsx              # Hero section with animated stats
│   ├── macbook-scroll-demo.tsx           # Macbook scroll animation
│   ├── profile-3d-tilt.tsx               # 3D profile tilt effect
│   ├── spline-scene-demo.tsx             # Spline 3D viewer
│   ├── animated-section.tsx              # Scroll reveal animations
│   ├── cursor-blob.tsx                   # Custom cursor blob effect
│   ├── theme-provider.tsx                # Theme context provider
│   ├── portfolio/scroll-to-hash-client.tsx
│   └── ui/                               # Reusable UI components
│       ├── 3d-adaptive-navigation-bar.tsx
│       ├── 3d-pin.tsx
│       ├── animated-testimonials.tsx
│       ├── bento-grid.tsx
│       ├── elegant-carousel.tsx
│       ├── mcp-terminal.tsx                  # Interactive Portfolio AI Agent Chatbot Console
│       ├── container-scroll-animation.tsx
│       ├── cpu-architecture.tsx
│       ├── lamp.tsx
│       ├── neural-background.tsx
│       ├── scroll-morph-hero.tsx
│       ├── timeline.tsx
│       └── [more UI components]
├── hooks/
│   ├── use-magnetic-button.ts
│   ├── use-reduced-motion.ts
│   ├── use-reveal-on-scroll.ts
│   └── use-tilt-effect.ts
├── lib/
│   └── utils.ts                          # Utility functions
├── public/
│   ├── resume.html                       # Embedded resume page
│   ├── RAG.png                           # Project screenshot
│   ├── Screenshot 2026-03-19 224454.png # Cold Email AI screenshot
│   └── images/                           # Project and certificate images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── components.json                       # shadcn/ui config
├── MCP_CHATBOT_ARCHITECTURE.md           # Chatbot system & JSON-RPC tools schema specs
└── README.md
\`\`\`

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and developer experience

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animations and interactions
- **GSAP** - High-performance animations
- **Tailwind Merge** - Utility class management

### UI Components & Icons
- **shadcn/ui** - Accessible component library
- **Lucide React** - Comprehensive icon set
- **Radix UI** - Unstyled, accessible primitives
- **Three.js** - 3D graphics library
- **React Three Fiber & Drei** - React renderer for Three.js
- **Spline** - Interactive 3D scenes

### Additional Libraries
- **Embla Carousel** - Carousel component
- **class-variance-authority** - Component variants
- **Lenis** - Smooth scroll library
- **Vercel Analytics** - Performance monitoring
- **Next Themes** - Dark mode support

### Development
- **ESLint** - Code quality
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or npm/pnpm/yarn
- Git

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/ultronop592/Srajal-Portfolio.git
cd Srajal-Portfolio

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
\`\`\`

### Development

\`\`\`bash
# Run development server
npm run dev
# or
pnpm dev
# or
yarn dev

# Open http://localhost:3000 in your browser
\`\`\`

### Production Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🎨 Customization Guide

### ✏️ Update Personal Information
Edit \`app/page.tsx\`:
\`\`\`typescript
const skills = {
  languages: ["Your languages"],
  frameworks: ["Your frameworks"],
  concepts: ["Your concepts"],
  tools: ["Your tools"],
}
\`\`\`

### 📂 Add/Update Projects
Modify the \`projects\` array in \`app/page.tsx\`:
\`\`\`typescript
{
  title: "Project Name",
  description: "Short description",
  details: "Detailed description",
  github: "https://github.com/.../repo",
  liveDemo: "https://deployed-site.com",
  tech: ["Tech1", "Tech2", "Tech3"],
  category: "ai" | "web",
  image: "/path-to-image.png",
}
\`\`\`

### 🏆 Add Certifications
Update the \`certifications\` array in \`app/page.tsx\`:
\`\`\`typescript
{
  name: "Certification Name",
  issuer: "Issuing Organization",
  date: "Month DD, YYYY",
  link: "https://certificate-link.com",
  level: "Beginner" | "Intermediate" | "Advanced",
}
\`\`\`

### 📋 Update Resume
1. Replace `public/resume.html` with your resume (or update the embed source)
2. Update drive download URL in `app/page.tsx` if using Google Drive:
   \`\`\`typescript
   const handleDownloadResume = () => {
     const driveDownloadUrl = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
     window.open(driveDownloadUrl, "_blank", "noopener,noreferrer")
   }
   \`\`\`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Optimizations

- ✅ Next.js Image Optimization
- ✅ Automatic Code Splitting
- ✅ Dynamic Imports for Heavy Components
- ✅ SEO Meta Tags & Structured Data
- ✅ Vercel Analytics Integration
- ✅ CSS Minification & Purging

## 🚀 Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Preview: Visit the provided URL
\`\`\`

Or connect your GitHub repository to Vercel for automatic deployments on push.

### Deploy to Other Platforms

**Netlify**
\`\`\`bash
npm run build
# Deploy the '.next' and 'public' folders
\`\`\`

**Docker**
\`\`\`bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
\`\`\`

## 📊 Portfolio Statistics

- **10+ Projects** - Production AI/ML applications
- **12+ Certifications** - Industry-recognized credentials
- **7+ Achievements** - Hackathons, coding challenges, summits
- **12+ Technologies** - Core tech stack tools
- **100+ Days** - LeetCode coding streak
- **5+ Years** - Combined AI/ML learning experience

## 🔗 Links

- **Portfolio**: [srajal-portfolio.vercel.app](https://srajal-portfolio.vercel.app)
- **GitHub**: [github.com/ultronop592](https://github.com/ultronop592)
- **LinkedIn**: [linkedin.com/in/srajal-tiwari-7229172b9](https://linkedin.com/in/srajal-tiwari-7229172b9)
- **Email**: srajaltiwari902@gmail.com
- **Location**: Lucknow, India

## 📝 Features in Progress

- [ ] Dark/Light theme toggle UI
- [ ] Blog section with articles
- [ ] Project filtering by technology
- [ ] Contact form submission
- [ ] Analytics dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by [Srajal Tiwari](https://github.com/ultronop592) | AI/ML Engineer | GenAI Enthusiast**

*Last updated: April 30, 2026 | Next.js 14 | React 18 | TypeScript*
