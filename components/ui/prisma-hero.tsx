"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/spline";

/* ---------------- WordsPullUp ---------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-emerald-400">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export interface Segment {
  text: string;
  className?: string;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export interface NavItemObject {
  label: string;
  href: string;
}

export interface PrismaHeroProps {
  title?: string;
  showAsterisk?: boolean;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  onDownloadResume?: () => void;
  videoSrc?: string;
  navItems?: (string | NavItemObject)[];
  showNav?: boolean;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItemObject[] = [
  { label: "About", href: "#about-me" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "AI Agent", href: "#agent-sandbox" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_SUBTITLE =
  "4th-year B.Tech Computer Science & AI student at BBDU (CGPA 8.4). Ex-Amazon ML Summer School 2026 scholar & Kalpathon 2.0 Hackathon 2nd place winner. Specializing in autonomous multi-agent systems (LangGraph, MCP), SLM fine-tuning (PEFT/LoRA), and enterprise hybrid RAG. Actively seeking full-time AI/ML engineering roles.";

const PrismaHero = ({
  title = "Srajal Tiwari",
  showAsterisk = true,
  subtitle = DEFAULT_SUBTITLE,
  ctaText = "Explore Projects",
  ctaHref = "#projects",
  onCtaClick,
  onDownloadResume,
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  navItems = DEFAULT_NAV_ITEMS,
  showNav = true,
  className = "",
}: PrismaHeroProps) => {
  const [backdropMode, setBackdropMode] = useState<"video" | "robot">("video");
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const normalizedNavItems: NavItemObject[] = navItems.map((item) =>
    typeof item === "string" ? { label: item, href: `#${item.toLowerCase().replace(/\s+/g, "-")}` } : item
  );

  return (
    <section ref={sectionRef} className={`min-h-screen w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8 flex items-center justify-center ${className}`}>
      <div className="relative h-[92vh] sm:h-[94vh] w-full overflow-hidden rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-emerald-500/20 shadow-[0_20px_70px_rgba(0,0,0,0.8)] bg-neutral-950">
        
        {/* Background: Video or 3D Robot Scene */}
        {backdropMode === "robot" ? (
          <div className="absolute inset-0 h-full w-full z-0">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            src={videoSrc}
          />
        )}

        {/* 3D Robot Toggle Switch */}
        <div className="absolute right-4 top-4 z-30">
          <button
            type="button"
            onClick={() => setBackdropMode((m) => (m === "video" ? "robot" : "video"))}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black/95 border border-emerald-500/30 hover:border-emerald-400 text-xs font-mono text-emerald-400 backdrop-blur-xl transition-all shadow-lg cursor-pointer"
            title="Toggle between Video and 3D Robot animation"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{backdropMode === "robot" ? "Switch to Video" : "3D Robot Mode"}</span>
          </button>
        </div>

        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.12'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Cyber gradient overlay with emerald ambient tint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />

        {/* Minimal Hero Top Capsule Nav */}
        {showNav && (
          <nav className="absolute left-1/2 top-4 z-20 -translate-x-1/2">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 px-4 py-2 shadow-lg">
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-wider pl-1 pr-2 border-r border-white/10">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE
              </span>
              {normalizedNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[11px] sm:text-xs md:text-sm font-medium transition-colors text-white/70 hover:text-emerald-400"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-12 z-20">
          <div className="grid grid-cols-12 items-end gap-6">
            
            {/* Left Column: Big Kinetic Wordmark & Credential Badges */}
            <div className="col-span-12 lg:col-span-8 select-none">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>BBDU CSE (AI) '27 · CGPA 8.3</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono backdrop-blur-md">
                  <span>AMAZON ML SCHOLAR '26</span>
                </div>
              </div>
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[8.5vw] drop-shadow-2xl"
                style={{ color: "#E1E0CC", fontFamily: "Syne, sans-serif" }}
              >
                <WordsPullUp text={title} showAsterisk={showAsterisk} />
              </h1>
              
              {/* Core Focus Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] sm:text-xs font-mono text-neutral-300">
                <span className="px-2.5 py-1 rounded-md bg-black/60 border border-emerald-500/25 text-emerald-300">
                  Agentic AI & LLMs
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 border border-emerald-500/25 text-emerald-300">
                  RAG Architectures
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-neutral-300">
                  FastAPI & Python
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 border border-white/10 text-neutral-300">
                  Next.js 15 & React 19
                </span>
              </div>
            </div>

            {/* Right Column: Bio + Action CTAs */}
            <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-4">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-[15px] text-neutral-300 font-light leading-relaxed max-w-lg"
                style={{ lineHeight: 1.55 }}
              >
                {subtitle}
              </motion.p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href={ctaHref}
                  onClick={onCtaClick}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-neutral-950 transition-all hover:gap-3 sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.35)] cursor-pointer"
                >
                  {ctaText}
                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-neutral-950 transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </motion.a>

                {onDownloadResume && (
                  <motion.button
                    onClick={onDownloadResume}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 hover:bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all backdrop-blur-md hover:border-emerald-400/50"
                  >
                    <Download className="h-4 w-4 text-emerald-400" />
                    <span>Resume</span>
                  </motion.button>
                )}

                {/* Social Quick Links */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 ml-auto sm:ml-0"
                >
                  <a
                    href="https://github.com/ultronop592"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-emerald-400 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/srajal-tiwari-7229172b9"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-emerald-400 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export { PrismaHero };
export default PrismaHero;
