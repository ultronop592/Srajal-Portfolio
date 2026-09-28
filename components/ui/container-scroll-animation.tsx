"use client"
import React, { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, useSpring, motion, type MotionValue } from "framer-motion"
import { Sparkles, Terminal, Activity, ShieldCheck, Cpu } from "lucide-react"

/* ─────────────────────────────────────────────────────────
   ADVANCED 3D CONTAINER SCROLL ANIMATION
   • Sticky viewport tracking with physics-based spring dampening
   • Realistic titanium chamfered chassis with Dynamic Island
   • Dynamic specular glass glare that sweeps across on scroll
   • Multi-layer 3D holographic parallax floating chips
   • Interactive gyroscopic cursor tilt on desktop hover
   • High-intensity ambient bloom backlighting
───────────────────────────────────────────────────────── */

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Smooth spring physics for weighted mechanical feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.6,
  })

  // 3D rotation: Tilted back -> Completely flat -> Subtle lift
  const rotateXRaw = useTransform(smoothProgress, [0, 0.5, 0.9, 1], isMobile ? [14, 0, 0, -4] : [28, 0, 0, -6])
  const rotateX = useSpring(rotateXRaw, { stiffness: 100, damping: 20 })

  // Scale: Compact -> Full view -> Gentle exit
  const scaleRaw = useTransform(smoothProgress, [0, 0.45, 0.9, 1], isMobile ? [0.82, 1, 1, 0.96] : [0.86, 1.02, 1.02, 0.98])
  const scale = useSpring(scaleRaw, { stiffness: 100, damping: 20 })

  // Translation: Floats upward as it unfolds
  const translateYRaw = useTransform(smoothProgress, [0, 0.5, 0.9, 1], [60, 0, 0, -30])
  const translateY = useSpring(translateYRaw, { stiffness: 100, damping: 20 })

  // Specular light reflection glare position (-120% to 220%)
  const glareX = useTransform(smoothProgress, [0.1, 0.75], ["-120%", "220%"])

  // Ambient underglow bloom opacity & expansion
  const glowOpacity = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0.35, 0.85, 0.4])
  const glowScale = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0.85, 1.15, 0.9])

  // Parallax floating chips vertical shifts
  const chip1Y = useTransform(smoothProgress, [0, 1], [40, -60])
  const chip2Y = useTransform(smoothProgress, [0, 1], [70, -80])
  const chip3Y = useTransform(smoothProgress, [0, 1], [30, -50])
  const chip4Y = useTransform(smoothProgress, [0, 1], [60, -70])

  // Mouse tilt handlers for desktop 3D interactivity
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-[135vh] md:min-h-[160vh] flex flex-col justify-start"
    >
      {/* Sticky viewport frame: keeps the 3D tablet centered while scrolling */}
      <div className="sticky top-12 md:top-16 h-screen flex flex-col items-center justify-center overflow-visible px-2 sm:px-4 md:px-8 py-6">
        
        {/* Dynamic perspective wrapper */}
        <div
          className="w-full max-w-6xl relative flex flex-col items-center justify-center"
          style={{
            perspective: "1200px",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setMousePos({ x: 0, y: 0 })
          }}
        >
          {/* Ambient Cyber Light Bloom underneath the device */}
          <motion.div
            style={{
              opacity: glowOpacity,
              scale: glowScale,
            }}
            className="absolute -inset-8 md:-inset-16 rounded-[60px] bg-gradient-to-r from-emerald-500/25 via-cyan-500/20 to-emerald-600/25 blur-3xl pointer-events-none -z-10"
          />

          {/* Section Header */}
          <motion.div
            style={{
              translateY: useTransform(smoothProgress, [0, 0.4], [0, -15]),
              opacity: useTransform(smoothProgress, [0, 0.35, 0.9, 1], [1, 1, 0.8, 0.4]),
            }}
            className="w-full text-center mb-6 md:mb-10 z-20 pointer-events-none"
          >
            {titleComponent}
          </motion.div>

          {/* Floating Parallax Cyber Badges (Desktop Only) */}
          {!isMobile && (
            <>
              {/* Top-Left Chip: Vector Index */}
              <motion.div
                style={{ y: chip1Y }}
                className="hidden xl:flex absolute -left-12 top-24 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/90 border border-emerald-500/40 backdrop-blur-xl shadow-xl shadow-black/80 pointer-events-none"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider">
                  ⚡ 768d VECTOR INDEX
                </span>
              </motion.div>

              {/* Top-Right Chip: Multi-Agent Graph */}
              <motion.div
                style={{ y: chip2Y }}
                className="hidden xl:flex absolute -right-12 top-28 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-xl shadow-black/80 pointer-events-none"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-mono text-cyan-300 font-semibold tracking-wider">
                  🤖 7-STAGE LANGGRAPH
                </span>
              </motion.div>

              {/* Bottom-Left Chip: MCP Protocol */}
              <motion.div
                style={{ y: chip3Y }}
                className="hidden xl:flex absolute -left-10 bottom-24 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/90 border border-emerald-500/35 backdrop-blur-xl shadow-xl shadow-black/80 pointer-events-none"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider">
                  🛡️ ANTHROPIC MCP VERIFIED
                </span>
              </motion.div>

              {/* Bottom-Right Chip: Bedrock & FinOps */}
              <motion.div
                style={{ y: chip4Y }}
                className="hidden xl:flex absolute -right-10 bottom-20 z-30 items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/90 border border-amber-500/35 backdrop-blur-xl shadow-xl shadow-black/80 pointer-events-none"
              >
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono text-amber-300 font-semibold tracking-wider">
                  ☁️ AWS BEDROCK & FINOPS
                </span>
              </motion.div>
            </>
          )}

          {/* The 3D Hardware Tablet Enclosure */}
          <motion.div
            style={{
              rotateX,
              rotateY: isHovered && !isMobile ? mousePos.x * 6 : 0,
              scale,
              translateY,
              transformStyle: "preserve-3d",
              boxShadow:
                "0 20px 70px -10px rgba(0,0,0,0.9), 0 0 50px -10px rgba(16,185,129,0.25), 0 0 1px 1px rgba(255,255,255,0.1)",
            }}
            transition={{
              rotateY: { duration: 0.2, ease: "easeOut" },
            }}
            className="relative w-full max-w-5xl rounded-[28px] md:rounded-[38px] p-2 sm:p-3 md:p-4 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border border-neutral-700/80 shadow-2xl transition-shadow duration-500"
          >
            {/* Top Device Hardware Bezel: Dynamic Camera Notch & Sensor */}
            <div className="absolute top-2 md:top-3 inset-x-0 flex items-center justify-between px-6 md:px-8 z-30 pointer-events-none">
              <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400/80 tracking-widest hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AI_CORE // RUNTIME_V3.8</span>
              </div>

              {/* Dynamic Island Pill with Camera Eye */}
              <div className="mx-auto flex items-center gap-2 px-3 py-0.5 rounded-full bg-black/90 border border-neutral-700/50 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-neutral-900 border border-emerald-500/50 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400/80 tracking-widest hidden sm:flex">
                <span>FPS: 120</span>
                <span className="text-emerald-400 font-semibold">99.9% UPTIME</span>
              </div>
            </div>

            {/* Corner Decorative Hardware Screws / Brackets */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-neutral-600/40 bg-neutral-800/80 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-neutral-600/40 bg-neutral-800/80 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border border-neutral-600/40 bg-neutral-800/80 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-neutral-600/40 bg-neutral-800/80 pointer-events-none" />

            {/* Inner Glass Screen Display */}
            <div className="relative w-full overflow-hidden rounded-[22px] md:rounded-[30px] border border-emerald-500/20 bg-neutral-950 pt-7 sm:pt-8 md:pt-9 shadow-inner">
              
              {/* Dynamic Specular Light Sweep Glare */}
              <motion.div
                style={{
                  x: glareX,
                }}
                className="absolute inset-y-0 w-2/3 pointer-events-none z-20 opacity-40 mix-blend-screen"
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12" />
              </motion.div>

              {/* Screen Content Container */}
              <div className="relative z-10 w-full">
                {children}
              </div>

              {/* Bottom Subtle Grid Scanline Line */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-400/40 to-emerald-500/0 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026",
      }}
      className="max-w-5xl -mt-12 mx-auto w-full border-2 border-neutral-700 p-2 md:p-6 bg-neutral-900 rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-neutral-800 md:rounded-2xl md:p-4">{children}</div>
    </motion.div>
  )
}
