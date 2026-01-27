"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

// Project data
const PROJECTS = [
  {
    title: "Waterborne Disease Predictor",
    description: "Deep Learning Model",
    tech: "Bi-LSTM, NLP, TensorFlow",
    image: "/images/waterborne-disease-predictor.png",
    github: "https://github.com/ultronop592/WaterBrone-Diease-Prediction.git",
    demo: "https://waterbrone-diease-prediction-byble.streamlit.app/",
  },
  {
    title: "Fake News Classifier",
    description: "RNN-based Classification",
    tech: "Deep Learning, LSTM",
    image: "/fake-news-classifier.png",
    github: "https://github.com/ultronop592/FakeNews-Classifier-using-RNN.git",
    demo: "https://fakenews-classifier-using-rnn-6.onrender.com/",
  },
  {
    title: "Movie Recommender",
    description: "Content-based Recommendations",
    tech: "NLP, TF-IDF, Streamlit",
    image: "/movie-recommender.png",
    github: "https://github.com/ultronop592/Movie-Recommendation-System.git",
    demo: "https://movierecommendationssystem76.streamlit.app/",
  },
  {
    title: "Disease Prediction",
    description: "SVM & Logistic Regression",
    tech: "Machine Learning, Scikit-learn",
    image: "/multiple-diseases-prediction.png",
    github: "https://github.com/ultronop592/ML_PUBLIC_DIEASES_Syste-.git",
    demo: "https://mldieaseswebappbysrajal.streamlit.app/",
  },
  {
    title: "Esports Strategy Hub",
    description: "Visualization Platform",
    tech: "React, TypeScript, Tailwind",
    image: "/esports-strategy-hub.png",
    github: "https://github.com/ultronop592/esportsstrategyhub",
    demo: "https://ultronop592.github.io/esportsstrategyhub/",
  },
  {
    title: "Spam Email Detection",
    description: "Classification System",
    tech: "Scikit-learn, TF-IDF",
    image: "/spam-email-detection.png",
    github: "https://github.com/ultronop592/Spam-emails-Prediction-web-app.git",
    demo: "https://spamemailpredictionwebappbysrajal.streamlit.app/",
  },
  {
    title: "Loan Approval System",
    description: "Predictive Analytics",
    tech: "Pandas, SVM, Python",
    image: "/loan-approval-prediction.png",
    github: "https://github.com/ultronop592/Loan-Approval-Predictioon-System.git",
    demo: "https://loanapprovalpredictivesystembysrajal.streamlit.app/",
  },
  {
    title: "Portfolio Website",
    description: "Personal Showcase",
    tech: "Next.js, Framer Motion",
    image: "/placeholder-logo.png",
    github: "https://github.com/ultronop592/Srajal-Portfolio",
    demo: "/",
  },
];

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  project: (typeof PROJECTS)[0];
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 80;
const IMG_HEIGHT = 100;

function ProjectCard({
  src,
  index,
  total,
  project,
  target,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Image */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-xl bg-gradient-to-br from-slate-700 to-slate-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={src}
            alt={project.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-logo.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Back - Info */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-xl bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-3 border border-slate-700"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <p className="text-[7px] font-bold text-blue-400 uppercase tracking-widest mb-1">
              {project.title.split(" ")[0]}
            </p>
            <p className="text-[8px] font-medium text-slate-200 line-clamp-2 mb-2">
              {project.description}
            </p>
            <p className="text-[6px] text-slate-400 line-clamp-1 mb-3">
              {project.tech}
            </p>
            <div className="flex gap-2 justify-center mt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={10} className="text-slate-300" />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded bg-blue-900 hover:bg-blue-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={10} className="text-blue-300" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const TOTAL_IMAGES = PROJECTS.length;
const MAX_SCROLL = 3000;
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ExplorePage() {
  const [introPhase, setIntroPhase] = useState<"scatter" | "line" | "circle" | "bottom-strip">("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scatterPositions = useMemo(() => {
    return PROJECTS.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center perspective-1000 relative z-10">
        {/* Intro Text */}
        <div className="absolute top-32 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-sm font-semibold tracking-[0.15em] text-slate-400 uppercase"
          >
            Scroll to explore
          </motion.p>
        </div>

        {/* Arc Active Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[5%] z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Experience My Work
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
            A curated collection of AI/ML projects, data-driven applications, and web solutions
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="relative flex items-center justify-center w-full h-full">
          {PROJECTS.map((project, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 90;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              const circleRadius = Math.min(minDimension * 0.35, 350);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - (spreadAngle / 2);
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + (i * step) + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <ProjectCard
                key={i}
                src={project.image}
                index={i}
                total={TOTAL_IMAGES}
                project={project}
                target={target}
              />
            );
          })}
        </div>

        {/* Back Button */}
        <div className="absolute bottom-8 left-8 z-50">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-200 text-sm font-medium transition-all duration-300 hover:border-slate-600"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-16 text-center text-slate-400 text-xs pointer-events-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p>Scroll or drag to interact</p>
        </motion.div>
      </div>
    </div>
  );
}
