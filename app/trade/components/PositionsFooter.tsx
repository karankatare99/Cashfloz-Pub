"use client"
import React, { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { footerVariants } from "./animations"
import axios from "axios"

interface Position {
  symbol: string
  size: string
  entryPrice: string
  markPrice: string
  liqPrice: string
  pnl: string
  pnlStatus: "positive" | "negative"
}

export function PositionsFooter() {
  const [positions, setPositions] = useState<Position[]>([])
  const [activeTab, setActiveTab] = useState("positions")

  const fetch = useCallback(() => {
    axios
      .get("/api/trade/positions")
      .then((res) => setPositions(res.data.positions))
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch()
    const interval = setInterval(fetch, 5000)
    return () => clearInterval(interval)
  }, [fetch])

  return (
    <motion.footer
      initial="hidden"
      animate="show"
      variants={footerVariants}
      className="h-56 border-t border-white/[0.06] bg-[#0A0A0F] shrink-0 hidden lg:flex flex-col z-20"
    >
      <div className="h-12 border-b border-white/[0.04] flex flex-row items-center px-6 font-inter text-[13px] font-medium uppercase tracking-wider bg-white/[0.01] gap-8">
        <span
          onClick={() => setActiveTab("positions")}
          className={`cursor-pointer h-full flex items-center transition-colors ${activeTab === "positions" ? "text-[#E8602C] border-b-2 border-[#E8602C]" : "text-[#F5EDD6]/40 hover:text-[#F5EDD6]"}`}
        >
          Open Positions ({positions.length})
        </span>
        <span
          onClick={() => setActiveTab("orders")}
          className={`cursor-pointer h-full flex items-center transition-colors ${activeTab === "orders" ? "text-[#E8602C] border-b-2 border-[#E8602C]" : "text-[#F5EDD6]/40 hover:text-[#F5EDD6]"}`}
        >
          Active Orders (0)
        </span>
        <span
          onClick={() => setActiveTab("history")}
          className={`cursor-pointer h-full flex items-center transition-colors ${activeTab === "history" ? "text-[#E8602C] border-b-2 border-[#E8602C]" : "text-[#F5EDD6]/40 hover:text-[#F5EDD6]"}`}
        >
          Order History
        </span>
      </div>

      <div className="flex-1 overflow-auto text-[13px] font-jetbrains-mono">
        {activeTab === "positions" && (
          <table className="w-full text-left font-medium whitespace-nowrap">
            <thead>
              <tr className="text-[#F5EDD6]/40 uppercase font-inter text-[11px] tracking-[0.04em] border-b border-white/[0.04]">
                <th className="py-4 px-6 font-medium">Symbol</th>
                <th className="py-4 px-6 font-medium">Size</th>
                <th className="py-4 px-6 font-medium">Entry Price</th>
                <th className="py-4 px-6 font-medium">Mark Price</th>
                <th className="py-4 px-6 font-medium text-right">Liq. Price</th>
                <th className="py-4 px-6 font-medium text-right">Unrealized PNL</th>
                <th className="py-4 px-6 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default border-b border-white/[0.02]">
                  <td className="py-4 px-6 text-[#F5EDD6]">{pos.symbol}</td>
                  <td className="py-4 px-6 text-[#F5EDD6]/80">{pos.size}</td>
                  <td className="py-4 px-6 text-[#F5EDD6]/50">{pos.entryPrice}</td>
                  <td className="py-4 px-6 text-[#F5EDD6]">{pos.markPrice}</td>
                  <td className="py-4 px-6 text-[#F7931A] text-right">{pos.liqPrice}</td>
                  <td className={`py-4 px-6 text-right font-semibold ${pos.pnlStatus === "positive" ? "text-[#00FF88]" : "text-[#E8602C]"}`}>{pos.pnl}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#E8602C] opacity-0 group-hover:opacity-100 uppercase text-[10px] font-inter font-bold border border-[#E8602C]/50 hover:bg-[#E8602C]/10 px-3 py-1.5 rounded-md transition-all duration-200">
                      Close
                    </button>
                  </td>
                </tr>
              ))}
              {positions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#F5EDD6]/30 font-inter text-sm">No open positions.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === "orders" && (
          <div className="flex items-center justify-center h-full text-[#F5EDD6]/30 font-inter text-sm">
            No active orders.
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex items-center justify-center h-full text-[#F5EDD6]/30 font-inter text-sm">
            No order history yet.
          </div>
        )}
      </div>
    </motion.footer>
  )
}