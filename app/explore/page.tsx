"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { Badge } from "@/components/ui/badge";

const PROJECTS = [
  {
    title: "AI-Powered Waterborne Disease Predictor",
    description: "Deep Learning model for medical report analysis",
    image: "/images/waterborne-disease-predictor.png",
    tech: ["Deep Learning", "Bi-LSTM", "NLP", "Streamlit", "TensorFlow/Keras"],
    details: "A Bi-LSTM model that analyzes medical reports to predict waterborne diseases, showcasing advanced NLP and sequence modeling skills.",
    github: "https://github.com/ultronop592/WaterBrone-Diease-Prediction.git",
    demo: "https://waterbrone-diease-prediction-byble.streamlit.app/",
  },
  {
    title: "Fake News Classifier using RNN",
    description: "Deep learning-based text classification",
    image: "/images/fake-news-classifier.png",
    tech: ["RNN", "LSTM", "NLP", "TensorFlow", "Python"],
    details: "Built a Fake News Classifier using Bidirectional LSTM for accurate text classification.",
    github: "https://github.com/ultronop592/FakeNews-Classifier-using-RNN.git",
    demo: "#",
  },
  {
    title: "Movie Recommender System",
    description: "Content-based & collaborative filtering",
    image: "/images/movie-recommender.png",
    tech: ["Machine Learning", "Pandas", "NumPy", "Python", "Scikit-learn"],
    details: "Advanced recommendation engine using multiple algorithms to suggest movies based on user preferences.",
    github: "#",
    demo: "#",
  },
  {
    title: "Multiple Diseases Prediction",
    description: "ML models for disease diagnosis",
    image: "/images/multiple-diseases-prediction.png",
    tech: ["Machine Learning", "Medical AI", "Python", "Scikit-learn"],
    details: "Comprehensive ML system predicting multiple diseases using patient health data.",
    github: "#",
    demo: "#",
  },
  {
    title: "Loan Approval Prediction",
    description: "Classification model for loan decisions",
    image: "/images/loan-approval-prediction.png",
    tech: ["Classification", "Feature Engineering", "Python", "Scikit-learn"],
    details: "Predictive model to determine loan approval probability based on applicant data.",
    github: "#",
    demo: "#",
  },
  {
    title: "Spam Email Detection",
    description: "NLP-based spam classification",
    image: "/images/spam-email-detection.png",
    tech: ["NLP", "Text Classification", "Machine Learning", "Python"],
    details: "Advanced spam detection system using natural language processing techniques.",
    github: "#",
    demo: "#",
  },
  {
    title: "eSports Strategy Hub",
    description: "Data analytics platform for gaming",
    image: "/images/esports-strategy-hub.png",
    tech: ["Data Analytics", "Visualization", "Python", "Streamlit"],
    details: "Analytics dashboard providing game strategies and team performance insights.",
    github: "#",
    demo: "#",
  },
  {
    title: "Advanced Data Analytics",
    description: "Comprehensive data science solutions",
    image: "/placeholder.jpg",
    tech: ["Data Science", "Analytics", "Python", "Pandas"],
    details: "Portfolio of data science and analytics projects with insights and visualizations.",
    github: "#",
    demo: "#",
  },
];

function ProjectDetailModal({ project, isOpen, onClose, onNavigate }: {
  project: typeof PROJECTS[0] | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Image */}
              <div className="rounded-lg overflow-hidden h-64 bg-slate-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">About</h3>
                <p className="text-slate-300 leading-relaxed">{project.details}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4">
                {project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 border-t border-slate-700 bg-slate-900/50">
              <button
                onClick={() => onNavigate("prev")}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-slate-400 text-sm">Project Details</span>
              <button
                onClick={() => onNavigate("next")}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ExplorePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
    setAutoplayIndex(index);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    const newIndex = direction === "next"
      ? (selectedIndex + 1) % PROJECTS.length
      : (selectedIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedIndex(newIndex);
  };

  const projectImages = PROJECTS.map((p) => p.image);

  return (
    <div className="w-full">
      {/* Hero Section with Scroll Morph Animation */}
      <section className="h-screen w-full">
        <Suspense fallback={<div className="w-full h-screen bg-slate-950" />}>
          <ScrollMorphHero
            images={projectImages}
            onCardClick={handleCardClick}
          />
        </Suspense>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A comprehensive collection of AI/ML projects, deep learning models, and data-driven applications showcasing expertise in cutting-edge technologies.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCardClick(index)}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    crossOrigin="anonymous"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 px-4">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-300 mb-4">{project.description}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        View Details
                      </motion.button>
                    </motion.div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 2).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Projects", value: "8+" },
              { label: "Technologies", value: "20+" },
              { label: "Lines of Code", value: "10K+" },
              { label: "Accuracy Rate", value: "95%+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Let's build something amazing together. Get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/ultronop592"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              View on GitHub
            </a>
            <a
              href="mailto:your-email@example.com"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
            >
              Send an Email
            </a>
          </div>
        </motion.div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedIndex !== null ? PROJECTS[selectedIndex] : null}
        isOpen={selectedIndex !== null}
        onClose={() => {
          setSelectedIndex(null);
          setAutoplayIndex(null);
        }}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
