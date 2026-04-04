"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { History, ArrowDownRight, TrendingUp, ArrowUpRight, ShoppingCart } from "lucide-react"
import { staggerItem } from "./animations"
import axios from "axios"

interface ActivityItem {
  type: "buy" | "sell" | "alert" | "transfer"
  label: string
  detail: string
  timeAgo: string
}

const ICON_MAP = {
  buy:      { icon: ArrowDownRight, bg: "bg-[#00FF88]/10", color: "text-[#00FF88]" },
  sell:     { icon: ShoppingCart,   bg: "bg-[#E8602C]/10", color: "text-[#E8602C]" },
  alert:    { icon: TrendingUp,     bg: "bg-[#E8602C]/10", color: "text-[#E8602C]" },
  transfer: { icon: ArrowUpRight,   bg: "bg-white/5 border border-white/10", color: "text-[#F5EDD6]" },
}

export function ActivityFeed() {
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/api/dashboard/activity")
      .then((res) => setActivity(res.data.activity))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div variants={staggerItem}>
      <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
        <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
          <CardTitle className="font-space-grotesk text-2xl font-semibold">Recent Activity</CardTitle>
          <History className="w-5 h-5 text-[#F5EDD6]/40" />
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] animate-pulse shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-32 bg-white/[0.04] rounded animate-pulse" />
                  <div className="h-3 w-24 bg-white/[0.03] rounded animate-pulse" />
                </div>
              </div>
            ))
          ) : activity.map((item, i) => {
            const { icon: Icon, bg, color } = ICON_MAP[item.type]
            return (
              <div key={i} className="flex gap-4 items-start group cursor-default">
                <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color} shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={18} />
                </div>
                <div className="pt-0.5">
                  <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">{item.label}</div>
                  <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">{item.detail} • {item.timeAgo}</div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}