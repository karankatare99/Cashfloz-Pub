"use client"
import React, { useState, useEffect, useRef } from "react"
import { animate } from "framer-motion"
import { Copy, Check } from "lucide-react"

export function AnimatedCounter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    const controls = animate(from, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
      onUpdate(value) {
        node.textContent = value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      },
    })
    return () => controls.stop()
  }, [from, to])

  return (
    <span ref={nodeRef} className="font-jetbrains-mono tracking-tight text-[#00FF88]">
      {from.toLocaleString("en-US", { style: "currency", currency: "USD" })}
    </span>
  )
}

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all text-[#F5EDD6]/60 hover:text-[#F5EDD6]"
    >
      {copied ? <Check className="w-4 h-4 text-[#00FF88]" /> : <Copy className="w-4 h-4" />}
    </button>
  )
}