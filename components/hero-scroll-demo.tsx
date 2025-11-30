"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { motion } from "framer-motion"

// Tech stack icons in black/grey/white
const techStack = [
  {
    name: "Python",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <path
          fill="#ffffff"
          d="M12 0C5.372 0 5.725 2.597 5.725 2.597v2.69h6.387V6H4.038S0 5.558 0 12.013c0 6.454 3.523 6.224 3.523 6.224h2.103v-2.994s-.113-3.523 3.467-3.523h5.973s3.354.054 3.354-3.247V3.247S18.82 0 12 0zm-3.32 1.88a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16z"
        />
        <path
          fill="#a3a3a3"
          d="M12 24c6.628 0 6.275-2.597 6.275-2.597v-2.69h-6.387V18h8.074s4.038.442 4.038-6.013c0-6.454-3.523-6.224-3.523-6.224h-2.103v2.994s.113 3.523-3.467 3.523H8.934s-3.354-.054-3.354 3.247v5.226S5.18 24 12 24zm3.32-1.88a1.08 1.08 0 1 1 0-2.16 1.08 1.08 0 0 1 0 2.16z"
        />
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <path fill="#ffffff" d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31z" />
        <path
          fill="#a3a3a3"
          d="M12.502 0l10.248 5.856-.015 5.311-6.152-3.566v6.09l-4.08 2.378V0zm6.08 14.422v4.756l-6.08 3.534v-4.734l6.08-3.556z"
        />
      </svg>
    ),
  },
  {
    name: "LangChain",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="12" cy="6" r="2" fill="#ffffff" />
        <circle cx="6" cy="15" r="2" fill="#a3a3a3" />
        <circle cx="18" cy="15" r="2" fill="#a3a3a3" />
        <path d="M12 8v4M8 14l4-2M16 14l-4-2" stroke="#737373" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <circle cx="12" cy="12" r="10" fill="#404040" />
        <circle cx="8" cy="10" r="1.5" fill="#ffffff" />
        <circle cx="16" cy="10" r="1.5" fill="#ffffff" />
        <path d="M8 15c0 0 2 3 4 3s4-3 4-3" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <path
          fill="#ffffff"
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
        />
      </svg>
    ),
  },
  {
    name: "NumPy",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <path fill="#a3a3a3" d="M10.315 4.876L6.3 2.854l-4.2 2.13 4.015 2.022z" />
        <path fill="#ffffff" d="M11.487 5.483l4.209 2.071-4.015 2.133-4.209-2.175z" />
        <path fill="#737373" d="M16.868 8.097l4.032-2.145-4.2-2.098-4.032 2.115z" />
        <path fill="#a3a3a3" d="M7.277 10.2v8.723l3.984-2.066V8.147z" />
        <path fill="#ffffff" d="M12.433 16.92l3.985 2.066V10.2l-3.985-2.053z" />
        <path fill="#525252" d="M12.2 9.753v4.072l1.997 1.004v-4.072z" />
      </svg>
    ),
  },
  {
    name: "Deep Learning",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <circle cx="4" cy="6" r="2" fill="#a3a3a3" />
        <circle cx="4" cy="12" r="2" fill="#a3a3a3" />
        <circle cx="4" cy="18" r="2" fill="#a3a3a3" />
        <circle cx="12" cy="8" r="2" fill="#ffffff" />
        <circle cx="12" cy="16" r="2" fill="#ffffff" />
        <circle cx="20" cy="12" r="2" fill="#a3a3a3" />
        <path d="M6 6l4 2M6 12h4M6 18l4-2M14 8l4 4M14 16l4-4" stroke="#525252" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "Machine Learning",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="#a3a3a3" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="#ffffff" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="#ffffff" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill="#a3a3a3" />
        <circle cx="12" cy="12" r="3" fill="#525252" />
      </svg>
    ),
  },
  {
    name: "NLP",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M4 4h16v12H5.17L4 17.17V4z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M7 8h10M7 11h6" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Transformers",
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#a3a3a3" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill="#ffffff" />
      </svg>
    ),
  },
]

// Stats data
const stats = [
  { label: "Projects", value: "5+" },
  { label: "Certificates", value: "10+" },
  { label: "Achievements", value: "5+" },
  { label: "Tech Stack", value: "10+" },
]

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Explore My Portfolio</h1>
            <p className="text-neutral-400 text-lg md:text-xl">AI & Machine Learning Engineer</p>
          </div>
        }
      >
        <div className="h-full w-full bg-gradient-to-br from-black via-neutral-900 to-black p-4 md:p-8 flex flex-col">
          {/* Stats Row - Bigger Size */}
          <div className="grid grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="text-center p-3 md:p-6 bg-gradient-to-b from-neutral-800/80 to-neutral-900/80 rounded-2xl border border-neutral-700/50 hover:border-neutral-500/50 transition-all duration-300"
              >
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm md:text-base lg:text-lg text-neutral-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Grid */}
          <div className="flex-1 grid grid-cols-5 gap-3 md:gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.15,
                  rotateY: 15,
                  z: 50,
                  transition: { duration: 0.3 },
                }}
                className="flex flex-col items-center justify-center p-3 md:p-4 bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 rounded-xl border border-neutral-700/40 hover:border-neutral-400/60 hover:bg-neutral-700/40 transition-all duration-300 cursor-pointer group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="mb-2 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">
                  {tech.icon}
                </div>
                <span className="text-[10px] md:text-xs lg:text-sm text-neutral-400 group-hover:text-white text-center font-medium transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </div>
  )
}
