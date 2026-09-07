"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Code, Layers, Cpu, Wrench, Sparkles, ExternalLink } from "lucide-react"
import Link from "next/link"
import { BentoCard } from "./bento-grid"

interface SkillCategory {
  id: string
  name: string
  tagline: string
  Icon: React.ComponentType<{ className?: string }>
  description: string
  items: string[]
  href?: string
  cta?: string
}

interface SkillsInteractiveSectionProps {
  categories: SkillCategory[]
  showViewAllLink?: boolean
}

export const SkillsInteractiveSection: React.FC<SkillsInteractiveSectionProps> = ({
  categories,
  showViewAllLink = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Filter categories and their skills
  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
        // Check category selection
        if (selectedCategory !== "all" && cat.id !== selectedCategory) {
          return null
        }

        const query = searchQuery.toLowerCase().trim()
        if (!query) return cat

        // Filter individual items within the category
        const matchingItems = cat.items.filter((item) =>
          item.toLowerCase().includes(query)
        )
        const catMatches =
          cat.name.toLowerCase().includes(query) ||
          cat.tagline.toLowerCase().includes(query)

        if (catMatches || matchingItems.length > 0) {
          return {
            ...cat,
            items: matchingItems.length > 0 ? matchingItems : cat.items,
          }
        }
        return null
      })
      .filter((cat): cat is SkillCategory => cat !== null)
  }, [categories, selectedCategory, searchQuery])

  const totalSkillsCount = useMemo(() => {
    return categories.reduce((acc, curr) => acc + curr.items.length, 0)
  }, [categories])

  const filterTabs = [
    { id: "all", label: "All Skills", count: totalSkillsCount },
    ...categories.map((c) => ({
      id: c.id,
      label: c.name.split("&")[0].trim(),
      count: c.items.length,
    })),
  ]

  return (
    <div className="w-full space-y-8">
      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? "all" : cat.id)}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-emerald-500/15 border-emerald-500/40 shadow-sm"
                : "bg-neutral-900/40 border-white/[0.06] hover:border-white/20 hover:bg-neutral-900/60"
            }`}
          >
            <div className="flex items-center justify-between text-neutral-400 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                {cat.name.split("&")[0].trim()}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {cat.items.length}
              </span>
            </div>
            <div className="text-sm font-semibold text-neutral-200 truncate font-mono">
              {cat.items[0]}, {cat.items[1]}...
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "bg-neutral-900/60 text-neutral-400 border border-white/[0.06] hover:border-white/20 hover:text-neutral-200"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-emerald-500/30 text-emerald-200"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g., Python)..."
            className="w-full pl-9 pr-8 py-1.5 text-xs font-mono bg-neutral-900/60 border border-white/[0.08] focus:border-emerald-500/40 rounded-xl text-neutral-200 placeholder-neutral-400 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Clean Minimal Bento Cards */}
      {filteredCategories.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <BentoCard
                  name={cat.name}
                  tagline={cat.tagline}
                  Icon={cat.Icon}
                  description={cat.items.join(" • ")}
                  items={cat.items}
                  href={cat.href || "#skills"}
                  cta={cat.cta || "View Matrix"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-white/[0.06] bg-neutral-900/20 backdrop-blur-sm">
          <Sparkles className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h4 className="text-base font-medium text-neutral-300 font-mono">
            No matching skills found
          </h4>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Try a different search keyword or clear your category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
            }}
            className="mt-4 px-4 py-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Footer Navigation link to dedicated page */}
      {showViewAllLink && (
        <div className="pt-4 flex justify-center">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-emerald-400 bg-neutral-900/70 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 shadow-sm transition-all duration-300 group"
          >
            <span>Explore Complete Skills & Technology Matrix</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  )
}
