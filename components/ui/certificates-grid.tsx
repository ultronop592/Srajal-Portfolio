"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Award, ExternalLink, Filter } from "lucide-react"
import Link from "next/link"
import { CertificateCard } from "./certificate-card"

export interface Certificate {
  tempId: number
  testimonial: string
  by: string
  level: string
  link?: string
}

interface CertificatesGridProps {
  testimonials: Certificate[]
  showViewAllLink?: boolean
}

export const CertificatesGrid: React.FC<CertificatesGridProps> = ({
  testimonials,
  showViewAllLink = true,
}) => {
  const [selectedIssuer, setSelectedIssuer] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Available Issuers
  const issuers = useMemo(() => {
    const list = [
      { id: "all", label: "All Certifications" },
      { id: "anthropic", label: "Anthropic" },
      { id: "microsoft", label: "Microsoft" },
      { id: "aws", label: "AWS" },
      { id: "roadmap", label: "One Roadmap" },
      { id: "deloitte", label: "Deloitte" },
      { id: "hp", label: "HP LIFE" },
    ]
    return list
  }, [])

  // Filter logic
  const filteredCerts = useMemo(() => {
    return testimonials.filter((cert) => {
      const issuer = cert.by.split(" • ")[0].toLowerCase()
      const title = cert.testimonial.toLowerCase()
      const level = cert.level.toLowerCase()
      const query = searchQuery.toLowerCase().trim()

      const matchesIssuer =
        selectedIssuer === "all" ||
        (selectedIssuer === "anthropic" && issuer.includes("anthropic")) ||
        (selectedIssuer === "microsoft" && issuer.includes("microsoft")) ||
        (selectedIssuer === "aws" && issuer.includes("aws")) ||
        (selectedIssuer === "roadmap" && issuer.includes("roadmap")) ||
        (selectedIssuer === "deloitte" && issuer.includes("deloitte")) ||
        (selectedIssuer === "hp" && issuer.includes("hp"))

      const matchesQuery =
        !query ||
        title.includes(query) ||
        issuer.includes(query) ||
        level.includes(query)

      return matchesIssuer && matchesQuery
    })
  }, [testimonials, selectedIssuer, searchQuery])

  // Count helper
  const getIssuerCount = (id: string) => {
    if (id === "all") return testimonials.length
    return testimonials.filter((c) => {
      const iss = c.by.split(" • ")[0].toLowerCase()
      if (id === "anthropic") return iss.includes("anthropic")
      if (id === "microsoft") return iss.includes("microsoft")
      if (id === "aws") return iss.includes("aws")
      if (id === "roadmap") return iss.includes("roadmap")
      if (id === "deloitte") return iss.includes("deloitte")
      if (id === "hp") return iss.includes("hp")
      return false
    }).length
  }

  return (
    <div className="w-full space-y-8">
      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          {issuers.map((tab) => {
            const count = getIssuerCount(tab.id)
            const isActive = selectedIssuer === tab.id
            if (count === 0 && tab.id !== "all") return null

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIssuer(tab.id)}
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
                  {count}
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
            placeholder="Filter credentials..."
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

      {/* Grid of Minimal Certificate Cards */}
      {filteredCerts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.tempId}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <CertificateCard
                  title={cert.testimonial}
                  issuer={cert.by.split(" • ")[0]}
                  date={cert.by.split(" • ")[1] || ""}
                  level={cert.level}
                  link={cert.link}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center rounded-2xl border border-white/[0.06] bg-neutral-900/20 backdrop-blur-sm">
          <Award className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <h4 className="text-base font-medium text-neutral-300 font-mono">
            No matching credentials found
          </h4>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Try adjusting your search query or selected filter.
          </p>
          <button
            onClick={() => {
              setSelectedIssuer("all")
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
            href="/certificates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-emerald-400 bg-neutral-900/70 hover:bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 shadow-sm transition-all duration-300 group"
          >
            <span>Explore All {testimonials.length} Verified Certifications</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  )
}
