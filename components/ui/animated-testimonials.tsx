"use client"

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

type Testimonial = {
  quote: string
  name: string
  designation: string
  src: string
}

const TechImageSkeleton = () => (
  <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black">
    {/* Grid pattern background */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    />

    {/* Horizontal scanning line */}
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
      style={{ boxShadow: "0 0 20px 2px rgba(255,255,255,0.5)" }}
      animate={{
        top: ["-2px", "100%"],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />

    {/* Vertical scanning line */}
    <motion.div
      className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neutral-400 to-transparent"
      style={{ boxShadow: "0 0 15px 1px rgba(255,255,255,0.3)" }}
      animate={{
        left: ["-2px", "100%"],
      }}
      transition={{
        duration: 2.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        delay: 0.5,
      }}
    />

    {/* Glitch bars */}
    <motion.div
      className="absolute left-0 right-0 h-1 bg-white/10"
      animate={{
        top: ["20%", "80%", "40%", "60%", "20%"],
        opacity: [0, 0.5, 0, 0.3, 0],
        scaleX: [1, 0.5, 1, 0.7, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1.5,
      }}
    />
    <motion.div
      className="absolute left-0 right-0 h-2 bg-white/5"
      animate={{
        top: ["60%", "30%", "70%", "40%", "60%"],
        opacity: [0, 0.3, 0, 0.2, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
        delay: 0.3,
      }}
    />

    {/* Animated corner brackets */}
    <svg className="absolute inset-0 w-full h-full">
      {/* Top-left bracket */}
      <motion.path
        d="M 30 10 L 10 10 L 10 30"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {/* Top-right bracket */}
      <motion.path
        d="M calc(100% - 30px) 10 L calc(100% - 10px) 10 L calc(100% - 10px) 30"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ transform: "translateX(-10px)" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Bottom-left bracket */}
      <motion.path
        d="M 10 calc(100% - 30px) L 10 calc(100% - 10px) L 30 calc(100% - 10px)"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ transform: "translateY(-10px)" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      {/* Bottom-right bracket */}
      <motion.path
        d="M calc(100% - 10px) calc(100% - 30px) L calc(100% - 10px) calc(100% - 10px) L calc(100% - 30px) calc(100% - 10px)"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        style={{ transform: "translate(-10px, -10px)" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      />
    </svg>

    {/* Center tech loader */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="w-20 h-20 rounded-full border border-white/20"
          style={{
            borderTopColor: "rgba(255,255,255,0.8)",
            borderRightColor: "rgba(255,255,255,0.4)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Inner counter-rotating ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-white/10"
          style={{
            borderBottomColor: "rgba(255,255,255,0.6)",
            borderLeftColor: "rgba(255,255,255,0.3)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </div>
    </div>

    {/* Data stream effect on sides */}
    <div className="absolute left-2 top-0 bottom-0 w-4 overflow-hidden opacity-30">
      <motion.div
        className="text-[8px] font-mono text-white/60 whitespace-nowrap"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>{Math.random().toString(16).slice(2, 6)}</div>
        ))}
      </motion.div>
    </div>

    {/* Loading percentage */}
    <motion.div
      className="absolute bottom-4 left-0 right-0 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        className="text-xs font-mono text-white/50 tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        LOADING
      </motion.span>
      <motion.div className="flex justify-center gap-1 mt-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>

    {/* Subtle noise overlay */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
)

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
}) => {
  const [active, setActive] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const isActive = (index: number) => {
    return index === active
  }

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }, [])

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay])

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10
  }

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <AnimatePresence>
                    {!loadedImages.has(index) && (
                      <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <TechImageSkeleton />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loadedImages.has(index) ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full w-full"
                  >
                    <Image
                      src={testimonial.src || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-white">{testimonials[active].name}</h3>
            <p className="text-sm text-neutral-400">{testimonials[active].designation}</p>
            <motion.p className="text-lg text-neutral-300 mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center group/button hover:bg-neutral-700 transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center group/button hover:bg-neutral-700 transition-colors"
            >
              <IconArrowRight className="h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
