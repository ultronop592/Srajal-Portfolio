"use client"

import { motion } from "framer-motion"
import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps extends PropsWithChildren {
  className?: string
  delay?: number
  id?: string
}

export default function AnimatedSection({ className, delay = 0, id, children }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        delay,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  )
}
