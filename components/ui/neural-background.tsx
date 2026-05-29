'use client'

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles. 
   * Defaults to Emerald if not specified.
   */
  color?: string;
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer trails. Higher = shorter trails.
   * Default: 0.08
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 120 (Optimized for 60FPS O(N^2) constellation links)
   */
  particleCount?: number;
  /**
   * Speed multiplier. Default: 0.8
   */
  speed?: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = 0;
    this.vy = 0;
    this.age = 0;
    this.life = Math.random() * 250 + 150;
  }

  update(speed: number, mouse: { x: number; y: number }) {
    // Flow Field Math
    const angle = (Math.cos(this.x * 0.004) + Math.sin(this.y * 0.004)) * Math.PI;

    // Add force from flow field
    this.vx += Math.cos(angle) * 0.15 * speed;
    this.vy += Math.sin(angle) * 0.15 * speed;

    // Mouse Repulsion
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 130;

    if (distance < interactionRadius) {
      const force = (interactionRadius - distance) / interactionRadius;
      // Gently push away from the cursor
      this.vx -= dx * force * 0.03;
      this.vy -= dy * force * 0.03;
    }

    // Apply Velocity & Friction
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;

    // Aging
    this.age++;
    if (this.age > this.life) {
      this.reset();
    }

    // Wrap around screen
    if (this.x < 0) this.x = this.width;
    if (this.x > this.width) this.x = 0;
    if (this.y < 0) this.y = this.height;
    if (this.y > this.height) this.y = 0;
  }

  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.vx = 0;
    this.vy = 0;
    this.age = 0;
    this.life = Math.random() * 250 + 150;
  }

  draw(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color;
    const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
    context.globalAlpha = alpha * 0.5; // Soft glow particles
    context.beginPath();
    context.arc(this.x, this.y, 1.8, 0, Math.PI * 2);
    context.fill();
  }
}

export default function NeuralBackground({
  className,
  color = "#10b981", // Emerald green
  trailOpacity = 0.08, // Premium longer trails
  particleCount = 120, // Constellation-safe particle count
  speed = 0.8,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      // Semi-transparent fill to achieve high-fidelity glowing paths
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = `rgba(10, 9, 8, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      // 1. Update and Draw Particles
      particles.forEach((p) => {
        p.update(speed, mouse);
        p.draw(ctx, color);
      });

      // 2. Draw Constellation Link Lines (Optimized O(N^2) links)
      ctx.globalAlpha = 1.0;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connections between close nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 75) * 0.15;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`; // Soft Emerald Links
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw cursor connection web
        if (mouse.x !== -1000) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const mDist = Math.sqrt(dx * dx + dy * dy);

          if (mDist < 120) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p1.x, p1.y);
            const mAlpha = (1 - mDist / 120) * 0.35; // Cursor nodes are brighter!
            ctx.strokeStyle = `rgba(52, 211, 153, ${mAlpha})`; // Glowing Emerald Threads
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full bg-[#0a0908] overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
