"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"

const buttonVariants = cva("relative group border text-foreground mx-auto text-center rounded-full", {
  variants: {
    variant: {
      default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
      solid:
        "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
      ghost:
        "border-neutral-500/50 bg-neutral-800/50 hover:border-neutral-400 hover:bg-neutral-700/50 text-neutral-200 hover:text-white",
    },
    size: {
      default: "px-7 py-1.5",
      sm: "px-4 py-0.5",
      lg: "px-10 py-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  neon?: boolean
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, children, ...props }, ref) => {
    const glowColor = variant === "ghost" ? "neutral-400" : "blue-500"

    return (
      <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
        {/* Top glow line */}
        <span
          className={cn(
            `absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-${glowColor} to-transparent hidden`,
            neon && "block",
            variant === "ghost" && "dark:via-neutral-400 via-neutral-300",
          )}
        />
        {children}
        {/* Bottom glow line */}
        <span
          className={cn(
            `absolute group-hover:opacity-50 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-${glowColor} to-transparent hidden`,
            neon && "block",
            variant === "ghost" && "dark:via-neutral-400 via-neutral-300 group-hover:opacity-70",
          )}
        />
      </button>
    )
  },
)

NeonButton.displayName = "NeonButton"

export { NeonButton, buttonVariants }
