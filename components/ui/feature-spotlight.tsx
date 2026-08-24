import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedFeatureSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  preheaderIcon?: React.ReactNode
  preheaderText: string
  heading: React.ReactNode
  description: React.ReactNode
  buttonText?: string
  buttonProps?: ButtonProps
  imageUrl: string
  imageAlt?: string
  imageHref?: string
  onImageClick?: () => void
}

const AnimatedFeatureSpotlight = React.forwardRef<HTMLElement, AnimatedFeatureSpotlightProps>(
  (
    {
      className,
      preheaderIcon,
      preheaderText,
      heading,
      description,
      buttonText,
      buttonProps,
      imageUrl,
      imageAlt = "Feature illustration",
      imageHref,
      onImageClick,
      ...props
    },
    ref
  ) => {
    const headingId = React.useId()

    return (
      <section
        ref={ref}
        className={cn(
          "w-full max-w-6xl mx-auto p-8 md:p-12 rounded-2xl bg-background border overflow-hidden",
          className
        )}
        aria-labelledby={headingId}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 text-center md:text-left items-center md:items-start">
            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-700">
              {preheaderIcon}
              <span>{preheaderText}</span>
            </div>
            <h2
              id={headingId}
              className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-top-4 duration-700 delay-150"
            >
              {heading}
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
              {description}
            </div>
            {buttonText ? (
              <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-400">
                <Button size="lg" {...buttonProps}>
                  {buttonText}
                </Button>
              </div>
            ) : null}
          </div>

          <div className="relative w-full min-h-[250px] md:min-h-[320px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 delay-200">
            {imageHref ? (
              <a
                href={imageHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group/spotlight-img block relative cursor-pointer overflow-hidden rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 shadow-xl"
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full max-w-md object-contain animate-float group-hover/spotlight-img:scale-[1.02] transition-transform duration-300 rounded-xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/spotlight-img:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                  <span className="px-3 py-1.5 bg-emerald-500 text-black text-xs font-mono font-bold rounded-md shadow-md">
                    View Document ↗
                  </span>
                </div>
              </a>
            ) : onImageClick ? (
              <button
                type="button"
                onClick={onImageClick}
                className="group/spotlight-img block relative cursor-pointer overflow-hidden rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full max-w-md object-contain animate-float group-hover/spotlight-img:scale-[1.02] transition-transform duration-300 rounded-xl"
                  loading="lazy"
                />
              </button>
            ) : (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full max-w-md object-contain animate-float"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </section>
    )
  }
)
AnimatedFeatureSpotlight.displayName = "AnimatedFeatureSpotlight"

export { AnimatedFeatureSpotlight }
