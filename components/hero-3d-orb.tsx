"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh } from "three"

function Orb() {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.4
    ref.current.rotation.x += delta * 0.15
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#1e40af"
        emissiveIntensity={0.9}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function Hero3DOrb() {
  return (
    <div className="pointer-events-none absolute right-4 top-4 hidden h-40 w-40 md:block lg:right-16 lg:top-10 lg:h-60 lg:w-60">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#60a5fa" />
        <Orb />
      </Canvas>
    </div>
  )
}
