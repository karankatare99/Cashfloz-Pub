"use client"
import React from "react"

export function Sparkline({ type }: { type: "up" | "down" }) {
  const color = type === "up" ? "#00FF88" : "#E8602C"
  const glow = type === "up" ? "drop-shadow-[0_0_8px_rgba(0,255,136,0.3)]" : "drop-shadow-[0_0_8px_rgba(232,96,44,0.3)]"
  const pathData = type === "up" 
    ? "M 0 20 Q 10 15 20 18 T 40 10 T 60 12 T 80 5 T 100 0" 
    : "M 0 0 Q 10 5 20 2 T 40 10 T 60 8 T 80 15 T 100 20"
    
  return (
    <svg width="60" height="20" viewBox="0 0 100 20" className={`opacity-90 ${glow}`}>
      <path d={pathData} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}