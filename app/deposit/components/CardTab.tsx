"use client"
import React from "react"
import { motion } from "framer-motion"

const CARD_PRESETS = [100, 500, 1000, 5000]

interface CardTabProps {
  cardNumber: string;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cardAmount: number | "";
  setCardAmount: (val: number | "") => void;
}

export function CardTab({ cardNumber, handleCardNumberChange, cardAmount, setCardAmount }: CardTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-[13px] text-[#F5EDD6]/60 font-medium">Card Number</label>
        <input 
          type="text" 
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={handleCardNumberChange}
          className="w-full h-12 px-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl font-jetbrains-mono text-[15px] focus:ring-1 focus:ring-[#E8602C] focus:border-[#E8602C] transition-all outline-none placeholder:text-[#F5EDD6]/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[13px] text-[#F5EDD6]/60 font-medium">Expiry</label>
          <input 
            type="text" 
            placeholder="MM/YY"
            maxLength={5}
            className="w-full h-12 px-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl font-jetbrains-mono text-[15px] focus:ring-1 focus:ring-[#E8602C] focus:border-[#E8602C] transition-all outline-none placeholder:text-[#F5EDD6]/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] text-[#F5EDD6]/60 font-medium">CVV</label>
          <input 
            type="password" 
            placeholder="•••"
            maxLength={4}
            className="w-full h-12 px-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl font-jetbrains-mono text-[15px] focus:ring-1 focus:ring-[#E8602C] focus:border-[#E8602C] transition-all outline-none placeholder:text-[#F5EDD6]/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] text-[#F5EDD6]/60 font-medium">Cardholder Name</label>
        <input 
          type="text" 
          placeholder="John Doe"
          className="w-full h-12 px-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl font-inter text-[15px] focus:ring-1 focus:ring-[#E8602C] focus:border-[#E8602C] transition-all outline-none placeholder:text-[#F5EDD6]/20"
        />
      </div>

      <div className="pt-4 border-t border-white/[0.06] space-y-4">
        <div className="space-y-2">
          <label className="text-[13px] text-[#F5EDD6]/60 font-medium">Amount (USD)</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F5EDD6]/40 font-jetbrains-mono">$</span>
            <input 
              type="number" 
              placeholder="0.00"
              value={cardAmount}
              onChange={(e) => setCardAmount(Number(e.target.value) || "")}
              className="w-full h-12 pl-8 pr-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl font-jetbrains-mono text-[15px] focus:ring-1 focus:ring-[#E8602C] focus:border-[#E8602C] transition-all outline-none placeholder:text-[#F5EDD6]/20"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {CARD_PRESETS.map(amt => (
            <button
              key={amt}
              onClick={() => setCardAmount(amt)}
              className="flex-1 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[#F5EDD6]/60 hover:text-[#F5EDD6] hover:bg-white/[0.05] transition-all font-jetbrains-mono text-xs"
            >
              ${amt}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}