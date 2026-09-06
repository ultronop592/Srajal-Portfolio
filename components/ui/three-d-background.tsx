"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function ThreeDBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    container.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x10b981, 1.2)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x34d399, 0.8)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    // Geometries Group
    const group = new THREE.Group()
    scene.add(group)

    // 1. Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.0, 1)
    const icoMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x10b981, transparent: true, opacity: 0.15 })
    const icoMesh = new THREE.Mesh(icoGeo, icoMat)
    icoMesh.position.set(-7, 4, -5)
    group.add(icoMesh)

    // 2. Wireframe Torus
    const torusGeo = new THREE.TorusGeometry(2.2, 0.5, 14, 36)
    const torusMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x34d399, transparent: true, opacity: 0.12 })
    const torusMesh = new THREE.Mesh(torusGeo, torusMat)
    torusMesh.position.set(8, -5, -7)
    group.add(torusMesh)

    // 3. Wireframe Octahedron
    const octaGeo = new THREE.OctahedronGeometry(1.8, 0)
    const octaMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x059669, transparent: true, opacity: 0.14 })
    const octaMesh = new THREE.Mesh(octaGeo, octaMat)
    octaMesh.position.set(7, 5, -8)
    group.add(octaMesh)

    // 4. Subtle Particle Star Field
    const count = 220
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32
      positions[i * 3 + 1] = (Math.random() - 0.5) * 32
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x34d399,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Smooth Mouse Reaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    // Animation Loop
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()

      group.rotation.y += delta * 0.04
      group.rotation.x += delta * 0.02

      icoMesh.rotation.x += delta * 0.2
      torusMesh.rotation.y += delta * 0.25
      octaMesh.rotation.z += delta * 0.15
      particles.rotation.y -= delta * 0.015

      // Mouse inertia tracking
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <div ref={mountRef} className="w-full h-full" />
      <div
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg) translateY(-100px)",
          transformOrigin: "top center",
        }}
      />
    </div>
  )
}
