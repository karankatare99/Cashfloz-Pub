"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { staggerItem } from "./animations"
import axios from "axios"

interface Position {
  asset: string
  size: string
  entryPrice: string
  currentPrice: string
  pnl: number
  pnlPct: number
}

export function PositionsTable() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = () =>
      axios
        .get("/api/dashboard/positions")
        .then((res) => setPositions(res.data.positions))
        .catch(() => {})
        .finally(() => setLoading(false))

    fetch()
    // Refresh every 5 seconds for live price feel
    const interval = setInterval(fetch, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="font-space-grotesk text-3xl font-semibold tracking-[-0.02em]">Active Positions</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-white/[0.03] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <table className="w-full text-left font-jetbrains-mono text-sm border-collapse whitespace-nowrap">
              <thead>
                <tr className="text-[#F5EDD6]/50 font-inter text-xs tracking-[0.04em] uppercase border-b border-white/[0.06]">
                  <th className="pb-4 font-medium">Asset</th>
                  <th className="pb-4 font-medium">Size</th>
                  <th className="pb-4 font-medium">Entry</th>
                  <th className="pb-4 font-medium">Current</th>
                  <th className="pb-4 font-medium text-right">PNL</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((p) => (
                  <tr key={p.asset} className="border-b border-white/[0.04] last:border-none hover:bg-white/[0.02] transition-colors cursor-default">
                    <td className="py-4 text-[#F5EDD6] font-medium">{p.asset}</td>
                    <td className="py-4 text-[#F5EDD6]/80">{p.size}</td>
                    <td className="py-4 text-[#F5EDD6]/50">{p.entryPrice}</td>
                    <td className="py-4 text-[#F5EDD6]/80">{p.currentPrice}</td>
                    <td className={`py-4 text-right font-medium ${p.pnl >= 0 ? "text-[#00FF88]" : "text-[#E8602C]"}`}>
                      {p.pnl >= 0 ? "+" : ""}{p.pnl.toFixed(2)}
                      <span className="text-xs ml-1 opacity-60">({p.pnl >= 0 ? "+" : ""}{p.pnlPct.toFixed(2)}%)</span>
                    </td>
                  </tr>
                ))}
                {positions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#F5EDD6]/40 font-inter text-sm">No active positions.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}