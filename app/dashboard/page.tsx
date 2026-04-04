"use client"
import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import axios from "axios"
import { Navbar } from "../../components/layout/Navbar"

// Component Imports
import { staggerContainer } from "./components/animations"
import { OverviewStats } from "./components/OverviewStats"
import { PerformancePanel } from "./components/PerformancePanel"
import { PositionsTable } from "./components/PositionsTable"
import { AllocationPanel } from "./components/AllocationPanel"
import { ActivityFeed } from "./components/ActivityFeed"

export default function DashboardPage() {
  const [cashBalance, setCashBalance] = useState<number | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(true)

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const y2 = useTransform(scrollY, [0, 1000], [0, 150])

  useEffect(() => {
    axios
      .get("/api/user/balance")
      .then((res) => setCashBalance(res.data.cashBalance))
      .catch(() => setCashBalance(null))
      .finally(() => setBalanceLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter selection:bg-[#E8602C]/30 selection:text-white antialiased relative"
    >
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[#E8602C]/[0.02] blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#00FF88]/[0.02] blur-[120px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-12">
          <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4 tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-r from-[#F5EDD6] to-[#F5EDD6]/60">
            Portfolio Dashboard
          </h1>
          <p className="text-[#F5EDD6]/70 font-inter text-base md:text-lg">Real-time performance and allocation.</p>
        </motion.div>

        {/* Top 4 Stats Row */}
        <OverviewStats cashBalance={cashBalance} balanceLoading={balanceLoading} />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Chart & Positions) */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="col-span-1 lg:col-span-2 space-y-8">
            <PerformancePanel />
            <PositionsTable />
          </motion.div>

          {/* Right Column (Allocation & Activity) */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="col-span-1 space-y-8 relative z-10">
            <AllocationPanel />
            <ActivityFeed />
          </motion.div>
          
        </div>
      </main>
    </motion.div>
  )
}