"use client"
import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function Hero3DCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="absolute inset-0 z-0 hidden lg:flex items-center justify-end pr-32 pointer-events-none perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[30rem] h-[20rem] rounded-2xl border border-gray-border/50 bg-navy-light/40 backdrop-blur-md shadow-2xl p-6 flex flex-col pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full w-full rounded-lg border border-gray-border overflow-hidden bg-navy relative" style={{ transform: "translateZ(50px)" }}>
          {}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#00FF88]/20 to-transparent flex items-end">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full stroke-accent fill-transparent stroke-2 opacity-80">
              <path d="M0 40 Q 10 30 20 20 T 40 35 T 60 10 T 80 25 T 100 5" />
            </svg>
          </div>
          <div className="absolute top-4 left-4" style={{ transform: "translateZ(80px)" }}>
            <div className="text-sm text-gray-light font-jetbrains-mono">BTC/USD</div>
            <div className="text-2xl font-bold text-white font-jetbrains-mono mt-1">64,231.50</div>
            <div className="text-sm text-[#00FF88]">+2.45%</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}