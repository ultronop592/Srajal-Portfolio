"use client"

import React, { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, HelpCircle, Activity } from "lucide-react"

// Types for Neural Network Layers
interface Neuron {
  weights: number[]
  bias: number
  activation: number
  dActivation: number // derivative
  delta: number
}

interface DatasetPoint {
  x: number // x coordinate normalized [-1, 1]
  y: number // y coordinate normalized [-1, 1]
  label: number // 0 or 1
}

export default function NeuralPlayground() {
  const [datasetType, setDatasetType] = useState<"circle" | "xor" | "linear">("circle")
  const [activation, setActivation] = useState<"sigmoid" | "tanh" | "relu">("sigmoid")
  const [learningRate, setLearningRate] = useState<number>(0.1)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [epoch, setEpoch] = useState<number>(0)
  const [loss, setLoss] = useState<number>(1.0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameIdRef = useRef<number | null>(null)
  const datasetRef = useRef<DatasetPoint[]>([])
  
  // Custom neural network model stored in React Refs to run continuously inside requestAnimationFrame without triggering standard re-renders
  const networkRef = useRef<{
    weightsH1: number[][] // hidden layer 1: 4 neurons, 2 inputs each
    biasesH1: number[]     // hidden layer 1 biases (4)
    weightsH2: number[][] // hidden layer 2: 4 neurons, 4 inputs each
    biasesH2: number[]     // hidden layer 2 biases (4)
    weightsOut: number[]  // output layer: 1 neuron, 4 inputs
    biasOut: number        // output layer bias
  }>({
    weightsH1: [],
    biasesH1: [],
    weightsH2: [],
    biasesH2: [],
    weightsOut: [],
    biasOut: 0,
  })

  // Mathematical Activation Functions
  const actFn = {
    sigmoid: (x: number) => 1 / (1 + Math.exp(-x)),
    dSigmoid: (y: number) => y * (1 - y), // inputs sigmoid value y
    tanh: (x: number) => Math.tanh(x),
    dTanh: (y: number) => 1 - y * y, // inputs tanh value y
    relu: (x: number) => Math.max(0, x),
    dRelu: (y: number) => (y > 0 ? 1 : 0), // inputs relu value y
  }

  // Generate datasets
  const generateDataset = (type: "circle" | "xor" | "linear") => {
    const points: DatasetPoint[] = []
    const count = 120

    if (type === "circle") {
      for (let i = 0; i < count; i++) {
        const r = Math.random()
        const angle = Math.random() * Math.PI * 2
        // Normalizing radius so class 0 is inner circle, class 1 is outer ring
        const isInner = Math.random() > 0.5
        const rad = isInner ? r * 0.45 : r * 0.45 + 0.55
        const x = Math.cos(angle) * rad
        const y = Math.sin(angle) * rad
        points.push({ x, y, label: isInner ? 0 : 1 })
      }
    } else if (type === "xor") {
      for (let i = 0; i < count; i++) {
        // Points distributed in 4 quadrants
        const x = Math.random() * 1.8 - 0.9
        const y = Math.random() * 1.8 - 0.9
        const label = x * y > 0 ? 1 : 0
        points.push({ x, y, label })
      }
    } else {
      for (let i = 0; i < count; i++) {
        const x = Math.random() * 1.8 - 0.9
        const y = Math.random() * 1.8 - 0.9
        // Separable by diagonal line
        const label = y > x + 0.1 ? 1 : 0
        points.push({ x, y, label })
      }
    }

    datasetRef.current = points
  }

  // Initialize weights randomly
  const initWeights = () => {
    const rand = () => Math.random() * 2 - 1 // values in range [-1, 1]

    networkRef.current = {
      weightsH1: Array.from({ length: 4 }, () => [rand(), rand()]),
      biasesH1: Array.from({ length: 4 }, () => rand()),
      weightsH2: Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => rand())),
      biasesH2: Array.from({ length: 4 }, () => rand()),
      weightsOut: Array.from({ length: 4 }, () => rand()),
      biasOut: rand(),
    }
    setEpoch(0)
    setLoss(1.0)
  }

  // Forward Pass
  const forwardPass = (x: number, y: number, currentAct: "sigmoid" | "tanh" | "relu") => {
    const net = networkRef.current
    const act = actFn[currentAct]

    // Layer 1
    const outH1 = net.weightsH1.map((wList, i) => {
      const z = wList[0] * x + wList[1] * y + net.biasesH1[i]
      return act(z)
    })

    // Layer 2
    const outH2 = net.weightsH2.map((wList, i) => {
      const sum = wList.reduce((acc, w, idx) => acc + w * outH1[idx], 0)
      const z = sum + net.biasesH2[i]
      return act(z)
    })

    // Output Layer
    const zOut = net.weightsOut.reduce((acc, w, idx) => acc + w * outH2[idx], 0) + net.biasOut
    // Output is always sigmoid (0 to 1 classification)
    const prediction = actFn.sigmoid(zOut)

    return { outH1, outH2, prediction }
  }

  // Backpropagation implementation
  const backpropEpoch = (currentAct: "sigmoid" | "tanh" | "relu", rate: number) => {
    const net = networkRef.current
    const dataset = datasetRef.current
    const act = actFn[currentAct]
    
    // Select correct derivative function
    const dAct = currentAct === "sigmoid" ? actFn.dSigmoid : currentAct === "tanh" ? actFn.dTanh : actFn.dRelu

    let totalSqrError = 0

    // Accumulated gradients
    const gradWeightsH1 = Array.from({ length: 4 }, () => [0, 0])
    const gradBiasesH1 = Array.from({ length: 4 }, () => 0)
    const gradWeightsH2 = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0))
    const gradBiasesH2 = Array.from({ length: 4 }, () => 0)
    const gradWeightsOut = Array.from({ length: 4 }, () => 0)
    let gradBiasOut = 0

    dataset.forEach((point) => {
      // 1. Forward Pass
      const { outH1, outH2, prediction } = forwardPass(point.x, point.y, currentAct)
      const error = prediction - point.label
      totalSqrError += error * error

      // 2. Output layer delta
      // Output uses sigmoid: dSigmoid is prediction * (1 - prediction)
      const deltaOut = error * actFn.dSigmoid(prediction)

      // Gradients for Output weights/bias
      for (let i = 0; i < 4; i++) {
        gradWeightsOut[i] += deltaOut * outH2[i]
      }
      gradBiasOut += deltaOut

      // 3. Hidden Layer 2 Deltas
      const deltasH2 = Array.from({ length: 4 }, (_, i) => {
        const sumOut = deltaOut * net.weightsOut[i]
        return sumOut * dAct(outH2[i])
      })

      // Gradients for Hidden Layer 2
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          gradWeightsH2[i][j] += deltasH2[i] * outH1[j]
        }
        gradBiasesH2[i] += deltasH2[i]
      }

      // 4. Hidden Layer 1 Deltas
      const deltasH1 = Array.from({ length: 4 }, (_, i) => {
        let sumNext = 0
        for (let j = 0; j < 4; j++) {
          sumNext += deltasH2[j] * net.weightsH2[j][i]
        }
        return sumNext * dAct(outH1[i])
      })

      // Gradients for Hidden Layer 1
      for (let i = 0; i < 4; i++) {
        gradWeightsH1[i][0] += deltasH1[i] * point.x
        gradWeightsH1[i][1] += deltasH1[i] * point.y
        gradBiasesH1[i] += deltasH1[i]
      }
    })

    const n = dataset.length

    // Update weights and biases using accumulated gradients
    for (let i = 0; i < 4; i++) {
      // Layer 1
      net.weightsH1[i][0] -= (rate * gradWeightsH1[i][0]) / n
      net.weightsH1[i][1] -= (rate * gradWeightsH1[i][1]) / n
      net.biasesH1[i] -= (rate * gradBiasesH1[i]) / n

      // Layer 2
      for (let j = 0; j < 4; j++) {
        net.weightsH2[i][j] -= (rate * gradWeightsH2[i][j]) / n
      }
      net.biasesH2[i] -= (rate * gradBiasesH2[i]) / n

      // Output layer
      net.weightsOut[i] -= (rate * gradWeightsOut[i]) / n
    }
    net.biasOut -= (rate * gradBiasOut) / n

    return totalSqrError / (2 * n)
  }

  // Dynamic Drawing Loop
  const drawModel = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // 1. Draw Decision Boundary Grid
    const gridSize = 45 // 45x45 grid for performance
    const cellW = width / gridSize
    const cellH = height / gridSize

    for (let gx = 0; gx < gridSize; gx++) {
      for (let gy = 0; gy < gridSize; gy++) {
        // Map grid index to coord system [-1.2, 1.2]
        const x = ((gx / gridSize) * 2.4 - 1.2)
        const y = ((gy / gridSize) * 2.4 - 1.2)

        const { prediction } = forwardPass(x, y, activation)

        // Color cell based on class probability (Sigmoid 0 to 1)
        // Green/emerald for 1, Grey/black for 0
        const opacity = Math.abs(prediction - 0.5) * 2.0 // depth of conviction
        let r, g, b
        if (prediction > 0.5) {
          // Emerald-like hue
          r = 16
          g = 185
          b = 129
        } else {
          // Gray/neutral hue
          r = 25
          g = 26
          b = 30
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.1 + opacity * 0.45})`
        ctx.fillRect(gx * cellW, gy * cellH, cellW + 0.5, cellH + 0.5)
      }
    }

    // 2. Draw axes lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()

    // 3. Draw Dataset Points
    datasetRef.current.forEach((point) => {
      // Map [-1.2, 1.2] to Canvas [0, width]
      const px = ((point.x + 1.2) / 2.4) * width
      const py = ((point.y + 1.2) / 2.4) * height

      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)

      if (point.label === 1) {
        // Class 1: Solid Emerald
        ctx.fillStyle = "#10b981"
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1.5
      } else {
        // Class 0: Grey/Slate Point
        ctx.fillStyle = "#374151"
        ctx.strokeStyle = "#9ca3af"
        ctx.lineWidth = 1.5
      }
      ctx.fill()
      ctx.stroke()
    })
  }

  // Animation Loop Controller
  useEffect(() => {
    if (isRunning) {
      const run = () => {
        // Perform 5 epochs of training per animation frame to speed up converging visualization
        let currentLoss = 0
        for (let step = 0; step < 6; step++) {
          currentLoss = backpropEpoch(activation, learningRate)
        }

        setLoss(currentLoss)
        setEpoch((prev) => prev + 6)

        drawModel()
        animFrameIdRef.current = requestAnimationFrame(run)
      }
      animFrameIdRef.current = requestAnimationFrame(run)
    } else {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [isRunning, activation, learningRate])

  // Initialize dataset & weights on mount or type change
  useEffect(() => {
    generateDataset(datasetType)
    initWeights()
    // Initial draw
    setTimeout(drawModel, 50)
  }, [datasetType])

  // Re-draw model if parameters like activation are tweaked while paused
  useEffect(() => {
    drawModel()
  }, [activation])

  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-900/60 border border-gray-700/60 hover:border-emerald-500/30 rounded-2xl p-6 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left column: Canvas Visualizer */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative rounded-xl overflow-hidden border border-emerald-500/10 bg-[#0a0a0c] shadow-inner w-full max-w-[420px] aspect-square">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              className="w-full h-auto block"
            />
            {/* Legend Overlay */}
            <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1.5 rounded border border-gray-800 text-[10px] font-mono text-gray-400 flex flex-col gap-1 select-none">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 border border-white" />
                <span>Class A (Signal Positive)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gray-700 border border-gray-400" />
                <span>Class B (Signal Negative)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Controls & Telemetry */}
        <div className="flex-1 flex flex-col justify-between py-1 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "Syne, sans-serif" }}>
                Neural Network Sandbox
              </h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-6 font-mono">
              Adjust configurations below, then click Train. You will see a feedforward network (2 input -> 4 hidden -> 4 hidden -> 1 output) executing backpropagation weights adjustments directly in your browser.
            </p>

            {/* Dashboard Telemetry HUD */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-black/40 border border-emerald-500/10 rounded-lg p-4 font-mono select-none">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Epoch Counter</div>
                <div className="text-xl font-bold text-emerald-400">{epoch}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Mean Sqr Error (Loss)</div>
                <div className="text-xl font-bold text-emerald-400">{loss.toFixed(6)}</div>
              </div>
            </div>

            {/* Inputs Panel */}
            <div className="space-y-4 font-mono">
              {/* Dataset Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-gray-400 uppercase tracking-wider">Select Spatial Dataset</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["circle", "xor", "linear"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setDatasetType(type)}
                      className={`py-2 rounded text-xs font-bold border capitalize transition-all ${
                        datasetType === type
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "bg-neutral-950 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activation selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-gray-400 uppercase tracking-wider">Activation Derivative</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["sigmoid", "tanh", "relu"] as const).map((func) => (
                    <button
                      key={func}
                      onClick={() => setActivation(func)}
                      className={`py-2 rounded text-xs font-bold border capitalize transition-all ${
                        activation === func
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                          : "bg-neutral-950 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300"
                      }`}
                    >
                      {func}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Rate Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-400 uppercase tracking-wider">Learning Rate (α)</span>
                  <span className="text-emerald-400 font-bold">{learningRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0.01}
                  max={0.5}
                  step={0.01}
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer bg-neutral-950 h-2 rounded border border-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Training Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-mono font-bold text-sm shadow-md transition-all active:scale-98 ${
                isRunning
                  ? "bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500/20"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" /> Pause Engine
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Train Model
                </>
              )}
            </button>

            <button
              onClick={() => {
                setIsRunning(false)
                initWeights()
                drawModel()
              }}
              className="px-4 py-3 bg-neutral-950 border border-gray-800 rounded-lg hover:border-gray-600 text-gray-400 hover:text-white transition-colors"
              title="Reset Weights"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
