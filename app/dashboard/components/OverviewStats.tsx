"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react"
import { staggerContainer, staggerItem } from "./animations"
import { AnimatedCounter, BalanceSkeleton, MiniSparkline } from "./DashboardUtilities"
import axios from "axios"

interface Stats {
  cashBalance: number
  pnl24h: number
  pnlRealized: number
  marginUsed: number
  allTimePct: number
}

export function OverviewStats() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/api/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  const pnlPositive = stats ? stats.pnl24h >= 0 : true
  const allTimePositive = stats ? stats.allTimePct >= 0 : true

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {}
      <motion.div variants={staggerItem}>
        <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out overflow-hidden relative p-6">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-[#F5EDD6]/60 text-[13px] font-inter font-medium tracking-[0.04em] uppercase">Total Balance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <BalanceSkeleton />
            ) : stats ? (
              <>
                <div className="text-3xl font-jetbrains-mono font-medium text-[#F5EDD6]">
                  <AnimatedCounter value={stats.cashBalance} prefix="$" decimals={2} />
                </div>
                <div className={`text-sm mt-2 flex items-center gap-1.5 font-medium ${allTimePositive ? "text-[#00FF88]" : "text-[#E8602C]"}`}>
                  {allTimePositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {allTimePositive ? "+" : ""}{stats.allTimePct.toFixed(1)}% vs start
                </div>
              </>
            ) : (
              <div className="text-[#F5EDD6]/40 text-sm font-inter">Unable to load balance</div>
            )}
            <div className="absolute bottom-0 right-0 p-4 opacity-50 mix-blend-screen">
              <MiniSparkline up={allTimePositive} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {}
      <motion.div variants={staggerItem}>
        <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out p-6">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-[#F5EDD6]/60 text-[13px] font-inter font-medium tracking-[0.04em] uppercase">24h PNL</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? <BalanceSkeleton /> : stats ? (
              <>
                <div className={`text-2xl font-jetbrains-mono font-medium ${pnlPositive ? "text-[#00FF88]" : "text-[#E8602C]"}`}>
                  <AnimatedCounter value={Math.abs(stats.pnl24h)} prefix={pnlPositive ? "+$" : "-$"} decimals={2} />
                </div>
                <div className="text-[#F5EDD6]/60 text-sm mt-2 font-inter">
                  Realized: {stats.pnlRealized >= 0 ? "+" : ""}${Math.abs(stats.pnlRealized).toFixed(2)}
                </div>
              </>
            ) : <div className="text-[#F5EDD6]/40 text-sm">—</div>}
          </CardContent>
        </Card>
      </motion.div>

      {}
      <motion.div variants={staggerItem}>
        <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out p-6">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-[#F5EDD6]/60 text-[13px] font-inter font-medium tracking-[0.04em] uppercase">Margin Used</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? <BalanceSkeleton /> : stats ? (
              <>
                <div className="text-2xl font-jetbrains-mono font-medium text-[#F5EDD6]">
                  <AnimatedCounter value={stats.marginUsed} suffix="%" decimals={1} />
                </div>
                <div className="w-full bg-white/10 h-1.5 mt-4 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.marginUsed}%` }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#E8602C] h-full absolute left-0 top-0"
                  />
                </div>
              </>
            ) : <div className="text-[#F5EDD6]/40 text-sm">—</div>}
          </CardContent>
        </Card>
      </motion.div>

      {}
      <motion.div onClick={() => router.push("/deposit")} variants={staggerItem} className="h-full">
        <Card className="h-full bg-[#E8602C]/10 border border-[#E8602C]/30 rounded-2xl cursor-pointer hover:bg-[#E8602C]/20 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(232,96,44,0.25)] transition-all duration-200 ease-out flex items-center justify-center p-6 min-h-[140px] group">
          <div className="flex items-center gap-3 text-[#E8602C] font-inter text-[13px] tracking-[0.04em] font-medium uppercase group-active:scale-95 transition-transform">
            <span>Deposit Funds</span>
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}