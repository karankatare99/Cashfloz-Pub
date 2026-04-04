"use client"
import React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Market } from "./data"
import { Sparkline } from "./Sparkline"
import { tableVariants, rowVariants } from "./animations"

interface MarketTableProps {
  markets: Market[];
}

export function MarketTable({ markets }: MarketTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-[24px] border border-white/[0.06] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/[0.06] text-[#F5EDD6]/50 font-inter text-xs tracking-[0.04em] uppercase">
            <th className="py-5 px-6 font-medium invisible sm:visible w-16"></th>
            <th className="py-5 px-6 font-medium">Asset</th>
            <th className="py-5 px-6 font-medium text-right">Price</th>
            <th className="py-5 px-6 font-medium text-right">24h Change</th>
            <th className="py-5 px-6 font-medium text-right">24h Volume</th>
            <th className="py-5 px-6 font-medium text-right">Market Cap</th>
            <th className="py-5 px-6 font-medium text-right">7d Trend</th>
          </tr>
        </thead>
        <motion.tbody variants={tableVariants} initial="hidden" animate="show">
          {markets.map((asset) => (
            <motion.tr 
              key={asset.id}
              variants={rowVariants}
              className="border-b border-white/[0.04] last:border-none hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <td className="py-4 px-6 text-[#F5EDD6]/30 hover:text-[#E8602C] transition-colors">
                <Star className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" />
              </td>
              <td className="py-4 px-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8602C] to-[#E8602C]/20 flex items-center justify-center font-space-grotesk font-bold text-sm text-[#0A0A0F] shadow-[0_4px_12px_rgba(232,96,44,0.2)] group-hover:scale-105 transition-transform duration-300">
                  {asset.symbol[0]}
                </div>
                <div>
                  <div className="font-inter font-medium text-[#F5EDD6] text-[15px] group-hover:text-[#E8602C] transition-colors">{asset.name}</div>
                  <div className="font-jetbrains-mono text-xs text-[#F5EDD6]/50 mt-0.5">{asset.symbol}</div>
                </div>
              </td>
              <td className="py-4 px-6 text-right font-jetbrains-mono tracking-tight font-medium text-[#F5EDD6] text-[15px]">
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.price < 5 ? 4 : 2 })}
              </td>
              <td className={`py-4 px-6 text-right font-jetbrains-mono font-medium text-[15px] ${asset.change > 0 ? 'text-[#00FF88]' : 'text-[#E8602C]'}`}>
                {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
              </td>
              <td className="py-4 px-6 text-right font-jetbrains-mono text-[#F5EDD6]/60 text-[15px]">
                {asset.volume}
              </td>
              <td className="py-4 px-6 text-right font-jetbrains-mono text-[#F5EDD6]/60 text-[15px]">
                {asset.marketCap}
              </td>
              <td className="py-4 px-6 flex justify-end items-center h-[72px]">
                <Sparkline type={asset.sparkline} />
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
      
      {markets.length === 0 && (
        <div className="p-16 text-center text-[#F5EDD6]/50 font-inter text-sm">
          No markets match your criteria.
        </div>
      )}
    </div>
  )
}