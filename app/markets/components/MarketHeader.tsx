"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input";

interface MarketHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function MarketHeader({ searchTerm, setSearchTerm }: MarketHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <motion.div
       initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.4 }}
       className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10"
    >
      <div>
        <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-3 tracking-[-0.02em]">Markets overview</h1>
        <p className="text-[#F5EDD6]/60 font-inter text-lg">Real-time data across 200+ global instruments.</p>
      </div>
      
      <div className="relative w-full md:w-80 group">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10 transition-colors duration-200 ${isSearchFocused ? 'text-[#E8602C]' : 'text-[#F5EDD6]/40'}`} />
        <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#E8602C]/50 to-transparent opacity-0 blur-[2px] transition-opacity duration-300 ${isSearchFocused ? 'opacity-100' : ''}`}></div>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          placeholder="Search assets..." 
          className="relative z-10 pl-11 h-12 bg-[#0A0A0F] border border-white/[0.08] text-base text-[#F5EDD6] placeholder:text-[#F5EDD6]/30 rounded-xl focus-visible:ring-0 focus-visible:border-white/[0.15] transition-colors" 
        />
      </div>
    </motion.div>
  )
}