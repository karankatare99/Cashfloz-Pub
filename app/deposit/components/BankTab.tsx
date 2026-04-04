// Empty file"use client"
import React from "react"
import { motion } from "framer-motion"
import { CopyButton } from "./DepositUtilities"

export function BankTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="bg-[#E8602C]/10 border border-[#E8602C]/20 rounded-xl p-4 mb-6">
        <p className="text-[#E8602C] font-inter text-xs leading-relaxed">
          Please transfer funds to the following bank account. Include your Reference ID in the transfer notes to ensure automated processing.
        </p>
      </div>

      {[
        { label: "Account Name", value: "Cashfloz Ltd" },
        { label: "IBAN", value: "GB29 NWBK 6016 1331 9268 19" },
        { label: "SWIFT / BIC", value: "NWBKGB2L" },
        { label: "Reference ID", value: "CASH-8X92-PLQ" },
      ].map((item, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex justify-between items-center group">
          <div>
            <div className="text-[#F5EDD6]/40 text-[11px] font-medium uppercase tracking-wider mb-1">{item.label}</div>
            <div className="font-jetbrains-mono text-[14px] text-[#F5EDD6]/90">{item.value}</div>
          </div>
          <CopyButton text={item.value} />
        </div>
      ))}
    </motion.div>
  )
}