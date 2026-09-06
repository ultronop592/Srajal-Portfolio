"use client"

import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline"
import { NeonButton } from "@/components/ui/neon-button"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SplineSceneBasicProps {
  isLanding?: boolean
  onExplore?: () => void
}

export function SplineSceneBasic({ isLanding = false, onExplore }: SplineSceneBasicProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  if (isLanding) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <DottedSurface className="fixed inset-0 z-0" />

        <Card className="w-full h-full bg-gradient-to-br from-black/90 to-neutral-950/90 relative overflow-hidden border-0">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          <div className="flex h-full items-center justify-center px-4">
            {/* Left content */}
            <motion.div
              className="flex-1 max-w-xl relative z-10 flex flex-col justify-center"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 backdrop-blur-md w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>BBDU CSE (AI) '27 · CGPA 8.3 · AMAZON ML SCHOLAR</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                Srajal Tiwari
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono text-emerald-400/90">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20">AI / ML Engineer</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20">Full-Stack Builder</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20">Ex-Intern @ Om Softwares</span>
              </div>
              <p className="text-base sm:text-lg text-neutral-300 mb-6 leading-relaxed">
                Computer Science & AI undergraduate at BBD University (CGPA 8.3). Selected for <strong className="text-white font-medium">Amazon ML Summer School 2026</strong>, certified in <strong className="text-white font-medium">AI Agents by Kaggle × Google</strong>, and experienced shipping production full-stack systems with Next.js 15, FastAPI, and Scikit-learn.
              </p>
              <div className="flex items-center gap-4">
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
                  <NeonButton onClick={onExplore} variant="ghost" size="lg" className="font-semibold shadow-lg text-base">
                    Explore Portfolio
                  </NeonButton>
                </motion.div>
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">
                  Lucknow, India · Open for Roles
                </span>
              </div>
            </motion.div>

            {/* Right content - 3D Scene */}
            <motion.div
              className="flex-1 relative h-full hidden md:flex items-center justify-center"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full h-[500px] bg-gradient-to-br from-black to-neutral-950 relative overflow-hidden border border-neutral-800">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="flex h-full">
          {/* Left content */}
          <motion.div
            className="flex-1 p-8 relative z-10 flex flex-col justify-center"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Experience</h1>
            <p className="mt-4 text-neutral-300 max-w-lg leading-relaxed">
              Explore my 3D portfolio experience showcasing key projects and achievements with interactive
              visualizations.
            </p>
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NeonButton variant="ghost" size="lg" className="font-semibold shadow-lg text-lg">
                Learn More
              </NeonButton>
            </motion.div>
          </motion.div>

          {/* Right content - 3D Scene */}
          <motion.div
            className="flex-1 relative"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
