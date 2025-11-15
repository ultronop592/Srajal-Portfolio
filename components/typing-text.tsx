"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseBetween?: number
  className?: string
}

export default function TypingText({
  words,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseBetween = 1200,
  className,
}: TypingTextProps) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[index % words.length]

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseBetween)
      return () => clearTimeout(t)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const timeout = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed,
    )
    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseBetween])

  const current = words[index % words.length]
  const shown = current.slice(0, subIndex)

  return (
    <span className={className}>
      {shown}
      <span className="inline-block w-[1ch] -mb-[2px] animate-pulse">|</span>
    </span>
  )
}
