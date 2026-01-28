'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import { ScrollStackItem } from './scroll-stack';
import { Badge } from './badge';

interface ScrollStackProjectCardProps {
  title: string;
  description: string;
  details: string;
  image: string;
  tech: string[];
  github: string;
  liveDemo: string;
  category: 'ai' | 'web';
}

export const ScrollStackProjectCard: React.FC<ScrollStackProjectCardProps> = ({
  title,
  description,
  details,
  image,
  tech,
  github,
  liveDemo,
  category,
}) => {
  return (
    <ScrollStackItem itemClassName="bg-gradient-to-br from-neutral-900/80 via-neutral-950/60 to-black border border-neutral-800/50 hover:border-neutral-700/80 backdrop-blur-sm group overflow-hidden">
      <div className="h-full w-full flex flex-col gap-6">
        {/* Image Section */}
        <motion.div
          className="relative w-full h-48 rounded-2xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/20 to-transparent z-10" />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:saturate-150 transition-all duration-500"
          />
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <motion.h3
                className="text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-neutral-100 transition-colors"
                whileHover={{ x: 4 }}
              >
                {title}
              </motion.h3>
              <p className="text-neutral-400 text-sm">{description}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                category === 'ai'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}
            >
              {category.toUpperCase()}
            </div>
          </div>

          {/* Details */}
          <p className="text-neutral-300 text-sm leading-relaxed flex-1">{details}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <motion.div
                key={t}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Badge className="bg-neutral-800/60 text-neutral-300 border border-neutral-700/50 hover:border-neutral-600 transition-all cursor-default">
                  {t}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-auto pt-4 border-t border-neutral-800/50">
            <motion.a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg font-semibold transition-all duration-300 group/btn"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              Live Demo
            </motion.a>
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800/60 hover:bg-neutral-700 text-neutral-100 rounded-lg font-semibold transition-all duration-300 border border-neutral-700/50 hover:border-neutral-600 group/btn"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(100, 100, 100, 0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              Code
            </motion.a>
          </div>
        </div>
      </div>
    </ScrollStackItem>
  );
};

export default ScrollStackProjectCard;
