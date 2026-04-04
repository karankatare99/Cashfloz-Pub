"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { PieChart } from "lucide-react"
import { staggerItem } from "./animations"
import { DonutChart } from "./DashboardUtilities"

export function AllocationPanel() {
  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
        <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
          <CardTitle className="font-space-grotesk text-2xl font-semibold">Allocation</CardTitle>
          <PieChart className="w-5 h-5 text-[#F5EDD6]/40" />
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center">
          <DonutChart />
          <div className="w-full mt-10 space-y-4 font-jetbrains-mono text-sm">
            {[
              { label: "Crypto", color: "bg-[#00FF88]", pct: "45%" },
              { label: "Equities", color: "bg-[#E8602C]", pct: "20%" },
              { label: "Commodities", color: "bg-[#F7931A]", pct: "20%" },
              { label: "Cash", color: "bg-transparent border border-[#F5EDD6]/30", pct: "15%" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-[#F5EDD6]/70">{item.label}</span>
                </div>
                <span className="text-[#F5EDD6] font-medium">{item.pct}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}