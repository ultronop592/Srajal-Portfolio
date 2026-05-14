"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import type React from "react"
import { motion } from "framer-motion"

type ImageZoomProps = {
  children: React.ReactNode
}

const ImageZoom = ({ children }: ImageZoomProps) => {
  return <>{children}</>
}

interface HeroImageZoomProps {
  imageSrc: string
  name: string
  className?: string
}

const HeroImageZoom = ({ imageSrc, name, className }: HeroImageZoomProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto my-6 flex h-[360px] w-full max-w-[320px] flex-col items-start border border-orange-500/20 bg-black/40 p-5 md:h-[30rem] md:max-w-[420px]">
        <Plus strokeWidth={0.5} className="text-orange-300 absolute -left-4 -top-4 h-8 w-8" />
        <Plus strokeWidth={0.5} className="text-orange-300 absolute -bottom-4 -left-4 h-8 w-8" />
        <Plus strokeWidth={0.5} className="text-orange-300 absolute -right-4 -top-4 h-8 w-8" />
        <Plus strokeWidth={0.5} className="text-orange-300 absolute -bottom-4 -right-4 h-8 w-8" />
        <ImageZoom>
          <div>
            <div className="overflow-hidden rounded-md bg-black/40">
              <Image
                src={imageSrc}
                alt={name}
                height={700}
                width={700}
                className="h-[260px] w-full object-cover object-[50%_25%] md:h-[360px]"
                priority
              />
            </div>
            <div className="relative -mt-8 bg-gradient-to-b from-black/0 to-black text-white md:-mt-16">
              <h2 className="text-center text-[26px] font-mono font-normal tracking-[0.3em] uppercase md:text-[44px] whitespace-nowrap">
                {name}
              </h2>
            </div>
          </div>
        </ImageZoom>
      </div>
    </motion.div>
  )
}

export { HeroImageZoom, ImageZoom }
