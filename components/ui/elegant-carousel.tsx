'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, ExternalLink } from 'lucide-react';

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
    if (isPaused) return;

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
  }, [currentIndex, isPaused, goNext]);

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

  const currentSlide = projects[currentIndex];
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
    </div>
  );
}
