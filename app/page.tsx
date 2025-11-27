"use client"

import type React from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Send, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CursorBlob } from "@/components/cursor-blob"
import { Profile3DTilt } from "@/components/profile-3d-tilt"
import { SplineSceneBasic } from "@/components/spline-scene-demo"
import { ScrollToHashClient } from "@/components/portfolio/scroll-to-hash-client"
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar"
import { EtheralShadow } from "@/components/ui/etheral-shadow"
import { NeonButton } from "@/components/ui/neon-button"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import ExpandCards from "@/components/ui/expand-cards"

const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"), { ssr: false })
const AnimatedSection = dynamic(() => import("@/components/animated-section"), { ssr: false })
const TypingText = dynamic(() => import("@/components/typing-text"), { ssr: false })
const SpiralAnimation = dynamic(
  () => import("@/components/ui/spiral-animation").then((m) => ({ default: m.SpiralAnimation })),
  { ssr: false },
)

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
    concepts: ["Machine Learning", "Generative AI", "Neural Networks", "DSA", "DBMS", "Operating Systems"],
    tools: ["Google Colab", "Kaggle", "Cursor IDE", "Docker", "MySQL Workbench", "VS Code", "n8n", "Zapier"],
  }

  const projects = [
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
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      {showLanding && <SplineSceneBasic isLanding={true} onExplore={() => setShowLanding(false)} />}

      {!showLanding && <CursorBlob />}

      {!showLanding && (
        <>
          <ScrollToHashClient />

          <div className="fixed inset-0 z-0">
            <Suspense fallback={<div className="w-full h-full bg-black" />}>
              <SpiralAnimation />
            </Suspense>
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
            <AnimatedSection className="py-20 px-4 relative overflow-hidden">
              <div className="absolute inset-0 z-[1] opacity-40">
                <EtheralShadow
                  color="rgba(200, 200, 200, 1)"
                  animation={{ scale: 100, speed: 30 }}
                  noise={{ opacity: 0.4, scale: 1.8 }}
                  sizing="fill"
                />
              </div>

              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -top-40 -right-40 w-80 h-80 bg-neutral-800/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -bottom-40 -left-40 w-80 h-80 bg-neutral-800/10 rounded-full blur-3xl"
                />
              </div>

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
                        className={`px-2 py-1 rounded border ${
                          profileMode === m
                            ? "bg-neutral-800 border-neutral-600"
                            : "bg-neutral-800 border-neutral-700 hover:border-neutral-500"
                        }`}
                      >
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>

            <section id="about-me" className="py-16 px-4">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">About Me</h2>
                <Card className="mx-auto max-w-4xl bg-neutral-900/70 border border-neutral-800">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white/90">Profile</h3>
                        <p className="text-neutral-300 leading-relaxed">
                          Motivated 3rd-year B.Tech AI student with strong foundations in machine learning and deep
                          learning. Experienced in building AI/ML projects with Python and modern frameworks.Seeking for
                          Internship in AI\ML domain or as well as in IT sector.
                        </p>
                        <div className="space-y-2">
                          <div className="text-neutral-300 font-medium">Education</div>
                          <div className="text-neutral-300 ml-4">
                            B.Tech CSE (Artificial Intelligence)
                            <br />
                            Babu Banarasi Das University
                            <br />
                            CGPA: 8.4/10 (2nd year)
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white/90">Contact</h3>
                        <div className="space-y-3">
                          <div className="flex items-center text-neutral-300">
                            <Mail className="h-4 w-4 mr-3" />
                            <div>
                              <div className="text-neutral-400 text-sm">Email</div>
                              <a href="mailto:srajaltiwari902@gmail.com" className="hover:text-white">
                                srajaltiwari902@gmail.com
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center text-neutral-300">
                            <Phone className="h-4 w-4 mr-3" />
                            <div>
                              <div className="text-neutral-400 text-sm">Phone</div>
                              <a href="tel:+919919084211" className="hover:text-white">
                                +91 9919084211
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center text-neutral-300">
                            <MapPin className="h-4 w-4 mr-3" />
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
            </section>

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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Languages", items: skills.languages },
                    { title: "Frameworks", items: skills.frameworks },
                    { title: "Concepts", items: skills.concepts },
                    { title: "Tools", items: skills.tools },
                  ].map((category, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Card className="bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm border border-neutral-700 hover:border-neutral-600 group relative overflow-hidden transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-400/0 via-neutral-500/0 to-neutral-600/0 group-hover:from-neutral-400/5 group-hover:via-neutral-500/5 group-hover:to-neutral-600/5 transition-all duration-500" />

                        <CardHeader className="relative z-10">
                          <CardTitle className="text-lg text-white/90 group-hover:text-neutral-300 transition-colors duration-300">
                            {category.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                          <div className="flex flex-wrap gap-2">
                            {category.items.map((item, idx) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + idx * 0.02, duration: 0.4 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                              >
                                <Badge className="bg-neutral-800/80 hover:bg-neutral-100 text-neutral-200 border border-neutral-600 hover:border-neutral-500/50 text-xs backdrop-blur-sm transition-all duration-300 cursor-default">
                                  {item}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection id="featured-projects" className="py-20 px-4" delay={0.15}>
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
                <ExpandCards projects={projects} initialIndex={0} />
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="bg-neutral-900/70 border border-neutral-800 hover:border-neutral-600">
                        <CardHeader>
                          <Badge className="bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs w-fit">
                            {cert.level}
                          </Badge>
                          <CardTitle className="text-lg text-white/90 mt-2">{cert.name}</CardTitle>
                          <CardDescription className="text-neutral-300">{cert.issuer}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="border-neutral-700 text-neutral-200 text-xs">
                              {cert.date}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-neutral-200 hover:text-white hover:bg-white/5"
                              onClick={() => window.open(cert.link, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <section id="experience" className="py-16 px-4">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
                <Card className="mx-auto max-w-4xl bg-neutral-900/70 border border-neutral-800">
                  <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-xl text-white/90">Artificial Intelligence Intern (Remote)</CardTitle>
                        <CardDescription className="text-lg text-neutral-300">
                          Mirai School of Technology
                        </CardDescription>
                      </div>
                      <Badge className="bg-neutral-800 text-neutral-200 border border-neutral-700">
                        July 2025 - August 2025
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-neutral-300">
                      <li className="flex items-start">
                        <span className="text-neutral-400 mr-2">•</span>
                        <span>Designed and implemented an AI-powered Trip Planner using n8n with Gemini LLM.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-neutral-400 mr-2">•</span>
                        <span>Built a Feedback Sentiment Analysis system using Zapier and Gemini AI.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-neutral-400 mr-2">•</span>
                        <span>Developed cross-platform AI prototypes and automation workflows.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
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
                      name: "LeetCode Achievement",
                      designation: "Competitive Programming",
                      quote:
                        "Solved 150+ DSA problems on LeetCode, improving algorithmic thinking and coding efficiency.",
                      src: "/images/screenshot-202025-11-15-20100842.png",
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

            <section id="contact" className="py-16 px-4">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Contact</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                  <Card className="bg-neutral-900/70 border border-neutral-800">
                    <CardHeader>
                      <CardTitle className="text-white/90">Get In Touch</CardTitle>
                      <CardDescription className="text-neutral-300">Send me a message</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-neutral-900/60 border-neutral-800 text-white"
                        />
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-neutral-900/60 border-neutral-800 text-white"
                        />
                        <Textarea
                          placeholder="Your Message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="bg-neutral-900/60 border-neutral-800 text-white"
                        />
                        <Button type="submit" className="w-full bg-white text-black hover:bg-neutral-100">
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white/90">Connect</h3>
                    {[
                      {
                        icon: Mail,
                        label: "Email",
                        href: "mailto:srajaltiwari902@gmail.com",
                        text: "srajaltiwari902@gmail.com",
                      },
                      { icon: Phone, label: "Phone", href: "tel:+919919084211", text: "+91 9919084211" },
                      {
                        icon: Linkedin,
                        label: "LinkedIn",
                        href: "https://linkedin.com/in/srajal-tiwari-7229172b9",
                        text: "LinkedIn",
                      },
                      { icon: Github, label: "GitHub", href: "https://github.com/ultronop592", text: "GitHub" },
                    ].map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-neutral-900/60 border border-neutral-800 rounded-lg hover:border-neutral-600"
                      >
                        <item.icon className="h-5 w-5 mr-3 text-neutral-300" />
                        <div>
                          <div className="text-neutral-400 text-sm">{item.label}</div>
                          <div className="text-neutral-200 text-sm">{item.text}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
          </main>

          <footer className="py-8 px-4 bg-black/80 border-t border-neutral-800 relative z-10">
            <div className="container mx-auto">
              <div className="text-center">
                <div className="text-neutral-400 mb-2">© 2025 Srajal Tiwari</div>
                <div className="text-neutral-500 text-sm">Built with React.js, Next.js & Tailwind CSS</div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
