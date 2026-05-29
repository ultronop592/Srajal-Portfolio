'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ExternalLink, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectSlide {
  title: string;
  description: string;
  details: string;
  github: string;
  liveDemo: string;
  tech: string[];
  category: string;
  image: string;
  metrics?: string[];
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

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

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
    const nextIndex = (currentIndex + 1) % projects.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide, projects.length]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide, projects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [goNext, goPrev]);

  useEffect(() => {
    if (isPaused || showModal) return;

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
  }, [currentIndex, isPaused, showModal, goNext]);

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

  const handleGithubClick = () => {
    window.open(currentSlide.github, "_blank", "noopener,noreferrer");
  };

  const handleLiveClick = () => {
    window.open(currentSlide.liveDemo, "_blank", "noopener,noreferrer");
  };

  // Reset index when projects filter changes to prevent out-of-bounds access
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [projects]);

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentSlide = projects[currentIndex];
  if (!currentSlide) {
    return null;
  }

  const accentColor = currentIndex % 3 === 0 ? '#A8AAAD' : currentIndex % 3 === 1 ? '#8BC9A9' : '#C4D7C8';

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${accentColor}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner">
        {/* Left: Text Content */}
        <div className="carousel-content">
          <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Category Badge */}
            <div
              className={`carousel-category ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ color: accentColor }}
            >
              {currentSlide.category.toUpperCase()}
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ color: accentColor }}
            >
              {currentSlide.description}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.details}
            </p>

            {currentSlide.metrics && currentSlide.metrics.length > 0 && (
              <div className={`carousel-metrics ${isTransitioning ? 'transitioning' : 'visible'}`}>
                {currentSlide.metrics.map((metric, idx) => (
                  <span key={idx} className="carousel-metric-pill" style={{ borderColor: accentColor }}>
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className={`carousel-tech-stack ${isTransitioning ? 'transitioning' : 'visible'}`}>
              {currentSlide.tech.slice(0, 4).map((tech, idx) => (
                <span key={idx} className="carousel-tech-badge" style={{ borderColor: accentColor }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={`carousel-actions ${isTransitioning ? 'transitioning' : 'visible'}`}>
              <button
                onClick={handleGithubClick}
                className="carousel-action-btn carousel-github-btn"
                style={{ borderColor: accentColor }}
              >
                <Github size={18} />
                <span>GitHub</span>
              </button>
              <button
                onClick={handleLiveClick}
                className="carousel-action-btn carousel-live-btn"
                style={{ 
                  borderColor: accentColor,
                  background: `${accentColor}15`
                }}
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="carousel-action-btn carousel-live-btn animate-pulse hover:animate-none"
                style={{ 
                  borderColor: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#34d399'
                }}
              >
                <BookOpen size={18} />
                <span>Case Study</span>
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="carousel-image-container">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="carousel-image"
              onError={(e) => {
                // Fallback to gradient if image fails
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";
              }}
            />
            <div
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${accentColor}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corner */}
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: accentColor }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: accentColor }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? accentColor : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{project.title}</span>
          </button>
        ))}
      </div>

      {/* Case Study Deep Dive Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-gray-800 bg-neutral-900 shadow-2xl p-6 md:p-8 flex flex-col gap-6 scrollbar-thin select-text"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                aria-label="Close Case Study"
              >
                <X size={20} />
              </button>

              {/* Title Header */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  {currentSlide.category} Case Study
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  {currentSlide.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mt-2 font-mono italic">
                  {currentSlide.description}
                </p>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2">
                {currentSlide.tech.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-neutral-950 border border-gray-800 text-[11px] font-mono text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <hr className="border-gray-800" />

              {/* System Flow Diagram Mockup */}
              <div className="bg-black/60 border border-emerald-500/10 rounded-xl p-4 font-mono text-xs select-none">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  System Architecture Pipeline
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-center text-gray-300 py-2">
                  {currentSlide.title === "UnLegalize" ? (
                    <>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">OCR Image Extract</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Clause Splitter</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded text-emerald-400">Gemma-3-LoRA</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Plain Eng & Risk Score</div>
                    </>
                  ) : currentSlide.title === "Multi Source Agentic RAG System" ? (
                    <>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">PDF Chunk Ingestion</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Qdrant Cloud vectors</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded text-emerald-400">Agent Router</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Gemini-2.5 streaming</div>
                    </>
                  ) : (
                    <>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Data Ingestion</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Feature Scaling</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded text-emerald-400">Tuned Classifier</div>
                      <span className="text-emerald-500 font-bold">➔</span>
                      <div className="px-2.5 py-1.5 bg-neutral-950 border border-gray-800 rounded">Predictions HUD</div>
                    </>
                  )}
                </div>
              </div>

              {/* Case Study Details Text */}
              <div className="space-y-4 font-sans text-sm text-gray-300 leading-relaxed max-h-[250px] overflow-y-auto pr-2 scrollbar-thin">
                <div>
                  <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-1.5 text-emerald-400">
                    ■ Project Overview
                  </h4>
                  <p>{currentSlide.details}</p>
                </div>

                <div>
                  <h4 className="text-white font-semibold font-mono text-xs uppercase tracking-wider mb-1.5 text-emerald-400">
                    ■ Technical Achievements & Challenges
                  </h4>
                  {currentSlide.title === "UnLegalize" ? (
                    <ul className="list-disc list-inside space-y-1.5 pl-1">
                      <li>Secured <strong>2nd Place</strong> out of numerous competing teams in the hackathon event.</li>
                      <li>Successfully fine-tuned Gemma 3 (270M) locally using PEFT and LoRA adapters.</li>
                      <li>Developed high-efficiency custom regex structures to segment large legal documents into standalone clauses.</li>
                      <li>Embedded local PDF and image OCR parser, removing latency and billing costs of standard APIs.</li>
                    </ul>
                  ) : currentSlide.title === "Multi Source Agentic RAG System" ? (
                    <ul className="list-disc list-inside space-y-1.5 pl-1">
                      <li>Configured hybrid retrieval combining BM25 keyword matching and dense vector retrieval.</li>
                      <li>Built custom routing rules to direct user inquiries dynamically to target Vector Collections.</li>
                      <li>Integrated full real-time streaming tokens on the Next.js frontend with robust error boundaries.</li>
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside space-y-1.5 pl-1">
                      <li>Designed robust pre-processing pipelines handling missing values and feature scales.</li>
                      <li>Optimized model performance through detailed hyperparameter tuning and cross-validation folds.</li>
                      <li>Configured real-time, interactive inputs using Streamlit or custom API backends.</li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Bottom Actions inside Modal */}
              <div className="mt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleGithubClick}
                  className="px-5 py-2.5 bg-neutral-950 border border-gray-800 hover:border-gray-500 rounded-lg text-white font-mono text-xs flex items-center gap-2 transition-all active:scale-98"
                >
                  <Github size={16} />
                  <span>GitHub Repository</span>
                </button>
                <button
                  onClick={handleLiveClick}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-mono text-xs flex items-center gap-2 transition-all active:scale-98 shadow-lg shadow-emerald-500/20"
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Demo</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
