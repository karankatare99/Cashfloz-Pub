"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { panelVariants } from "./animations"
import { mockRecentTrades } from "./data"

export function OrderEntryPanel() {
  const [side, setSide] = useState("buy")
  
  return (
    <motion.div variants={panelVariants} className="w-[340px] shrink-0 bg-[#0A0A0F] flex flex-col h-full relative z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
      <div className="p-6 border-b border-white/[0.06]">
        <Tabs value={side} onValueChange={setSide} className="w-full">
          <TabsList className="grid grid-cols-2 w-full p-1.5 bg-white/[0.02] border border-white/[0.06] rounded-xl h-auto">
            <TabsTrigger 
              value="buy" 
              className="font-inter font-semibold uppercase tracking-wider text-[13px] py-2.5 data-[state=active]:bg-[#00FF88]/15 data-[state=active]:text-[#00FF88] data-[state=active]:shadow-none text-[#F5EDD6]/40 transition-all duration-200 rounded-lg"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger 
              value="sell" 
              className="font-inter font-semibold uppercase tracking-wider text-[13px] py-2.5 data-[state=active]:bg-[#E8602C]/15 data-[state=active]:text-[#E8602C] data-[state=active]:shadow-none text-[#F5EDD6]/40 transition-all duration-200 rounded-lg"
            >
              Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto">
         <div className="flex gap-5 mb-8 text-xs font-inter uppercase tracking-[0.04em] font-medium">
           <span className={`cursor-pointer border-b-2 pb-1.5 transition-colors ${side === 'buy' ? 'text-[#00FF88] border-[#00FF88]' : 'text-[#E8602C] border-[#E8602C]'}`}>Limit</span>
           <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors pb-1.5 border-b-2 border-transparent">Market</span>
           <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors pb-1.5 border-b-2 border-transparent">Stop-Limit</span>
         </div>

         <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-[13px] text-[#F5EDD6]/60 font-inter font-medium tracking-wide">Price (USD)</label>
             <div className="relative group">
                <Input type="number" defaultValue="64231.00" className="h-12 pr-14 bg-[#0A0A0F] border border-white/[0.08] rounded-xl text-right font-jetbrains-mono text-[15px] text-[#F5EDD6] focus-visible:ring-1 focus-visible:ring-white/[0.2] focus-visible:border-white/[0.2] transition-all" />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-[#F5EDD6]/40 font-jetbrains-mono pointer-events-none">USD</div>
             </div>
           </div>
           
           <div className="space-y-2">
             <label className="text-[13px] text-[#F5EDD6]/60 font-inter font-medium tracking-wide">Amount (BTC)</label>
             <div className="relative group">
                <Input type="number" placeholder="0.00" className="h-12 pr-14 bg-[#0A0A0F] border border-white/[0.08] rounded-xl text-right font-jetbrains-mono text-[15px] text-[#F5EDD6] placeholder:text-[#F5EDD6]/20 focus-visible:ring-1 focus-visible:ring-white/[0.2] focus-visible:border-white/[0.2] transition-all" />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-[#F5EDD6]/40 font-jetbrains-mono pointer-events-none">BTC</div>
             </div>
           </div>
           
           <div className="pt-2">
             <input 
               type="range" 
               className={`w-full h-1.5 rounded-full appearance-none outline-none cursor-pointer bg-white/[0.08] ${side === 'buy' ? 'accent-[#00FF88]' : 'accent-[#E8602C]'}`} 
               min="0" max="100" defaultValue="25" 
             />
             <div className="flex justify-between text-[11px] text-[#F5EDD6]/40 font-jetbrains-mono mt-3">
               <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
             </div>
           </div>
           
           <div className="bg-white/[0.02] p-5 rounded-xl border border-white/[0.06] text-[13px] font-jetbrains-mono mt-8">
             <div className="flex justify-between mb-3">
               <span className="text-[#F5EDD6]/50">Available:</span>
               <span className="text-[#F5EDD6] font-medium">104,230.50 USD</span>
             </div>
             <div className="flex justify-between mb-3">
               <span className="text-[#F5EDD6]/50">Est. Fee:</span>
               <span className="text-[#F5EDD6]">0.05% (Maker)</span>
             </div>
             <div className="flex justify-between pt-3 border-t border-white/[0.06] mt-3 font-medium">
               <span className="text-[#F5EDD6]/50">Total:</span>
               <span className="text-[#F5EDD6] text-[15px]">0.00 USD</span>
             </div>
           </div>

           <Button 
             className={`w-full h-12 text-[15px] font-space-grotesk font-semibold rounded-xl uppercase tracking-wider transition-all duration-200 border-none hover:-translate-y-0.5 active:scale-[0.98] mt-6 ${
               side === 'buy' 
                 ? 'bg-[#00FF88] text-[#0A0A0F] shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:shadow-[0_0_24px_rgba(0,255,136,0.35)] hover:bg-[#00FF88]/90' 
                 : 'bg-[#E8602C] text-[#0A0A0F] shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:bg-[#E8602C]/90'
             }`}
           >
             {side} BTC
           </Button>
         </div>
      </div>
      
      <div className="h-48 border-t border-white/[0.06] bg-transparent font-jetbrains-mono text-[11px]">
        <div className="px-6 py-3 border-b border-white/[0.04] text-[#F5EDD6]/40 flex justify-between font-inter uppercase tracking-[0.04em] font-medium">
           <span>Price</span><span>Amount</span><span>Time</span>
        </div>
        <div className="overflow-hidden px-4 py-2 flex flex-col gap-1.5 text-right">
           {mockRecentTrades.map((trade, i) => (
             <div key={i} className="flex justify-between px-2 py-1 hover:bg-white/[0.02] rounded transition-colors">
               <span className={`${trade.type === 'buy' ? 'text-[#00FF88]' : 'text-[#E8602C]'} font-medium`}>{trade.price}</span>
               <span className="text-[#F5EDD6]/80">{trade.amount}</span>
               <span className="text-[#F5EDD6]/40">{trade.time}</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  )
}
