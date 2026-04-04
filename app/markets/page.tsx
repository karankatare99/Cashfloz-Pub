"use client"
import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Navbar } from "../../components/layout/Navbar"
import { Market } from "./components/data"
import { MarketHeader } from "./components/MarketHeader"
import { MarketTabs } from "./components/MarketTabs"
import { MarketTable } from "./components/MarketTable"
import axios from "axios"

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMarkets = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/markets")
      setMarkets(data.markets)
    } catch {
      // keep stale data on error — don't blank the table
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchMarkets()
  }, [fetchMarkets])

  // Refresh every 3 seconds to simulate live prices
  useEffect(() => {
    const interval = setInterval(fetchMarkets, 3000)
    return () => clearInterval(interval)
  }, [fetchMarkets])

  const filteredMarkets = markets.filter((m) => {
    const matchesTab = activeTab === "All" || m.type === activeTab
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter selection:bg-[#E8602C]/30 selection:text-white antialiased"
    >
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-24">
        <MarketHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <MarketTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <MarketTable markets={filteredMarkets} />
        </motion.div>
      </main>
    </motion.div>
  )
}