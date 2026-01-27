'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';
import ScrollMorphHero from '@/components/ui/scroll-morph-hero';

const PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered Waterborne Disease Predictor',
    description: 'Deep Learning model for medical report analysis',
    image: '/images/waterborne-disease-predictor.png',
    tech: ['Deep Learning', 'Bi-LSTM', 'NLP', 'Streamlit', 'TensorFlow'],
    longDescription: 'A sophisticated Bi-LSTM model that analyzes medical reports to predict waterborne diseases. This project showcases advanced NLP and sequence modeling skills with real-world medical applications.',
    github: 'https://github.com/ultronop592/WaterBrone-Diease-Prediction.git',
    demo: 'https://waterbrone-diease-prediction-byble.streamlit.app/',
    category: 'Machine Learning',
  },
  {
    id: 2,
    title: 'Fake News Classifier using RNN',
    description: 'Deep learning-based text classification system',
    image: '/images/fake-news-classifier.png',
    tech: ['RNN', 'LSTM', 'NLP', 'TensorFlow', 'Python'],
    longDescription: 'Built a sophisticated Fake News Classifier using Bidirectional LSTM networks for accurate text classification and misinformation detection.',
    github: 'https://github.com/ultronop592/FakeNews-Classifier-using-RNN.git',
    demo: '#',
    category: 'NLP',
  },
  {
    id: 3,
    title: 'Movie Recommender System',
    description: 'Content-based & collaborative filtering engine',
    image: '/images/movie-recommender.png',
    tech: ['Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn'],
    longDescription: 'Advanced recommendation engine using multiple algorithms to suggest movies based on user preferences and viewing patterns.',
    github: '#',
    demo: '#',
    category: 'Recommendation',
  },
  {
    id: 4,
    title: 'Multiple Diseases Prediction',
    description: 'ML models for disease diagnosis',
    image: '/images/multiple-diseases-prediction.png',
    tech: ['Machine Learning', 'Medical AI', 'Python', 'Scikit-learn'],
    longDescription: 'Comprehensive ML system predicting multiple diseases using patient health data with high accuracy.',
    github: '#',
    demo: '#',
    category: 'Healthcare',
  },
  {
    id: 5,
    title: 'Loan Approval Prediction',
    description: 'Classification model for loan decisions',
    image: '/images/loan-approval-prediction.png',
    tech: ['Classification', 'Feature Engineering', 'Python', 'Scikit-learn'],
    longDescription: 'Predictive model to determine loan approval probability based on applicant data and financial history.',
    github: '#',
    demo: '#',
    category: 'Finance',
  },
  {
    id: 6,
    title: 'Spam Email Detection',
    description: 'NLP-based spam classification',
    image: '/images/spam-email-detection.png',
    tech: ['NLP', 'Text Classification', 'Machine Learning', 'Python'],
    longDescription: 'Advanced spam detection system using natural language processing techniques for email security.',
    github: '#',
    demo: '#',
    category: 'Security',
  },
  {
    id: 7,
    title: 'eSports Strategy Hub',
    description: 'Data analytics platform for gaming',
    image: '/images/esports-strategy-hub.png',
    tech: ['Data Analytics', 'Visualization', 'Python', 'Streamlit'],
    longDescription: 'Analytics dashboard providing game strategies and team performance insights for competitive gaming.',
    github: '#',
    demo: '#',
    category: 'Analytics',
  },
  {
    id: 8,
    title: 'Advanced Data Analytics',
    description: 'Comprehensive data science solutions',
    image: '/placeholder.jpg',
    tech: ['Data Science', 'Analytics', 'Python', 'Pandas'],
    longDescription: 'Portfolio of data science and analytics projects with insights and visualizations.',
    github: '#',
    demo: '#',
    category: 'Data Science',
  },
];

function ProjectCard({ project, onClick }: { project: typeof PROJECTS[0]; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-cyan-500/10 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Image */}
        <div className="mb-4 overflow-hidden rounded-lg bg-slate-700 h-40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category badge */}
        <div className="mb-3 inline-block">
          <span className="px-2.5 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 group-hover:border-blue-400 transition-colors">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-400 mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded border border-slate-600/50 group-hover:border-blue-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-slate-400">+{project.tech.length - 3}</span>
          )}
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center gap-2 text-blue-400 group-hover:gap-3 transition-all opacity-0 group-hover:opacity-100">
          <span className="text-xs font-medium">View Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, isOpen, onClose }: { project: typeof PROJECTS[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-700/50 p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              ✕
            </button>

            {/* Project image */}
            <div className="mb-6 overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Category and title */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 mb-3">
                {project.category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-lg text-slate-400">{project.description}</p>
            </div>

            {/* Long description */}
            <p className="text-slate-300 mb-6 leading-relaxed">{project.longDescription}</p>

            {/* Tech stack */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-200 mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:border-blue-500 hover:text-blue-300 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-4 border-t border-slate-700">
              {project.github !== '#' && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium flex-1 justify-center"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              )}
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex-1 justify-center"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ExplorePage() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation hint */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-slate-950/80 to-transparent pt-4 pb-8 pointer-events-none">
        <div className="container mx-auto px-4 flex justify-between items-center pointer-events-auto">
          <a href="/" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            ← Back
          </a>
        </div>
      </div>

      {/* Hero Section with Scroll Morph */}
      <section className="pt-28 pb-20 px-4">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Explore My Work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-2xl mx-auto"
            >
              A collection of AI and machine learning projects showcasing expertise in deep learning, NLP, and data science
            </motion.p>
          </div>

          {/* Scroll Morph Animation */}
          <ScrollMorphHero
            images={PROJECTS.map((p) => p.image)}
            onImageClick={(index) => setSelectedProject(PROJECTS[index])}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 border-t border-slate-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '8+', label: 'Projects Completed' },
              { number: '5+', label: 'Technologies' },
              { number: '100%', label: 'Success Rate' },
              { number: 'AI/ML', label: 'Specialization' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
