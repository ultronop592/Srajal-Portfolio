"use client"

import { useEffect, useRef, useState } from "react"

export default function TechBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Neural network nodes
    const neurons: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      layer: number
    }> = []

    // Create 3 layers of neural network
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < 5; i++) {
        neurons.push({
          x: canvas.width / 4 + layer * 200 + (Math.random() - 0.5) * 50,
          y: canvas.height / 2 + (i - 2) * 100 + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 3 + Math.random() * 2,
          opacity: 0.5 + Math.random() * 0.5,
          layer,
        })
      }
    }

    // Robot nodes
    const robots: Array<{
      x: number
      y: number
      angle: number
      size: number
      opacity: number
    }> = [
      { x: 0.15 * canvas.width, y: 0.3 * canvas.height, angle: 0, size: 30, opacity: 0.4 },
      { x: 0.85 * canvas.width, y: 0.7 * canvas.height, angle: 0, size: 25, opacity: 0.35 },
    ]

    let animationId: number
    const time = { value: 0 }

    const drawRobot = (x: number, y: number, size: number, angle: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.globalAlpha = opacity

      // Body
      ctx.fillStyle = "rgba(0, 212, 255, 0.8)"
      ctx.fillRect(-size / 3, -size / 2, (size * 2) / 3, size)
      ctx.strokeStyle = "rgba(0, 212, 255, 1)"
      ctx.lineWidth = 1.5
      ctx.strokeRect(-size / 3, -size / 2, (size * 2) / 3, size)

      // Head
      ctx.beginPath()
      ctx.arc(0, -size / 2 - 10, size / 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(59, 130, 246, 0.9)"
      ctx.fill()
      ctx.strokeStyle = "rgba(59, 130, 246, 1)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Eyes
      ctx.fillStyle = "rgba(16, 185, 129, 1)"
      ctx.beginPath()
      ctx.arc(-size / 8, -size / 2 - 12, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(size / 8, -size / 2 - 12, 2, 0, Math.PI * 2)
      ctx.fill()

      // Arms
      ctx.strokeStyle = "rgba(0, 212, 255, 0.7)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(-size / 3, -size / 4)
      ctx.lineTo(-size, -size / 4 + Math.sin(time.value * 2) * 15)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(size / 3, -size / 4)
      ctx.lineTo(size, -size / 4 + Math.cos(time.value * 2) * 15)
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      // Clear with fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time.value += 0.016

      // Draw connecting lines between neurons
      ctx.strokeStyle = "rgba(0, 212, 255, 0.3)"
      ctx.lineWidth = 1
      for (let i = 0; i < neurons.length - 1; i++) {
        if (neurons[i].layer === Math.floor(neurons[i + 1].layer)) {
          const dx = neurons[i + 1].x - neurons[i].x
          const dy = neurons[i + 1].y - neurons[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.globalAlpha = 0.3 * (1 - dist / 150)
            ctx.beginPath()
            ctx.moveTo(neurons[i].x, neurons[i].y)
            ctx.lineTo(neurons[i + 1].x, neurons[i + 1].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw neurons
      neurons.forEach((neuron) => {
        neuron.x += neuron.vx
        neuron.y += neuron.vy

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1

        // Keep in bounds
        neuron.x = Math.max(0, Math.min(canvas.width, neuron.x))
        neuron.y = Math.max(0, Math.min(canvas.height, neuron.y))

        // Pulsing effect
        const pulse = Math.sin(time.value + neuron.layer) * 0.3 + 0.7
        ctx.globalAlpha = neuron.opacity * pulse
        ctx.fillStyle = `hsl(${180 + neuron.layer * 60}, 100%, 50%)`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.size, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.strokeStyle = `hsla(${180 + neuron.layer * 60}, 100%, 50%, 0.5)`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw and animate robots
      robots.forEach((robot) => {
        robot.angle += 0.02
        drawRobot(robot.x, robot.y, robot.size, robot.angle, robot.opacity)
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isClient])

  if (!isClient) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-60"
      style={{ background: "radial-gradient(ellipse at center, rgba(10, 10, 20, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%)" }}
    />
  )
}
