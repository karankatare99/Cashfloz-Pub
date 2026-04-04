"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { staggerItem } from "./animations"

export function PositionsTable() {
  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="font-space-grotesk text-3xl font-semibold tracking-[-0.02em]">Active Positions</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left font-jetbrains-mono text-sm border-collapse whitespace-nowrap">
            <thead>
              <tr className="text-[#F5EDD6]/50 font-inter text-xs tracking-[0.04em] uppercase border-b border-white/[0.06]">
                <th className="pb-4 font-medium">Asset</th>
                <th className="pb-4 font-medium">Size</th>
                <th className="pb-4 font-medium">Entry</th>
                <th className="pb-4 font-medium text-right">PNL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-default">
                <td className="py-4 text-[#F5EDD6] font-medium">BTC-USD</td>
                <td className="py-4 text-[#F5EDD6]/80">0.50</td>
                <td className="py-4 text-[#F5EDD6]/50">62,100.00</td>
                <td className="py-4 text-right text-[#00FF88] font-medium">+1,065.50</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors cursor-default">
                <td className="py-4 text-[#F5EDD6] font-medium">ETH-USD</td>
                <td className="py-4 text-[#F5EDD6]/80">10.00</td>
                <td className="py-4 text-[#F5EDD6]/50">3,500.00</td>
                <td className="py-4 text-right text-[#E8602C] font-medium">-498.00</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  )
}