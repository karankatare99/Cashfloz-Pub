"use client"
import React, { useEffect, useRef } from "react"
import { animate } from "framer-motion"

export function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) {
        node.textContent = `${prefix}${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
      }
    })
    return () => controls.stop()
  }, [value, prefix, suffix, decimals])

  return <span ref={nodeRef}>{prefix}0{suffix}</span>
}

export function DonutChart() {
  return (
    <div className="relative w-40 h-40 mx-auto mt-6 rounded-full" style={{ background: "conic-gradient(#00FF88 0% 45%, #E8602C 45% 65%, #F7931A 65% 85%, rgba(255,255,255,0.1) 85% 100%)", boxShadow: "0 0 20px rgba(0,0,0,0.5) inset" }}>
      <div className="absolute inset-4 rounded-full bg-[#0A0A0F] flex items-center justify-center flex-col shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
        <span className="text-[#F5EDD6]/60 text-xs font-inter font-medium tracking-[0.04em] uppercase mb-1">Total Eq.</span>
        <span className="text-[#F5EDD6] font-jetbrains-mono tracking-tight font-medium text-lg">$104k</span>
      </div>
    </div>
  )
}

export function MiniSparkline({ up }: { up: boolean }) {
  const color = up ? "#00FF88" : "#E8602C"
  return (
    <svg width="100" height="40" viewBox="0 0 100 40" className="opacity-70">
      <path d={up ? "M0 30 Q10 20 20 25 T40 10 T60 15 T80 5 T100 0" : "M0 10 Q10 5 20 15 T40 25 T60 20 T80 35 T100 40"} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function BalanceSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-40 bg-white/[0.06] rounded-lg animate-pulse" />
      <div className="h-4 w-24 bg-white/[0.04] rounded-lg animate-pulse" />
    </div>
  )
}