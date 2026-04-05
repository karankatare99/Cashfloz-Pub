"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { CreditCard, Landmark, Loader2, Wallet } from "lucide-react"


import { Navbar } from "../../components/layout/Navbar" 
import { CryptoTab } from "./components/CryptoTab"
import { CardTab } from "./components/CardTab"
import { BankTab } from "./components/BankTab"
import { SuccessScreen } from "./components/SuccessScreen"

type TabType = "crypto" | "card" | "bank"

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "crypto", label: "Crypto", icon: Wallet },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
]

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState<TabType>("crypto")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  
  const [balanceBeforeDeposit, setBalanceBeforeDeposit] = useState(0)
  
  
  const [coin, setCoin] = useState("BTC")
  const [network, setNetwork] = useState("ERC-20")
  
  
  const [cardNumber, setCardNumber] = useState("")
  const [cardAmount, setCardAmount] = useState<number | "">("")

  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "")
    const formatted = val.match(/.{1,4}/g)?.join(" ") || val
    setCardNumber(formatted.substring(0, 19))
  }

  const handleSubmit = async () => {
    setLoading(true)
    const amountToDeposit = activeTab === "card" ? Number(cardAmount) : 500

    const { data } = await axios.get("/api/user/balance").catch(() => ({ data: { cashBalance: 0 } }))
    setBalanceBeforeDeposit(data.cashBalance)

    setTimeout(async () => {
      try {
        await axios.patch("/api/user/balance", { amount: amountToDeposit })
      } catch {}
      setLoading(false)
      setSuccess(true)
    }, 2000)
  }

  const resetForm = () => {
    setSuccess(false)
    setCardNumber("")
    setCardAmount("")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] selection:bg-[#E8602C]/30 selection:text-white font-inter antialiased flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="font-space-grotesk text-3xl font-bold tracking-tight mb-2">Fund Account</h1>
                  <p className="text-[#F5EDD6]/50 text-sm">Add funds securely to your Cashfloz portfolio.</p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                {}
                <div className="flex border-b border-white/[0.06] relative">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                          isActive ? "text-[#F5EDD6]" : "text-[#F5EDD6]/40 hover:text-[#F5EDD6]/70"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        {isActive && (
                          <motion.div
                            layoutId="tab-indicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8602C]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {}
                <div className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {activeTab === "crypto" && (
                      <CryptoTab key="crypto" coin={coin} setCoin={setCoin} network={network} setNetwork={setNetwork} />
                    )}
                    {activeTab === "card" && (
                      <CardTab key="card" cardNumber={cardNumber} handleCardNumberChange={handleCardNumberChange} cardAmount={cardAmount} setCardAmount={setCardAmount} />
                    )}
                    {activeTab === "bank" && <BankTab key="bank" />}
                  </AnimatePresence>

                  {}
                  {activeTab !== "bank" && (
                    <button
                      onClick={handleSubmit}
                      disabled={loading || (activeTab === 'card' && !cardAmount)}
                      className="w-full mt-8 h-12 bg-[#E8602C] hover:bg-[#E8602C]/90 disabled:bg-white/[0.04] disabled:text-[#F5EDD6]/30 disabled:shadow-none text-[#0A0A0F] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(232,96,44,0.15)] flex items-center justify-center disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-[#0A0A0F]" />
                      ) : (
                        `Deposit ${activeTab === "card" ? (cardAmount ? `$${cardAmount}` : "") : coin}`
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <SuccessScreen
              key="success"
              resetForm={resetForm}
              activeTab={activeTab}
              cardAmount={cardAmount}
              balanceBeforeDeposit={balanceBeforeDeposit}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}