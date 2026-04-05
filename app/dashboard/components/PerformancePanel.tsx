"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardTitle, CardContent } from "../../../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { staggerItem } from "./animations"


const graphData: Record<string, string> = {
  "1W": "M0 180 Q 100 170 200 150 T 400 160 T 600 120 L 800 130 L 1000 90",
  "1M": "M0 150 Q 100 100 200 130 T 400 80 T 600 30 L 800 60 L 1000 0",
  "3M": "M0 170 Q 100 140 200 160 T 400 110 T 600 70 L 800 90 L 1000 40",
  "1Y": "M0 120 Q 100 150 200 140 T 400 90 T 600 110 L 800 50 L 1000 20",
  "ALL": "M0 190 Q 100 160 200 180 T 400 130 T 600 90 L 800 40 L 1000 10"
}

export function PerformancePanel() {
  const [filter, setFilter] = useState("1M")

  
  const strokePath = graphData[filter]
  
  const fillPath = `M0 200 L${strokePath.substring(1)} L1000 200 Z`

  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] h-96 flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <CardTitle className="font-space-grotesk text-3xl font-semibold tracking-[-0.02em]">Performance History</CardTitle>
          <Tabs value={filter} onValueChange={setFilter} className="bg-white/5 p-1 rounded-lg border border-white/10">
            <TabsList className="flex gap-1">
              {["1W", "1M", "3M", "1Y", "ALL"].map(i => (
                <TabsTrigger
                  key={i}
                  value={i}
                  className="text-xs font-inter font-medium px-3 py-1.5 rounded-md data-[state=active]:bg-white/10 data-[state=active]:text-[#F5EDD6] text-[#F5EDD6]/50 transition-colors"
                >
                  {i}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <CardContent className="flex-1 border-t border-white/[0.06] relative p-0 pt-6">
          <svg width="100%" height="100%" preserveAspectRatio="none" className="drop-shadow-[0_0_20px_rgba(0,255,136,0.15)]">
            <linearGradient id="pnlGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00FF88" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
            </linearGradient>
            
            {}
            <motion.path 
              animate={{ d: fillPath }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              fill="url(#pnlGrad)" 
            />
            
            {}
            <motion.path 
              animate={{ d: strokePath }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              fill="none" 
              stroke="#00FF88" 
              strokeWidth="2.5" 
            />
          </svg>
        </CardContent>
      </Card>
    </motion.div>
  )
}