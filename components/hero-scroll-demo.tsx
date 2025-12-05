"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { motion } from "framer-motion"

const techStack = [
  {
    name: "Python",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <linearGradient id="python-a" x1="70.252%" x2="17.975%" y1="12.176%" y2="81.176%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a3a3a3" />
        </linearGradient>
        <linearGradient id="python-b" x1="30.141%" x2="81.693%" y1="18.476%" y2="87.562%">
          <stop offset="0%" stopColor="#a3a3a3" />
          <stop offset="100%" stopColor="#525252" />
        </linearGradient>
        <path
          fill="url(#python-a)"
          d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
        />
        <path
          fill="url(#python-b)"
          d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
        />
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path
          fill="#ffffff"
          d="M64.002 0L18.72 26.073v51.853l18.47 10.672V36.746l26.812-15.478 26.812 15.478v51.852l18.469-10.672V26.073z"
        />
        <path fill="#a3a3a3" d="M82.471 67.261l-18.47 10.672-18.47-10.672v21.344L64 99.277l18.471-10.672z" />
        <path
          fill="#737373"
          d="M45.532 99.277V77.933l18.47 10.672v42.687L18.72 104.219v-21.63l26.812 16.688zm36.939 0V77.933l-18.47 10.672v42.687l45.28-27.073v-21.63z"
        />
      </svg>
    ),
  },
  {
    name: "LangChain",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="64" cy="64" r="56" fill="none" stroke="#ffffff" strokeWidth="4" />
        <circle cx="64" cy="32" r="12" fill="#ffffff" />
        <circle cx="32" cy="88" r="12" fill="#a3a3a3" />
        <circle cx="96" cy="88" r="12" fill="#a3a3a3" />
        <path d="M64 44v20M52 76l12-12M76 76l-12-12" stroke="#737373" strokeWidth="4" strokeLinecap="round" />
        <circle cx="64" cy="64" r="8" fill="#525252" />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="64" cy="64" r="56" fill="#404040" />
        <ellipse cx="44" cy="54" rx="8" ry="10" fill="#ffffff" />
        <ellipse cx="84" cy="54" rx="8" ry="10" fill="#ffffff" />
        <circle cx="44" cy="54" r="4" fill="#1a1a1a" />
        <circle cx="84" cy="54" r="4" fill="#1a1a1a" />
        <path
          d="M40 80c0 0 12 20 24 20s24-20 24-20"
          stroke="#ffffff"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="36" cy="72" rx="4" ry="6" fill="#a3a3a3" />
        <ellipse cx="92" cy="72" rx="4" ry="6" fill="#a3a3a3" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path
          fill="#ffffff"
          d="M113.7 51.3c2.3-7 1.7-14.6-1.7-21.1-5.1-9.6-15.3-15.1-26-14.3-5-5.8-12.2-9.2-19.8-9.2-10.7 0-20.3 6-25 15.3-7.2.9-13.8 4.7-18 10.7-6 9.4-5.7 21.5.7 30.6-2.3 7-1.7 14.6 1.7 21.1 5.1 9.6 15.3 15.1 26 14.3 5 5.8 12.2 9.2 19.8 9.2 10.8 0 20.4-6.1 25.1-15.4 7.2-.9 13.8-4.7 18-10.7 6-9.4 5.7-21.4-.8-30.5zM71.6 107.7c-5.1 0-9.9-1.7-13.8-4.7l.7-.4 22.9-13.2c1.2-.7 1.9-1.9 1.9-3.3V56.6l9.7 5.6c.1.1.2.2.2.3v26.8c0 10.2-8.3 18.4-18.5 18.4h-3.1zm-40.4-16.9c-2.5-4.4-3.5-9.5-2.6-14.5l.7.4 22.9 13.2c1.2.7 2.6.7 3.7 0l28-16.2v11.2c0 .1-.1.3-.2.3l-23.2 13.4c-8.8 5.1-20.1 2.1-25.2-6.7l-4.1-1.1zm-5.2-42.7c2.6-4.4 6.6-7.8 11.5-9.4v27.2c0 1.4.7 2.6 1.9 3.3l27.9 16.1-9.7 5.6c-.1.1-.3.1-.4 0L34 77.5c-8.8-5.1-11.9-16.4-6.8-25.2l-1.2-4.2zM91 62.8l-28-16.2 9.7-5.6c.1-.1.3-.1.4 0l23.2 13.4c8.9 5.1 11.9 16.4 6.8 25.2 2.6 4.4 3.5 9.6 2.6 14.6l-.7-.4-22.9-13.2c-1.2-.7-1.9-1.9-1.9-3.3V62.8h10.8zm9.6-14.7l-.7-.4-22.9-13.2c-1.2-.7-2.6-.7-3.7 0l-28 16.2V39.5c0-.1.1-.3.2-.3l23.2-13.4c8.9-5.1 20.1-2.1 25.2 6.8 2.5 4.4 3.5 9.5 2.6 14.5l4.1 1zm-60.5 20l-9.7-5.6c-.1-.1-.2-.2-.2-.3V35.4c0-10.3 8.4-18.5 18.6-18.5 5.1 0 10 2.1 13.5 5.9l-.7.4-22.9 13.2c-1.2.7-1.9 1.9-1.9 3.3l3.3 29.4zm5.3-10.4l12.5-7.2 12.5 7.2v14.4l-12.5 7.2-12.5-7.2V57.7z"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path
          fill="#a3a3a3"
          d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.4-4.3 1.9-3 1-6.1 1.6-9.3 1.6H.3l-.1.8c-.4 6.8.5 13.6 2.8 20 2.6 6.8 6.7 12.2 12.1 15.8 6.2 4.1 16.3 6.5 27.9 6.5 24.3 0 44.6-9.5 58-28.1 8.2.1 16.9-1.9 21.8-9.1l1.1-1.6-1.7-1.1c-3.7-2.4-8.9-3.2-13.4-2.3z"
        />
        <path
          fill="#ffffff"
          d="M28 39h10v10H28zm-13 0h10v10H15zm26 0h10v10H41zm13 0h10v10H54zm0-13h10v10H54zm13 13h10v10H67zm-39 13h10v10H28zm13 0h10v10H41zm13 0h10v10H54z"
        />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path
          fill="#ffffff"
          d="M124.742 58.378L69.625 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.685 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.462 6.607 2.293 9.993L87.42 55.529c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.578 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.779 3.777 3.779 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00.004-11.501z"
        />
      </svg>
    ),
  },
  {
    name: "Colab",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path
          fill="#a3a3a3"
          d="M64 20c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44zm0 76c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
        />
        <path
          fill="#ffffff"
          d="M84 56H72V44c0-4.4-3.6-8-8-8s-8 3.6-8 8v12H44c-4.4 0-8 3.6-8 8s3.6 8 8 8h12v12c0 4.4 3.6 8 8 8s8-3.6 8-8V72h12c4.4 0 8-3.6 8-8s-3.6-8-8-8z"
        />
        <circle cx="64" cy="64" r="16" fill="#525252" />
      </svg>
    ),
  },
  {
    name: "NumPy",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path fill="#ffffff" d="M63.5 6L19 30.5v51l16 9.2V40.5l28.5-16.4L92 40.5v10.3l16-9.2v-11z" />
        <path fill="#a3a3a3" d="M109 81.5l-16-9.2v39.2l-28.5 16.4L36 111.5v-10.3l-16 9.2v11L64.5 122l44.5-24.5z" />
        <path fill="#737373" d="M36 58.5v42l28.5 16.4v-42zm56 0l-28.5 16.4v42L92 100.5z" />
        <path fill="#525252" d="M64.5 74.9L36 58.5l28.5-16.4L93 58.5z" />
      </svg>
    ),
  },
  {
    name: "Deep Learning",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="24" cy="32" r="10" fill="#a3a3a3" />
        <circle cx="24" cy="64" r="10" fill="#a3a3a3" />
        <circle cx="24" cy="96" r="10" fill="#a3a3a3" />
        <circle cx="64" cy="44" r="12" fill="#ffffff" />
        <circle cx="64" cy="84" r="12" fill="#ffffff" />
        <circle cx="104" cy="64" r="14" fill="#737373" />
        <path
          d="M34 32l20 12M34 64h20M34 96l20-12M76 44l18 20M76 84l18-20"
          stroke="#525252"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "NLP",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <rect x="16" y="24" width="96" height="72" rx="8" fill="none" stroke="#ffffff" strokeWidth="4" />
        <path d="M32 48h64M32 64h48M32 80h56" stroke="#a3a3a3" strokeWidth="4" strokeLinecap="round" />
        <circle cx="96" cy="80" r="8" fill="#737373" />
      </svg>
    ),
  },
  {
    name: "Transformers",
    icon: (
      <svg viewBox="0 0 128 128" className="w-16 h-16 md:w-20 md:h-20">
        <path d="M64 8v24M64 96v24M8 64h24M96 64h24" stroke="#a3a3a3" strokeWidth="6" strokeLinecap="round" />
        <circle cx="64" cy="64" r="32" fill="none" stroke="#ffffff" strokeWidth="4" />
        <circle cx="64" cy="64" r="16" fill="none" stroke="#737373" strokeWidth="4" />
        <circle cx="64" cy="64" r="6" fill="#ffffff" />
        <path d="M40 40l48 48M88 40l-48 48" stroke="#525252" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
]

const stats = [
  { label: "Projects", value: "5+", icon: "📁" },
  { label: "Certificates", value: "10+", icon: "📜" },
  { label: "Achievements", value: "5+", icon: "🏆" },
  { label: "Tech Stack", value: "12+", icon: "⚡" },
]

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent mb-4"
            >
              Explore My Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-400 text-xl md:text-2xl font-light tracking-wide"
            >
              AI & Machine Learning Engineer
            </motion.p>
          </div>
        }
      >
        <div className="h-full w-full bg-gradient-to-br from-black via-neutral-950 to-neutral-900 p-8 md:p-12 flex flex-col rounded-3xl border border-neutral-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="relative text-center p-4 md:p-6 bg-gradient-to-b from-neutral-800/60 to-neutral-900/80 rounded-2xl border border-neutral-700/40 hover:border-neutral-500/60 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <span className="text-2xl md:text-3xl mb-2 block">{stat.icon}</span>
                  <div className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-base lg:text-lg text-neutral-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-neutral-500 font-semibold mb-4 md:mb-6 uppercase tracking-widest"
            >
              Tech Stack
            </motion.h3>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.3, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.08,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80,
                    damping: 12,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateY: 10,
                    rotateX: -5,
                    z: 50,
                    transition: { duration: 0.3 },
                  }}
                  className="flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-br from-neutral-800/40 via-neutral-900/60 to-black/80 rounded-xl border border-neutral-700/30 hover:border-neutral-400/50 hover:bg-neutral-800/50 transition-all duration-300 cursor-pointer group"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div className="mb-2 group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.5)] transition-all duration-300 transform group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <span className="text-xs md:text-sm text-neutral-500 group-hover:text-white text-center font-semibold transition-colors duration-300 uppercase tracking-wide">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  )
}
