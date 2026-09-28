'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ExternalLink, BookOpen, ChevronLeft, ChevronRight, Play, Pause, ArrowUpRight } from 'lucide-react';
import { TiltCard3D } from '@/components/ui/tilt-card-3d';
import { ProjectDetailModal, type ProjectSlide, type ProjectSpec } from '@/components/ui/project-detail-modal';

export type { ProjectSlide, ProjectSpec };

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
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Safe boundary check: if active filter results in empty set or invalid index
  useEffect(() => {
    if (projects && currentIndex >= projects.length) {
      setCurrentIndex(0);
    }
  }, [projects, currentIndex]);

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full max-w-5xl mx-auto py-16 text-center border border-dashed border-gray-800 rounded-2xl">
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
            <span className="text-gray-600">|</span>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest hidden sm:inline-block">
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

            {/* Concise Value Proposition */}
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
                    className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.04] group-hover/preview:scale-105 transition-transform duration-700 ease-out"
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
      <ProjectDetailModal
        project={currentSlide}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
