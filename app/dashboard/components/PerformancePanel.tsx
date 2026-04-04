"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardTitle, CardContent } from "../../../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { staggerItem } from "./animations"

export function PerformancePanel() {
  const [filter, setFilter] = useState("1M")

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
            <path d="M0 200 L0 150 Q 100 100 200 130 T 400 80 T 600 30 L800 60 L1000 0 L1000 200 Z" fill="url(#pnlGrad)" />
            <path d="M0 150 Q 100 100 200 130 T 400 80 T 600 30 L800 60 L1000 0" fill="none" stroke="#00FF88" strokeWidth="2.5" />
          </svg>
        </CardContent>
      </Card>
    </motion.div>
  )
}