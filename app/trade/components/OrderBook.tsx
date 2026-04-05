"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { panelVariants } from "./animations"
import { generateOrderBookData } from "./data"

export function OrderBook() {
  const [bids, setBids] = useState<any[]>([])
  const [asks, setAsks] = useState<any[]>([])

  useEffect(() => {
    const { bids: b, asks: a } = generateOrderBookData()
    setBids(b)
    setAsks(a)
  }, [])

  return (
    <motion.div variants={panelVariants} className="flex flex-col h-full bg-[#0A0A0F] border-r border-white/[0.06] text-xs font-jetbrains-mono tracking-tight text-right w-[320px] shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="px-4 py-3 border-b border-white/[0.06] flex justify-between text-[#F5EDD6]/50 font-inter uppercase tracking-[0.04em] font-medium text-[11px]">
        <span>Size</span><span>Price (USD)</span>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col justify-end pt-2">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="relative flex justify-between px-4 py-1.5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
            <div className="absolute top-0 right-0 h-full bg-[#E8602C]/10 -z-10 transition-all duration-300" style={{ width: `${ask.depth}%` }}></div>
            <span className="text-[#F5EDD6]/60">{ask.size}</span>
            <span className="text-[#E8602C] font-medium">{ask.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="py-3 px-4 border-y border-white/[0.06] my-2 bg-white/[0.01] text-center flex items-center justify-center gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
        <span className="text-xl font-bold text-[#00FF88] tracking-tight">64,231.00</span>
        <span className="text-[#F5EDD6]/50 font-inter text-xs flex items-center gap-1 font-medium">
           <ArrowUpRight className="w-3 h-3 text-[#00FF88]"/> Spread: 0.50
        </span>
      </div>

      <div className="flex-1 overflow-hidden pb-2">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative flex justify-between px-4 py-1.5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
            <div className="absolute top-0 right-0 h-full bg-[#00FF88]/10 -z-10 transition-all duration-300" style={{ width: `${bid.depth}%` }}></div>
            <span className="text-[#F5EDD6]/60">{bid.size}</span>
            <span className="text-[#00FF88] font-medium">{bid.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-auto border-t border-white/[0.06] px-4 py-3 flex justify-between bg-white/[0.01] text-[11px] font-inter font-medium">
        <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors">Grouping: 0.5</span>
        <span className="text-[#F5EDD6]/40 flex gap-3">
           <span className="hover:text-[#F5EDD6] cursor-pointer transition-colors">0.01</span>
           <span className="text-[#E8602C] font-bold cursor-pointer">0.5</span>
           <span className="hover:text-[#F5EDD6] cursor-pointer transition-colors">1.0</span>
        </span>
      </div>
    </motion.div>
  )
}
