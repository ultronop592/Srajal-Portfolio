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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Srajal Tiwari</h1>
              <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed">
                I build AI/ML products that turn data into decisions. Exploring the world of Generative AI | Passionate
                about AI that learns, creates, and reasons | RAG | LLMs | Hugging Face
              </p>
              <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }}>
                <NeonButton onClick={onExplore} variant="ghost" size="lg" className="font-semibold shadow-lg text-lg">
                  Explore Portfolio
                </NeonButton>
              </motion.div>
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
