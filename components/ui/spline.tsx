'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-lg">
          <div className="space-y-2 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-700 border-t-neutral-300" />
            </div>
            <p className="text-sm text-neutral-400">Loading 3D scene...</p>
          </div>
          <p className="sr-only">3D scene is loading, please wait</p>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
