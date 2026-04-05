"use client"
import React from "react"
import { motion } from "framer-motion"
import { footerVariants } from "./animations"
import { mockPositions } from "./data"

export function PositionsFooter() {
  return (
    <motion.footer 
      initial="hidden"
      animate="show"
      variants={footerVariants}
      className="h-56 border-t border-white/[0.06] bg-[#0A0A0F] shrink-0 hidden lg:flex flex-col z-20"
    >
      <div className="h-12 border-b border-white/[0.04] flex flex-row items-center px-6 font-inter text-[13px] font-medium uppercase tracking-wider bg-white/[0.01] gap-8">
         <span className="text-[#E8602C] cursor-pointer border-b-2 border-[#E8602C] h-full flex items-center">Open Positions ({mockPositions.length})</span>
         <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors">Active Orders (0)</span>
         <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors">Order History</span>
      </div>
      <div className="flex-1 overflow-auto p-0 text-[13px] font-jetbrains-mono">
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
                {mockPositions.map((pos, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default border-b border-white/[0.02]">
                     <td className="py-4 px-6 text-[#F5EDD6]">{pos.symbol}</td>
                     <td className="py-4 px-6 text-[#F5EDD6]/80">{pos.size}</td>
                     <td className="py-4 px-6 text-[#F5EDD6]/50">{pos.entryPrice}</td>
                     <td className="py-4 px-6 text-[#F5EDD6]">{pos.markPrice}</td>
                     <td className="py-4 px-6 text-[#F7931A] text-right">{pos.liqPrice}</td>
                     <td className={`py-4 px-6 ${pos.pnlStatus === 'positive' ? 'text-[#00FF88]' : 'text-[#E8602C]'} text-right font-semibold`}>{pos.pnl}</td>
                     <td className="py-4 px-6 text-right">
                        <button className="text-[#E8602C] opacity-0 group-hover:opacity-100 uppercase text-[10px] font-inter font-bold border border-[#E8602C]/50 hover:bg-[#E8602C]/10 px-3 py-1.5 rounded-md transition-all duration-200">Close</button>
                     </td>
                  </tr>
                ))}
             </tbody>
         </table>
      </div>
    </motion.footer>
  )
}
