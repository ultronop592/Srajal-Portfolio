"use client"
import type React from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Download, Github, Linkedin, Mail, MapPin, Phone, Code, GraduationCap, Briefcase, Twitter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CursorBlob } from "@/components/cursor-blob"
import { Profile3DTilt } from "@/components/profile-3d-tilt"
import { SplineSceneBasic } from "@/components/spline-scene-demo"
import { ScrollToHashClient } from "@/components/portfolio/scroll-to-hash-client"
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar"
import { NeonButton } from "@/components/ui/neon-button"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { CodeIcon, LayersIcon, GearIcon, LightningBoltIcon } from "@radix-ui/react-icons"
import { LampContainer } from "@/components/ui/lamp"
import { CpuArchitecture } from "@/components/ui/cpu-architecture"
import DisplayCards from "@/components/ui/display-cards"
import { Timeline } from "@/components/ui/timeline"
import HeroScrollDemo from "@/components/hero-scroll-demo"
import { PinContainer } from "@/components/ui/3d-pin"
import { FallingPattern } from "@/components/ui/falling-pattern"
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail"

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

  useEffect(() => {
    setMounted(true)
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
    const driveDownloadUrl = "https://drive.google.com/uc?export=download&id=1eIxB8c51EMGQVDiDetjrjJ-evX-hwWhk"
    window.open(driveDownloadUrl, "_blank", "noopener,noreferrer")
  }

  const skills = {
    languages: ["Python", "C/C++", "SQL"],
    frameworks: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Streamlit", "TensorFlow", "Keras"],
    concepts: ["Machine Learning","Deep Learning", "Generative AI", "Neural Networks", "DSA", "DBMS", "Operating Systems"],
    tools: [
      "Google Colab",
      "Hugging Face",
      "LLMs",
      "Kaggle",
      "Cursor IDE",
      "Docker",
      "MySQL Workbench",
      "VS Code",
      "n8n",
      "github",
      "Git",
    ],
  }

  const projects = [
    {
      title: "AI-Powered Waterborne Disease Predictor",
      description: "Deep Learning model for medical report analysis",
      details:
        "A Bi-LSTM model that analyzes medical reports to predict waterborne diseases, showcasing advanced NLP and sequence modeling skills.",
      github: "https://github.com/ultronop592/WaterBrone-Diease-Prediction.git",
      liveDemo: "https://waterbrone-diease-prediction-byble.streamlit.app/",
      tech: ["Deep Learning", "Bi-LSTM", "NLP", "Streamlit", "Python", "TensorFlow/Keras"],
      category: "ai",
      image: "/images/waterborne-disease-predictor.png",
    },
    {
      title: "🔍 Fake News Classifier using RNN",
      description: "Deep learning-based text classification with Bidirectional LSTM",
      details: "Built a Fake News Classifier using Bidirectional LSTM for accurate text classification.",
      github: "https://github.com/ultronop592/FakeNews-Classifier-using-RNN.git",
      liveDemo: "https://fakenews-classifier-using-rnn-6.onrender.com/",
      tech: ["Python", "TensorFlow/Keras", "Deep Learning", "LSTM"],
      category: "ai",
      image: "/fake-news-classifier.png",
    },
    {
      title: "🎬 Movie Recommendation System",
      description: "Content-based recommendations with TF‑IDF + cosine similarity",
      details: "End-to-end movie recommender with TF‑IDF and cosine similarity using OMDB API.",
      github: "https://github.com/ultronop592/Movie-Recommendation-System.git",
      liveDemo: "https://movierecommendationssystem76.streamlit.app/",
      tech: ["Python", "Streamlit", "NLP", "OMDB API"],
      category: "ai",
      image: "/movie-recommender.png",
    },
    {
      title: "Multiple Disease Prediction System",
      description: "Heart Disease and Diabetes prediction",
      details: "Built multi-disease prediction system using SVM and Logistic Regression.",
      github: "https://github.com/ultronop592/ML_PUBLIC_DIEASES_Syste-.git",
      liveDemo: "https://mldieaseswebappbysrajal.streamlit.app/",
      tech: ["Python", "Scikit-learn", "Streamlit"],
      category: "ai",
      image: "/multiple-diseases-prediction.png",
    },
    {
      title: "Esports Strategy Hub",
      description: "Strategy Visualization Platform",
      details: "Web application for esports team strategy visualization.",
      github: "https://github.com/ultronop592/esportsstrategyhub",
      liveDemo: "https://ultronop592.github.io/esportsstrategyhub/",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      category: "web",
      image: "/esports-strategy-hub.png",
    },
    {
      title: "Spam Email Detection",
      description: "AI Classification System | Accuracy: 96.77%",
      details: "Logistic regression with TF‑IDF vectorization achieving 96.77% accuracy.",
      github: "https://github.com/ultronop592/Spam-emails-Prediction-web-app.git",
      liveDemo: "https://spamemailpredictionwebappbysrajal.streamlit.app/",
      tech: ["Python", "Scikit-learn", "TF-IDF"],
      category: "ai",
      image: "/spam-email-detection.png",
    },
    {
      title: "Loan Approval Predictive System",
      description: "AI-powered system with 78% accuracy",
      details: "Implemented data preprocessing and feature scaling for loan approval predictions.",
      github: "https://github.com/ultronop592/Loan-Approval-Predictioon-System.git",
      liveDemo: "https://loanapprovalpredictivesystembysrajal.streamlit.app/",
      tech: ["Python", "Pandas", "SVM"],
      category: "ai",
      image: "/loan-approval-prediction.png",
    },
  ]

  const certifications = [
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
      name: "Startup School: Prompt to Prototype",
      issuer: "Google for Startups x Scaler",
      date: "April 2025",
      link: "https://example.com/startup-school-certificate",
      level: "Intermediate",
    },
  ]

  const aboutMeCards = [
    {
      icon: <GraduationCap className="size-4 text-neutral-300" />,
      title: "Education",
      description: "B.Tech CSE (AI) - CGPA: 8.4",
      date: "2023 - 2027",
      iconClassName: "bg-neutral-800",
      titleClassName: "text-neutral-200",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Code className="size-4 text-neutral-300" />,
      title: "Focus Area",
      description: "AI/ML & GEN AI",
      date: "Current",
      iconClassName: "bg-neutral-800",
      titleClassName: "text-neutral-200",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Briefcase className="size-4 text-neutral-300" />,
      title: "Seeking",
      description: "AI/ML Internship",
      date: "Open to work",
      iconClassName: "bg-neutral-800",
      titleClassName: "text-neutral-200",
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ]

  const skillFeatures = [
    {
      Icon: CodeIcon,
      name: "Languages",
      description: skills.languages.join(" • "),
      href: "#skills",
      cta: "Core Languages",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: LayersIcon,
      name: "Frameworks & Libraries",
      description: skills.frameworks.join(" • "),
      href: "#skills",
      cta: "Tech Stack",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: LightningBoltIcon,
      name: "Concepts & Domains",
      description: skills.concepts.join(" • "),
      href: "#skills",
      cta: "Expertise Areas",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: GearIcon,
      name: "Tools & Platforms",
      description: skills.tools.join(" • "),
      href: "#skills",
      cta: "Development Tools",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-60" />
      ),
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4",
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
      {showLanding && <SplineSceneBasic isLanding={true} onExplore={() => setShowLanding(false)} />}

      {!showLanding && <CursorBlob />}

      {!showLanding && (
        <>
          <ScrollToHashClient />

          <div className="fixed inset-0 z-0 flex items-center justify-center bg-black">
            <FallingPattern
              className="absolute inset-0 opacity-20"
              color="rgba(255, 255, 255, 0.6)"
              backgroundColor="transparent"
              duration={100}
              blurIntensity="0.5em"
            />
            <CpuArchitecture
              className="w-full h-full opacity-30"
              text="AI"
              animateText={true}
              animateLines={true}
              animateMarkers={true}
            />
          </div>

          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
            <PillBase />
          </div>

          <NeonButton
            onClick={handleDownloadResume}
            variant="ghost"
            size="lg"
            className="fixed bottom-6 right-6 z-50 font-semibold shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </NeonButton>

          <main className="relative z-10 pt-24">
            <LampContainer className="py-20 px-4 min-h-[90vh]">
              <div className="container mx-auto relative z-10">
                <div className="grid items-center gap-10 md:grid-cols-2">
                  <div>
                    <motion.h1
                      className="text-4xl md:text-5xl font-bold text-white mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      Srajal Tiwari
                    </motion.h1>

                    <div className="text-xl md:text-2xl font-medium text-neutral-300 mb-5 h-12">
                      <Suspense fallback={<span>AI Engineer</span>}>
                        <TypingText
                          words={["AI Engineer", "Machine Learning Developer", "Deep Learning ", "Gen Ai Enthusiasm"]}
                          className="text-xl md:text-2xl font-medium text-neutral-300"
                        />
                      </Suspense>
                    </div>

                    <motion.p
                      className="text-neutral-300 leading-relaxed max-w-xl mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      I build AI/ML products that turn data into decisions. Exploring the world of Generative AI |
                      Passionate about AI that learns, creates, and reasons | RAG | LLMs | Hugging Face
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-2 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      {["AI/ML", "Generative AI", "Automation", "Data Apps"].map((b, i) => (
                        <motion.div
                          key={b}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                          whileHover={{ scale: 1.05, translateY: -2 }}
                        >
                          <Badge className="bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-neutral-500/50 transition-all duration-300 cursor-pointer">
                            {b}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex flex-wrap gap-3 mt-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.08, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <NeonButton
                          onClick={handleDownloadResume}
                          variant="ghost"
                          size="lg"
                          className="font-semibold shadow-lg hover:shadow-neutral-500/30"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Resume
                        </NeonButton>
                      </motion.div>

                      {[
                        { icon: Github, label: "GitHub", url: "https://github.com/ultronop592" },
                        { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/srajal-tiwari-7229172b9" },
                        { icon: Code, label: "LeetCode", url: "https://leetcode.com/u/SrajalTiwari/" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.08, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <NeonButton
                            variant="ghost"
                            className="text-neutral-200 hover:text-white"
                            onClick={() => window.open(item.url, "_blank")}
                          >
                            <item.icon className="h-4 w-4 mr-2" />
                            {item.label}
                          </NeonButton>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <div className="flex justify-center md:justify-end">
                    <Profile3DTilt mode={profileMode} imageSrc="/profile-3d.png" isMobile={isMobile} />
                  </div>
                </div>

                {process.env.NODE_ENV === "development" && (
                  <div className="mt-8 flex justify-center gap-2 text-xs">
                    {["css", "canvas", "webgl"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setProfileMode(m as "css" | "canvas" | "webgl")}
                        className={`px-2 py-1 rounded ${profileMode === m ? "bg-neutral-700" : "bg-neutral-800/50"}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </LampContainer>

            <section id="about-me" className="py-16 px-4">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">About Me</h2>

                <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
                  {/* DisplayCards on the left */}
                  <div className="flex-1 flex justify-center">
                    <DisplayCards cards={aboutMeCards} />
                  </div>

                  {/* Info Card on the right */}
                  <Card className="flex-1 bg-neutral-900/70 border border-neutral-800">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white/90">Profile</h3>
                          <p className="text-neutral-300 leading-relaxed">
                            Motivated 3rd-year B.Tech AI student with strong foundations in machine learning and deep
                            learning. Experienced in building AI/ML projects with Python and modern frameworks. Seeking
                            Internship in AI/ML domain or as well as in IT sector.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white/90">Education</h3>
                          <div className="space-y-4">
                            <div className="border-l-2 border-neutral-700 pl-4">
                              <div className="flex items-center gap-2 mb-1">
                                <GraduationCap className="h-4 w-4 text-neutral-400" />
                                <span className="text-white font-medium">B.Tech in Computer Science (AI)</span>
                              </div>
                              <p className="text-neutral-400 text-sm">Babu Banarasi Das University, Lucknow</p>
                              <div className="flex items-center gap-4 mt-1 text-sm">
                                <span className="text-neutral-500">2023 - 2027</span>
                                <span className="text-green-400 font-medium">CGPA: 8.4</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white/90">Contact</h3>
                          <div className="space-y-3">
                            <div className="flex items-center text-neutral-300">
                              <Mail className="h-5 w-5 mr-3 text-neutral-300" />
                              <div>
                                <div className="text-neutral-400 text-sm">Email</div>
                                <a href="mailto:srajaltiwari902@gmail.com" className="hover:text-white">
                                  srajaltiwari902@gmail.com
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center text-neutral-300">
                              <Phone className="h-5 w-5 mr-3 text-neutral-300" />
                              <div>
                                <div className="text-neutral-400 text-sm">Phone</div>
                                <a href="tel:+919919084211" className="hover:text-white">
                                  +91 9919084211
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center text-neutral-300">
                              <MapPin className="h-5 w-5 mr-3 text-neutral-300" />
                              <div>
                                <div className="text-neutral-400 text-sm">Location</div>
                                <span>Lucknow, India</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <AnimatedSection id="explore" className="py-0">
              <HeroScrollDemo />
            </AnimatedSection>

            <AnimatedSection id="skills" className="py-20 px-4" delay={0.1}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl font-bold text-white mb-12 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-transparent">
                    Skills & Expertise
                  </span>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <BentoGrid className="lg:grid-rows-3">
                    {skillFeatures.map((feature) => (
                      <BentoCard key={feature.name} {...feature} />
                    ))}
                  </BentoGrid>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection id="projects" className="py-20 px-4" delay={0.1}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl font-bold text-white mb-12 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </motion.h2>
                <FocusRail items={focusRailItems} autoPlay={false} loop={true} />
              </div>
            </AnimatedSection>

            <AnimatedSection id="components" className="py-20 px-4" delay={0.14}>
              <div className="container mx-auto">
                <motion.h2
                  className="text-3xl font-bold text-white mb-12 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Certifications
                </motion.h2>
                <StaggerTestimonials
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
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
                <Timeline
                  data={[
                    {
                      title: "2025",
                      content: (
                        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-6">
                          <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                            <div>
                              <h4 className="text-xl font-semibold text-white/90">
                                Artificial Intelligence Intern (Remote)
                              </h4>
                              <p className="text-lg text-neutral-300">Mirai School of Technology</p>
                            </div>
                            <span className="bg-neutral-800 text-neutral-200 border border-neutral-700 px-3 py-1 rounded-full text-sm">
                              July 2025 - August 2025
                            </span>
                          </div>
                          <ul className="space-y-3 text-neutral-300">
                            <li className="flex items-start">
                              <span className="text-neutral-400 mr-2">•</span>
                              <span>
                                AI-Powered Trip Planner: Designed and implemented an end-to-end travel itinerary
                                automation system using n8n for workflow orchestration, leveraging the Gemini LLM to
                                generate personalized plans, and integrating with Google Sheets for data storage and
                                automated email delivery.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-neutral-400 mr-2">•</span>
                              <span>
                                Feedback Sentiment Analysis System: Created a business intelligence solution where n8n
                                captured customer feedback forms (e.g., café ratings), and the Gemini API was used as an
                                analytical agent to accurately classify sentiment and store results in Google Sheets.
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-neutral-400 mr-2">•</span>
                              <span>
                                Conversational Telegram Chatbot: Developed a cross-platform AI prototype with n8n
                                managing the full backend, integrating the Gemini API for conversational intelligence,
                                and successfully enabling advanced multimodal interaction by processing user voice
                                inputs.
                              </span>
                            </li>
                          </ul>
                        </div>
                      ),
                    },
                    {
                      title: "Projects",
                      content: (
                        <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-6">
                          <h4 className="text-xl font-semibold text-white/90 mb-4">Key Highlights</h4>
                          <div className="space-y-3">
                            <div className="flex gap-2 items-center text-neutral-300 text-sm">
                              <span className="text-green-400">✓</span> Built AI automation workflows with n8n
                            </div>
                            <div className="flex gap-2 items-center text-neutral-300 text-sm">
                              <span className="text-green-400">✓</span> Integrated Gemini LLM for intelligent responses
                            </div>
                            <div className="flex gap-2 items-center text-neutral-300 text-sm">
                              <span className="text-green-400">✓</span> Developed multimodal chatbot with voice support
                            </div>
                            <div className="flex gap-2 items-center text-neutral-300 text-sm">
                              <span className="text-green-400">✓</span> Implemented sentiment analysis pipelines
                            </div>
                            <div className="flex gap-2 items-center text-neutral-300 text-sm">
                              <span className="text-green-400">✓</span> Automated data storage with Google Sheets
                            </div>
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
                  className="text-3xl font-bold text-white mb-12 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-transparent">
                    Achievements
                  </span>
                </motion.h2>
                <AnimatedTestimonials
                  autoplay={true}
                  testimonials={[
                    {
                      name: "100+ Days LeetCode Coding Streak",
                      designation: "LeetCode Badge 2025",
                      quote:
                        "Successfully maintained a consistent coding streak of 100+ days on LeetCode, demonstrating strong commitment, discipline, and proficiency in solving data structures and algorithms problems.",
                      src: "/images/leetcode-100-days-badge.png",
                    },
                    {
                      name: "Startup School: Prompt to Prototype",
                      designation: "Google for Startups x Scaler",
                      quote:
                        "Completed a two-week programme by Google for Startups in collaboration with Scaler. Learned the full AI product lifecycle from prompting to deployment through six expert-led sessions covering foundation skills, AI research, creative asset generation, prototyping, app development and deployment. Earned Certificate of Completion and applied hands-on learning to build AI-powered prototypes.",
                      src: "/images/google-startup-school-certificate.png",
                    },
                    {
                      name: "Mission Upskill India – Pre-Summit Event",
                      designation: "AI Impact Summit 2026 | HCL GUVI",
                      quote:
                        "Participated in the Mission Upskill India Pre-Summit Event organized by HCL GUVI in collaboration with Ministry of Electronics & Information Technology, Government of India, Digital India, and INDIAai. Focused on practical applications of AI and ML to build an AI-ready workforce. Learned core and advanced concepts of Machine Learning, Deep Learning, and Generative AI. Gained hands-on experience in rapid prototyping using Google Gemini AI Studio and practical prompt engineering. Mentored by Saransh Saxena, Amit Arjun Verma, and Yash Sharma. Certificate ID: i6047qOS1Ju74552W2",
                      src: "/images/hcl-guvi-ai-summit-certificate.jpg",
                    },
                    {
                      name: "Coding Ninjas Challenge",
                      designation: "21-Day Coding Challenge",
                      quote: "Completed Coding Ninjas' Ninja Slayground 2.0 — 21-Day Coding Challenge.",
                      src: "/images/screenshot-202025-11-15-20101639.png",
                    },
                    {
                      name: "Google Cloud Agentic AI",
                      designation: "Hackathon Participation",
                      quote:
                        "Participated in the Google Cloud Agentic AI Day Hackathon and showcased the project 'Project Drishti' with team members.",
                      src: "/images/hack2skill-certificate-20-281-29.png",
                    },
                    {
                      name: "Software Exhibition",
                      designation: "BBD University",
                      quote: "Presented the project 'Esport Strategy Hub' at the College Software Exhibition.",
                      src: "/images/whatsapp-20image-202025-11-15-20at-2010.jpeg",
                    },
                    {
                      name: "Google GDG Badges",
                      designation: "Google Developer Groups",
                      quote: "Earned verified badges from Google GDG Lucknow and Google Gen AI Exchange.",
                      src: "/images/screenshot-202025-11-15-20102310.png",
                    },
                  ]}
                />
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
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                      Let's Connect
                    </span>
                  </h2>
                  <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                    I'm always interested in hearing about new opportunities, projects, and collaborations. Feel free to reach out through any of these channels.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Contact Info Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 hover:border-sky-500/30 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Direct Contact</h3>
                    
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
                          className="group flex items-start p-4 bg-neutral-800/30 border border-neutral-700/50 rounded-xl hover:bg-sky-500/10 hover:border-sky-500/50 transition-all duration-300"
                        >
                          <div className="p-3 bg-sky-500/20 rounded-lg mr-4 group-hover:bg-sky-500/30 transition-colors">
                            <item.icon className="h-6 w-6 text-sky-400" />
                          </div>
                          <div>
                            <div className="text-neutral-300 text-sm font-medium">{item.label}</div>
                            <div className="text-white text-sm font-semibold mt-1">{item.text}</div>
                            <div className="text-neutral-500 text-xs mt-1">{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Social Links Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-8 hover:border-sky-500/30 transition-all duration-300"
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
                      ].map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start p-4 bg-neutral-800/30 border border-neutral-700/50 rounded-xl hover:bg-sky-500/10 hover:border-sky-500/50 transition-all duration-300"
                        >
                          <div className="p-3 bg-sky-500/20 rounded-lg mr-4 group-hover:bg-sky-500/30 transition-colors">
                            <item.icon className="h-6 w-6 text-sky-400" />
                          </div>
                          <div>
                            <div className="text-neutral-300 text-sm font-medium">{item.label}</div>
                            <div className="text-white text-sm font-semibold mt-1">{item.handle}</div>
                            <div className="text-neutral-500 text-xs mt-1">{item.description}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-16 text-center"
                >
                  <p className="text-neutral-400 mb-6">Prefer to discuss directly?</p>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-300 hover:-translate-y-1"
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

          <footer className="py-8 px-4 bg-black/80 border-t border-neutral-800 relative z-10">
            <div className="container mx-auto">
              <div className="text-center">
                <div className="text-neutral-400 mb-2">Srajal Tiwari</div>
                <div className="text-neutral-500 text-sm">Built with React.js, Next.js & Tailwind CSS</div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
