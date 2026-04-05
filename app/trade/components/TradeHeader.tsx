"use client"
import React from "react"
import { ArrowLeft, Activity } from "lucide-react"
import { useRouter } from "next/navigation"

export function TradeHeader() {
  const router = useRouter()
  return (
    <header className="h-16 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between px-6 shrink-0 z-20 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="flex items-center justify-center w-8 h-8 rounded border border-white/[0.06] bg-white/[0.02] text-[#F5EDD6]/50 hover:text-[#F5EDD6] hover:bg-white/[0.06] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 group cursor-pointer hover:scale-[1.02] transition-transform duration-200">
            <div className="w-8 h-8 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-lg skew-x-[-10deg]">C</div>
            <span className="font-space-grotesk font-bold text-xl tracking-widest leading-none text-[#F5EDD6]">CASHFLOZ</span>
          </div>
        </div>
        <div className="h-6 w-[1px] bg-white/[0.1]"></div>
        <nav className="flex gap-6 font-inter text-[13px] font-medium uppercase tracking-wide">
          <span className="text-[#E8602C] border-b-2 border-[#E8602C] pb-[21px] pt-5 cursor-pointer">Spot</span>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[11px] font-jetbrains-mono bg-[#00FF88]/10 px-4 py-2 rounded-full border border-[#00FF88]/20">
          <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
          <span className="text-[#00FF88] font-medium tracking-wide">API Connected</span>
        </div>
      </div>
    </header>
  )
}
