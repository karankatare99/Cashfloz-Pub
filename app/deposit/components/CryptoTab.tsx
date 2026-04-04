"use client"
import React from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { CopyButton } from "./DepositUtilities"

const CRYPTO_COINS = ["BTC", "ETH", "USDT", "BNB"]
const CRYPTO_NETWORKS = ["ERC-20", "BEP-20", "TRC-20"]

interface CryptoTabProps {
  coin: string;
  setCoin: (val: string) => void;
  network: string;
  setNetwork: (val: string) => void;
}

export function CryptoTab({ coin, setCoin, network, setNetwork }: CryptoTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-[13px] text-[#F5EDD6]/60 font-medium">Select Coin</label>
        <div className="relative group">
          <select 
            value={coin} 
            onChange={(e) => setCoin(e.target.value)}
            className="w-full h-12 px-4 appearance-none bg-[#0A0A0F] border border-white/[0.08] rounded-xl font-jetbrains-mono text-[15px] focus:ring-1 focus:ring-[#E8602C] focus:border-[#E8602C] transition-all outline-none"
          >
            {CRYPTO_COINS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5EDD6]/40 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] text-[#F5EDD6]/60 font-medium">Select Network</label>
        <div className="flex gap-2">
          {CRYPTO_NETWORKS.map(net => (
            <button
              key={net}
              onClick={() => setNetwork(net)}
              className={`flex-1 py-2.5 rounded-xl font-jetbrains-mono text-xs font-medium transition-all ${
                network === net 
                  ? "bg-[#E8602C]/10 border border-[#E8602C]/50 text-[#E8602C]" 
                  : "bg-white/[0.02] border border-white/[0.06] text-[#F5EDD6]/50 hover:text-[#F5EDD6] hover:bg-white/[0.04]"
              }`}
            >
              {net}
            </button>
          ))}
        </div>
      </div>

      {/* QR & Address */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col items-center gap-6 mt-8 relative overflow-hidden">
        <div className="w-48 h-48 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px] rounded-xl"></div>
          <div className="w-12 h-12 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-2xl skew-x-[-10deg] shadow-[0_0_30px_rgba(232,96,44,0.4)] z-10">C</div>
        </div>
        
        <div className="w-full space-y-2">
          <label className="text-[11px] text-[#F5EDD6]/40 font-medium uppercase tracking-wider pl-1">Deposit Address</label>
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-12 bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-4 flex items-center overflow-hidden">
               <span className="font-jetbrains-mono text-[13px] text-[#F5EDD6]/80 truncate">0x1783ea8e4f9b2c3d...f4a9b3c2</span>
            </div>
            <CopyButton text="0xDummyWalletAddressForCashfloz" />
          </div>
        </div>
        
        <p className="text-[11px] font-inter text-[#F5EDD6]/40 mt-2 text-center">
          Minimum deposit: 0.001 {coin} • 1 network confirmation required
        </p>
      </div>
    </motion.div>
  )
}