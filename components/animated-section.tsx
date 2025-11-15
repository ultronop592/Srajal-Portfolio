"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps extends PropsWithChildren {
  className?: string
  delay?: number
}

export default function AnimatedSection({ className, delay = 0, children }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // smooth easing
      }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  )
}
