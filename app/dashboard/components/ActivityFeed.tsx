"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { History, ArrowDownRight, TrendingUp, ArrowUpRight } from "lucide-react"
import { staggerItem } from "./animations"

export function ActivityFeed() {
  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
        <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
          <CardTitle className="font-space-grotesk text-2xl font-semibold">Recent Activity</CardTitle>
          <History className="w-5 h-5 text-[#F5EDD6]/40" />
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <div className="flex gap-4 items-start group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#00FF88]/10 flex items-center justify-center text-[#00FF88] shrink-0 group-hover:scale-110 transition-transform"><ArrowDownRight size={18} /></div>
            <div className="pt-0.5">
              <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">Bought 0.05 BTC</div>
              <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">@ 64,120.00 • 2 hrs ago</div>
            </div>
          </div>
          <div className="flex gap-4 items-start group cursor-default">
            <div className="w-10 h-10 rounded-full bg-[#E8602C]/10 flex items-center justify-center text-[#E8602C] shrink-0 group-hover:scale-110 transition-transform"><TrendingUp size={18} /></div>
            <div className="pt-0.5">
              <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">Margin call avoided</div>
              <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">ETH longs secured • 5 hrs ago</div>
            </div>
          </div>
          <div className="flex gap-4 items-start group cursor-default">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F5EDD6] shrink-0 group-hover:scale-110 transition-transform"><ArrowUpRight size={18} /></div>
            <div className="pt-0.5">
              <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">Transferred to Vault</div>
              <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">-5.00 ETH • 1 day ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}