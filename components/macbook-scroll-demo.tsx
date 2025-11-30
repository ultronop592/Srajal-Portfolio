"use client"
import { MacbookScroll } from "@/components/ui/macbook-scroll"

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-black">
      <MacbookScroll
        title={
          <span className="text-white">
            Explore My{" "}
            <span className="bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">Portfolio</span>
            <br />
            <span className="text-lg font-normal text-neutral-500">Built with Modern AI/ML Technologies</span>
          </span>
        }
        badge={
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white font-bold text-sm border border-neutral-600 shadow-lg">
            ST
          </div>
        }
        src="/tech-stack.jpg"
        showGradient={false}
      />
    </div>
  )
}
