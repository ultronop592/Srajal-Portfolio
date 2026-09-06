'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ExternalLink, X, BookOpen, ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard3D } from '@/components/ui/tilt-card-3d';

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectSlide {
  title: string;
  description: string; // punchy subtitle
  details: string; // comprehensive details for modal deep dive
  brief?: string; // concise 1-2 sentence description for card
  tagline?: string; // domain track (e.g. "MULTI-AGENT WORKFORCE")
  github: string;
  liveDemo: string;
  tech: string[];
  category: string;
  image: string;
  metrics?: string[];
  specs?: ProjectSpec[];
  achievements?: string[];
  pipeline?: string[];
}

interface ElegantCarouselProps {
  projects: ProjectSlide[];
}

export default function ElegantCarousel({ projects }: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 7000;
  const TRANSITION_DURATION = 500;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    if (!projects || projects.length === 0) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide, projects]);

  const goPrev = useCallback(() => {
    if (!projects || projects.length === 0) return;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide, projects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showModal) {
        if (e.key === 'Escape') setShowModal(false);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, showModal]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || showModal || !projects || projects.length <= 1) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, showModal, goNext, projects]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Reset index if filtered array changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [projects]);

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full py-16 text-center border border-dashed border-gray-800 rounded-2xl bg-neutral-950/40">
        <p className="text-gray-400 font-mono text-sm">No projects match the selected filter.</p>
      </div>
    );
  }

  const currentSlide = projects[currentIndex] || projects[0];

  // Derive crisp endpoint mockup URL
  const demoUrl = currentSlide.liveDemo !== '#' ? currentSlide.liveDemo : currentSlide.github;
  let displayUrl = 'production-node';
  try {
    if (demoUrl && demoUrl.startsWith('http')) {
      const parsed = new URL(demoUrl);
      displayUrl = parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname.slice(0, 16) : '');
    }
  } catch {
    displayUrl = currentSlide.title.toLowerCase().replace(/[^a-z0-9]/g, '') + '.app';
  }

  // Fallback specs if not explicitly provided
  const specs = currentSlide.specs && currentSlide.specs.length > 0 ? currentSlide.specs : [
    { label: 'STACK', value: currentSlide.tech.slice(0, 2).join(' • ') },
    { label: 'CATEGORY', value: currentSlide.category.toUpperCase() },
    { label: 'STATUS', value: currentSlide.liveDemo !== '#' ? 'DEPLOYED' : 'OPEN SOURCE' },
  ];

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[85%] h-[75%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Main Showcase Card */}
      <div className="relative bg-neutral-950/90 backdrop-blur-2xl border border-emerald-500/20 hover:border-emerald-500/35 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 group overflow-hidden">
        {/* Subtle Cyber Corner Brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-500/30 group-hover:border-emerald-400 transition-all pointer-events-none" />

        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-800/80 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-emerald-400 font-bold tracking-wider">
              PROJECT // {String(currentIndex + 1).padStart(2, '0')} of {String(projects.length).padStart(2, '0')}
            </span>
            <span className="text-gray-600 font-mono text-xs">/</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {currentSlide.tagline ? currentSlide.tagline.toUpperCase() : 'AI ENGINEERING'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-gray-800 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
              {currentSlide.category}
            </span>
            {currentSlide.metrics && currentSlide.metrics[0] && (
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-400">
                {currentSlide.metrics[0]}
              </span>
            )}
          </div>
        </div>

        {/* Two-Column Grid: Content & Terminal Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Minimal High-Signal Info */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Title & One-Line Subtitle */}
            <div className="space-y-2">
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {currentSlide.title}
              </h3>
              <p className="text-sm sm:text-base font-mono text-emerald-400/90 font-medium">
                {currentSlide.description}
              </p>
            </div>

            {/* Concise Value Proposition (1-2 sentences max - NO TEXT WALL!) */}
            <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed font-sans">
              {currentSlide.brief || currentSlide.details.split('.')[0] + '.'}
            </p>

            {/* Architectural Specs HUD (3 Micro-Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-neutral-900/80 border border-emerald-500/15 hover:border-emerald-500/35 transition-colors group/spec"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-400/60 group-hover/spec:bg-emerald-400" />
                    {spec.label}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-gray-100 truncate">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentSlide.tech.slice(0, 5).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-gray-800 text-[11px] font-mono text-gray-300 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {currentSlide.tech.length > 5 && (
                <span className="px-2 py-1 rounded-lg bg-neutral-900/50 border border-gray-800/60 text-[10px] font-mono text-gray-400">
                  +{currentSlide.tech.length - 5}
                </span>
              )}
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {currentSlide.liveDemo && currentSlide.liveDemo !== '#' && (
                <a
                  href={currentSlide.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={16} />
                </a>
              )}

              {currentSlide.github && currentSlide.github !== '#' && (
                <a
                  href={currentSlide.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-gray-800 hover:border-emerald-500/30 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 active:scale-95"
                >
                  <Github size={16} />
                  <span>Repository</span>
                </a>
              )}

              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 active:scale-95 ml-auto sm:ml-0"
              >
                <BookOpen size={16} />
                <span>Architecture Specs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sleek Neural Terminal / Image Preview */}
          <div className="lg:col-span-5">
            <TiltCard3D tiltStrength={6} glareOpacity={0.08} className="w-full">
              <div className="relative rounded-xl border border-emerald-500/20 bg-neutral-950 overflow-hidden shadow-2xl group/preview">
                {/* Window Chrome Header */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-900/90 border-b border-gray-800/80 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>
                  <div className="font-mono text-[11px] text-gray-400 truncate max-w-[200px] sm:max-w-[240px]">
                    {displayUrl}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    200 OK
                  </div>
                </div>

                {/* Image Container with Fallback */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] group-hover/preview:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Overlay Button */}
                  {currentSlide.liveDemo && currentSlide.liveDemo !== '#' && (
                    <a
                      href={currentSlide.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-mono text-xs font-semibold"
                    >
                      <span className="px-4 py-2 rounded-lg bg-emerald-500 text-black flex items-center gap-1.5 shadow-lg">
                        Open Project <ExternalLink size={14} />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>

        {/* Bottom Carousel Controls & Slide Pills */}
        <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white border border-gray-800 hover:border-emerald-500/40 transition-all active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white border border-gray-800 hover:border-emerald-500/40 transition-all active:scale-95"
              aria-label="Next Project"
            >
              <ChevronRight size={18} />
            </button>
            <span className="text-[11px] font-mono text-gray-400 hidden sm:inline-block ml-2">
              Tip: Use ← → keys to switch
            </span>
          </div>

          {/* Slide Progress Pills */}
          <div className="flex items-center gap-1.5 max-w-full overflow-x-auto py-1 scrollbar-none">
            {projects.map((proj, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`group relative h-2.5 transition-all duration-300 rounded-full ${
                    isActive ? 'w-10 bg-emerald-500' : 'w-2.5 bg-gray-800 hover:bg-gray-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${proj.title}`}
                  title={proj.title}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 bg-emerald-300 rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Autoplay Pause/Play Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-gray-300 border border-gray-800 text-[11px] font-mono flex items-center gap-1.5 transition-all"
              title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {isPaused ? <Play size={12} className="text-emerald-400" /> : <Pause size={12} />}
              <span>{isPaused ? 'Paused' : 'Auto'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Case Study / Architecture Deep Dive Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-emerald-500/30 bg-neutral-950 shadow-2xl p-6 md:p-8 flex flex-col gap-6 scrollbar-thin select-text"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white border border-gray-800 transition-colors"
                aria-label="Close Case Study"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  {currentSlide.category} // ARCHITECTURE TEARDOWN
                </span>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mt-1"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {currentSlide.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mt-2 font-mono">
                  {currentSlide.description}
                </p>
              </div>

              {/* Architecture Pipeline Flow Mockup */}
              <div className="bg-black/60 border border-emerald-500/15 rounded-xl p-4 font-mono text-xs select-none">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  System Architecture Pipeline
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center text-gray-300 py-2">
                  {currentSlide.title.toLowerCase().includes('legal') ? (
                    <>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">OCR Extraction</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Clause Splitter</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">Gemma-3 LoRA</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Risk Scoring HUD</div>
                    </>
                  ) : currentSlide.title.toLowerCase().includes('rag') ? (
                    <>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">PDF Chunk Ingestion</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Qdrant Cloud Vectors</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">Agentic Router</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Gemini 2.5 Streaming</div>
                    </>
                  ) : currentSlide.title.toLowerCase().includes('forge') ? (
                    <>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">User Goal Specification</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">LangGraph Multi-Agent</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">MCP Tool Execution</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">SSE Real-Time Logs</div>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Data Preprocessing</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Feature Engineering</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-emerald-400 font-semibold">Model Inference</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-3 py-1.5 bg-neutral-950 border border-gray-800 rounded-lg">Prediction Output</div>
                    </>
                  )}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div>
                <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2.5 text-emerald-400">
                  ■ System Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {specs.map((spec, i) => (
                    <div key={i} className="p-3 rounded-lg bg-neutral-900 border border-gray-800">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">{spec.label}</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                  <div className="p-3 rounded-lg bg-neutral-900 border border-gray-800">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">CATEGORY</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{currentSlide.category.toUpperCase()}</div>
                  </div>
                </div>
              </div>

              {/* Deep-Dive Technical Narrative */}
              <div>
                <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400">
                  ■ Project Overview & Architecture
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {currentSlide.details}
                </p>
              </div>

              {/* Key Technical Highlights */}
              <div>
                <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-2 text-emerald-400">
                  ■ Key Engineering Highlights
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-sans pl-1">
                  {currentSlide.achievements && currentSlide.achievements.length > 0 ? (
                    currentSlide.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono mt-0.5">▸</span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono mt-0.5">▸</span>
                        <span>Architected end-to-end production pipeline with robust error boundaries and clean APIs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono mt-0.5">▸</span>
                        <span>Optimized memory footprint and query response latency for high-throughput inference.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-mono mt-0.5">▸</span>
                        <span>Deployed with continuous integration, responsive interface, and live operational monitoring.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Tech Badges in Modal */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentSlide.tech.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-gray-800 text-[11px] font-mono text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Modal Bottom Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-800 mt-2">
                {currentSlide.liveDemo && currentSlide.liveDemo !== '#' && (
                  <a
                    href={currentSlide.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {currentSlide.github && currentSlide.github !== '#' && (
                  <a
                    href={currentSlide.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-200 border border-gray-800 font-mono text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <Github size={16} />
                    <span>View Source Code</span>
                  </a>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gray-400 font-mono text-xs sm:text-sm ml-auto transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
