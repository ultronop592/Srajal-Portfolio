"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github, Zap } from "lucide-react"

interface Project {
  title: string
  description: string
  details: string
  github: string
  liveDemo: string
  tech: string[]
  category: string
  image: string
}

interface ExpandCardsProps {
  projects: Project[]
  initialIndex?: number
  className?: string
}

export default function ExpandCards({ projects, initialIndex = 0, className }: ExpandCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState(initialIndex)

  // Calculate dynamic width based on expanded state
  const getCardWidth = useCallback(
    (index: number) => {
      return index === expandedIndex ? "28rem" : "5rem"
    },
    [expandedIndex],
  )

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setExpandedIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setExpandedIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0))
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setExpandedIndex(index)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop view - horizontal expanding cards */}
      <div className="hidden lg:flex items-center justify-center gap-2 w-full max-w-7xl mx-auto px-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-700 hover:border-neutral-500 transition-colors"
            style={{
              height: "26rem",
            }}
            initial={false}
            animate={{
              width: getCardWidth(index),
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            onMouseEnter={() => setExpandedIndex(index)}
            onFocus={() => setExpandedIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
            role="button"
            aria-pressed={expandedIndex === index}
            aria-label={`View ${project.title}`}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={project.image || "/placeholder.svg?height=400&width=600&query=project"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Collapsed state - vertical title */}
            <AnimatePresence>
              {expandedIndex !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span
                    className="text-white text-sm font-medium whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {project.title
                      .replace(/[🔍🎬]/gu, "")
                      .trim()
                      .slice(0, 20)}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded state - full content */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute inset-0 flex flex-col justify-end p-6"
                >
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-full border border-neutral-600 backdrop-blur-sm">
                      {project.category === "ai" ? "AI/ML" : "Web"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {project.title.replace(/[🔍🎬]/gu, "").trim()}
                    </h3>
                    <p className="text-neutral-300 text-sm line-clamp-2">{project.description}</p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-neutral-800/60 text-neutral-400 rounded-md border border-neutral-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-neutral-800/60 text-neutral-400 rounded-md border border-neutral-700">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveDemo, "_blank")
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-100 text-neutral-900 rounded-lg hover:bg-white transition-colors"
                      >
                        <Zap className="h-3.5 w-3.5" />
                        Demo
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.github, "_blank")
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 border border-neutral-600 transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-400/10 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet view - stacked cards */}
      <div className="lg:hidden space-y-4 px-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-700"
          >
            {/* Image */}
            <div className="relative h-48">
              <img
                src={project.image || "/placeholder.svg?height=200&width=400&query=project"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
              <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-full border border-neutral-600">
                {project.category === "ai" ? "AI/ML" : "Web"}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-bold text-white">{project.title.replace(/[🔍🎬]/gu, "").trim()}</h3>
              <p className="text-neutral-400 text-sm">{project.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-neutral-800 text-neutral-400 rounded-md border border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => window.open(project.liveDemo, "_blank")}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-100 text-neutral-900 rounded-lg"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Demo
                </button>
                <button
                  onClick={() => window.open(project.github, "_blank")}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-neutral-800 text-neutral-200 rounded-lg border border-neutral-600"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
