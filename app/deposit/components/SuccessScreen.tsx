"use client"
import React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { AnimatedCounter } from "./DepositUtilities"

const DUMMY_BALANCE = 14500.20 // Starting fake balance for the success counter

interface SuccessScreenProps {
  resetForm: () => void;
  activeTab: "crypto" | "card" | "bank";
  cardAmount: number | "";
}

export function SuccessScreen({ resetForm, activeTab, cardAmount }: SuccessScreenProps) {
  const router = useRouter()

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full max-w-md bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-xl p-10 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute inset-0 bg-[#00FF88]/20 rounded-full"
        />
        
        <svg className="w-12 h-12 text-[#00FF88] relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            d="M20 6L9 17l-5-5"
          />
        </svg>
      </div>

      <h2 className="font-space-grotesk text-3xl font-bold tracking-tight mb-3">Deposit Initiated</h2>
      <p className="text-[#F5EDD6]/50 text-sm leading-relaxed mb-8">
        Your funds will appear in your account within a few minutes depending on network conditions.
      </p>

      <div className="w-full bg-[#0A0A0F] border border-white/[0.06] rounded-xl p-5 mb-8">
        <div className="text-[11px] font-inter uppercase tracking-wider text-[#F5EDD6]/40 mb-2">New Portfolio Balance</div>
        <div className="text-3xl">
          <AnimatedCounter 
            from={DUMMY_BALANCE} 
            to={DUMMY_BALANCE + (activeTab === 'card' ? Number(cardAmount) : 32000)} 
          />
        </div>
      </div>

      <div className="w-full space-y-3">
        <button onClick={() => { router.push("/dashboard") }} className="w-full h-12 bg-white/[0.04] hover:bg-white/[0.08] text-[#F5EDD6] font-space-grotesk font-semibold text-[14px] rounded-xl transition-all border border-white/[0.06]">
          Back to Dashboard
        </button>
        <button 
          onClick={resetForm}
          className="w-full h-12 text-[#E8602C] hover:text-[#E8602C]/80 font-space-grotesk font-semibold text-[14px] rounded-xl transition-all"
        >
          Make Another Deposit
        </button>
      </div>
    </motion.div>
  )
}