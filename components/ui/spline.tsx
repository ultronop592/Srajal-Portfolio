'use client'

import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
        <Spline 
          scene={scene} 
          className={className}
          onLoad={() => console.log('[v0] Spline scene loaded successfully')}
          onError={(error) => console.error('[v0] Spline scene error:', error)}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
