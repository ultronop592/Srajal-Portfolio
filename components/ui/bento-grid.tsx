"use client"

import type React from "react"
import type { ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TiltCard3D } from "@/components/ui/tilt-card-3d"

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn("grid w-full auto-rows-[22rem] grid-cols-3 gap-4", className)}>{children}</div>
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string
  className?: string
  background?: ReactNode
  Icon: React.ComponentType<{ className?: string }>
  description: string
  href: string
  cta: string
}) => (
  <TiltCard3D tiltStrength={8} glareOpacity={0.08} className={cn("col-span-3 h-full", className)}>
    <div
      className={cn(
        "group relative h-full flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-neutral-900/90 backdrop-blur-md border border-white/10 shadow-xl",
        "transition-colors duration-300 hover:border-emerald-500/30"
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-8">
        <Icon className="h-10 w-10 origin-left transform-gpu text-emerald-400/80 transition-all duration-300 ease-in-out group-hover:scale-90" />
        <h3 className="text-xl font-semibold text-neutral-100">{name}</h3>
        <p className="max-w-lg text-neutral-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="pointer-events-auto text-emerald-400 hover:text-white hover:bg-emerald-500/10 border border-emerald-500/20"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/10" />
    </div>
  </TiltCard3D>
)

export { BentoCard, BentoGrid }
