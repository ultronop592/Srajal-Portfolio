"use client"

import * as React from "react"
import { Github, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  title: string
  description: string
  github?: string
  liveDemo?: string
  tech?: string[]
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, github, liveDemo, tech = [], ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 text-white shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:border-neutral-700 hover:shadow-2xl hover:bg-neutral-900/80",
          className,
        )}
        {...props}
      >
        {/* Card Image Section */}
        <div className="relative aspect-video overflow-hidden bg-neutral-800">
          <img
            src={imgSrc || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
        </div>

        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold line-clamp-2 transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-neutral-400 line-clamp-2">{description}</p>

          {/* Tech Stack */}
          {tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="inline-block rounded-full bg-neutral-800/60 px-2.5 py-0.5 text-xs font-medium text-neutral-300 transition-colors group-hover:bg-neutral-700/80 group-hover:text-white"
                >
                  {t}
                </span>
              ))}
              {tech.length > 3 && <span className="inline-block text-xs text-neutral-500">+{tech.length - 3}</span>}
            </div>
          )}

          {/* Card Links/CTAs */}
          <div className="mt-4 flex items-center gap-3">
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex items-center gap-2 rounded-lg bg-sky-500/20 border border-sky-500/50 px-4 py-2.5 text-xs font-semibold text-sky-300 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-500/30 hover:border-sky-400 hover:text-sky-200 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Play className="h-4 w-4 transition-transform group-hover/button:scale-110" />
                Live Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/button inline-flex items-center gap-2 rounded-lg bg-sky-500/20 border border-sky-500/50 px-4 py-2.5 text-xs font-semibold text-sky-300 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-500/30 hover:border-sky-400 hover:text-sky-200 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4 transition-transform group-hover/button:scale-110" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    )
  },
)
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
export default ProjectCard
