"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CertificateCard } from "./certificate-card"

interface Certificate {
  tempId: number
  testimonial: string
  by: string
  level: string
  link?: string
}

interface CertificatesGridProps {
  testimonials: Certificate[]
}

export const CertificatesGrid: React.FC<CertificatesGridProps> = ({ testimonials }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {testimonials.map((cert, index) => (
        <CertificateCard
          key={cert.tempId}
          title={cert.testimonial}
          issuer={cert.by.split(" • ")[0]}
          date={cert.by.split(" • ")[1] || ""}
          level={cert.level}
          link={cert.link}
          index={index}
        />
      ))}
    </motion.div>
  )
}
