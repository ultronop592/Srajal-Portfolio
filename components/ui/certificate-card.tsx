"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  issuer: string
  date: string
  level: string
  link?: string
  index?: number
}

const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
  ({ className, title, issuer, date, level, link, index = 0, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }

    const borderVariants = {
      initial: { backgroundPosition: "200% 0" },
      animate: {
        backgroundPosition: "0% 0",
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    }

    const getLevelColor = (level: string) => {
      const levelMap: { [key: string]: string } = {
        Beginner: "from-blue-500/30 to-blue-500/10 border-blue-500/30",
        Intermediate: "from-purple-500/30 to-purple-500/10 border-purple-500/30",
        Advanced: "from-orange-500/30 to-orange-500/10 border-orange-500/30",
        Expert: "from-red-500/30 to-red-500/10 border-red-500/30",
        Professional: "from-cyan-500/30 to-cyan-500/10 border-cyan-500/30",
      }
      return levelMap[level] || "from-neutral-500/30 to-neutral-500/10 border-neutral-500/30"
    }

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        <motion.div
          className={cn(
            "group relative overflow-hidden rounded-xl border backdrop-blur-sm",
            "bg-gradient-to-br from-neutral-900/80 to-neutral-950/80",
            "hover:shadow-lg transition-all duration-300",
            "p-6 cursor-pointer",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{
            y: -4,
            boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(249, 115, 22, 0.1), transparent 80%)",
            }}
          />

          {/* Border Gradient Animation */}
          <motion.div
            className={cn(
              "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300",
              "pointer-events-none"
            )}
            variants={borderVariants}
            animate={isHovered ? "animate" : "initial"}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.5), transparent)",
              backgroundSize: "200% 100%",
            }}
          />

          {/* Gradient Top Border Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            {/* Level Badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
            >
              <span
                className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                  "bg-gradient-to-r border",
                  getLevelColor(level)
                )}
              >
                {level}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-lg md:text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.25, duration: 0.4 }}
            >
              {title}
            </motion.h3>

            {/* Issuer and Date */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <p className="text-sm text-orange-300 font-medium">{issuer}</p>
              <p className="text-xs text-neutral-400 font-mono">{date}</p>
            </motion.div>

            {/* Link Button */}
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium",
                  "text-neutral-300 hover:text-orange-300",
                  "transition-all duration-300",
                  "group/link"
                )}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.35, duration: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <span>View Certificate</span>
                <motion.div
                  animate={isHovered ? { x: 3 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
            )}
          </div>

          {/* Animated Corner Accent */}
          <motion.div
            className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    )
  }
)

CertificateCard.displayName = "CertificateCard"

export { CertificateCard }
