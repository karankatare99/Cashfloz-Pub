"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { PieChart } from "lucide-react"
import { staggerItem } from "./animations"
import axios from "axios"

interface AllocationItem {
  label: string
  color: string
  pct: number
  display: string
}

interface AllocationData {
  allocation: AllocationItem[]
  donut: string
  totalLabel: string
}

export function AllocationPanel() {
  const [data, setData] = useState<AllocationData | null>(null)

  useEffect(() => {
    axios
      .get("/api/dashboard/allocation")
      .then((res) => setData(res.data))
      .catch(() => {})
  }, [])

  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
        <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
          <CardTitle className="font-space-grotesk text-2xl font-semibold">Allocation</CardTitle>
          <PieChart className="w-5 h-5 text-[#F5EDD6]/40" />
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center">
          {/* Donut */}
          <div
            className="relative w-40 h-40 mx-auto mt-6 rounded-full"
            style={{
              background: data?.donut ?? "conic-gradient(rgba(255,255,255,0.05) 0% 100%)",
              boxShadow: "0 0 20px rgba(0,0,0,0.5) inset",
            }}
          >
            <div className="absolute inset-4 rounded-full bg-[#0A0A0F] flex items-center justify-center flex-col shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <span className="text-[#F5EDD6]/60 text-xs font-inter font-medium tracking-[0.04em] uppercase mb-1">Total Eq.</span>
              <span className="text-[#F5EDD6] font-jetbrains-mono tracking-tight font-medium text-lg">
                {data?.totalLabel ?? "—"}
              </span>
            </div>
          </div>

          <div className="w-full mt-10 space-y-4 font-jetbrains-mono text-sm">
            {data ? data.allocation.map((item) => (
              <div key={item.label} className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-[#F5EDD6]/70">{item.label}</span>
                </div>
                <span className="text-[#F5EDD6] font-medium">{item.display}</span>
              </div>
            )) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center p-2">
                  <div className="h-3 w-20 bg-white/[0.04] rounded animate-pulse" />
                  <div className="h-3 w-8 bg-white/[0.04] rounded animate-pulse" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}