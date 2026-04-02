"use client"
import React, { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Navbar } from "../../components/layout/Navbar"
import { Input } from "../../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Search, Star } from "lucide-react"

const MOCK_MARKETS = [
  { id: 1, name: "Bitcoin", symbol: "BTC", type: "Crypto", price: 64231.50, change: 2.45, volume: "32.4B", marketCap: "1.2T", sparkline: "up" },
  { id: 2, name: "Ethereum", symbol: "ETH", type: "Crypto", price: 3450.20, change: 1.82, volume: "15.1B", marketCap: "415B", sparkline: "up" },
  { id: 3, name: "Solana", symbol: "SOL", type: "Crypto", price: 145.60, change: -0.54, volume: "4.2B", marketCap: "65B", sparkline: "down" },
  { id: 4, name: "EUR/USD", symbol: "EURUSD", type: "Forex", price: 1.0845, change: 0.12, volume: "850B", marketCap: "-", sparkline: "up" },
  { id: 5, name: "Gold", symbol: "XAU", type: "Commodities", price: 2340.10, change: 0.85, volume: "120B", marketCap: "-", sparkline: "up" },
  { id: 6, name: "Apple", symbol: "AAPL", type: "Stocks", price: 173.50, change: -1.25, volume: "10.5B", marketCap: "2.8T", sparkline: "down" },
  { id: 7, name: "Tesla", symbol: "TSLA", type: "Stocks", price: 175.22, change: 3.45, volume: "25.2B", marketCap: "560B", sparkline: "up" },
  { id: 8, name: "S&P 500", symbol: "SPY", type: "Indices", price: 523.44, change: 0.50, volume: "85B", marketCap: "-", sparkline: "up" },
]

// [CASHFLOZ UI] — Animation: Staggered list variants for the table rows with proper typing
const tableVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

function Sparkline({ type }: { type: "up" | "down" }) {
  // [CASHFLOZ UI] — Colors: Swapped standard red to the Ember accent for consistency
  const color = type === "up" ? "#00FF88" : "#E8602C"
  const glow = type === "up" ? "drop-shadow-[0_0_8px_rgba(0,255,136,0.3)]" : "drop-shadow-[0_0_8px_rgba(232,96,44,0.3)]"
  const pathData = type === "up" 
    ? "M 0 20 Q 10 15 20 18 T 40 10 T 60 12 T 80 5 T 100 0" 
    : "M 0 0 Q 10 5 20 2 T 40 10 T 60 8 T 80 15 T 100 20"
  return (
    // [CASHFLOZ UI] — Visual Effects: Added glow to the SVG path itself
    <svg width="60" height="20" viewBox="0 0 100 20" className={`opacity-90 ${glow}`}>
      <path d={pathData} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filteredMarkets = MOCK_MARKETS.filter(m => {
    const matchesTab = activeTab === "All" || m.type === activeTab
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    // [CASHFLOZ UI] — Page Transitions & Colors: Fade/slide wrapper, #0A0A0F base, cream text
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter selection:bg-[#E8602C]/30 selection:text-white antialiased"
    >
      <Navbar />
      
      {/* [CASHFLOZ UI] — Spacing Pass: 128px top (pt-32), 96px bottom (pb-24) */}
      <main className="container mx-auto px-6 pt-32 pb-24">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10"
        >
          <div>
            {/* [CASHFLOZ UI] — Typography: Space Grotesk h1, negative tracking */}
            <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-3 tracking-[-0.02em]">Markets overview</h1>
            <p className="text-[#F5EDD6]/60 font-inter text-lg">Real-time data across 200+ global instruments.</p>
          </div>
          
          {/* [CASHFLOZ UI] — Micro-interactions: Search input focus ring with transition */}
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

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {/* [CASHFLOZ UI] — Spacing & Layout: 32px bottom margin, distinct active tab state */}
          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-transparent overflow-x-auto border-b border-white/[0.06] w-full justify-start rounded-none h-auto p-0 gap-6">
              {["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"].map(tab => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="font-inter font-medium uppercase tracking-[0.04em] text-[13px] px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E8602C] data-[state=active]:text-[#E8602C] text-[#F5EDD6]/50 data-[state=active]:bg-transparent hover:text-[#F5EDD6] transition-colors"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* [CASHFLOZ UI] — Visual Effects: Subtle borders, inset shadow for the main data table */}
          <div className="w-full overflow-x-auto rounded-[24px] border border-white/[0.06] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/[0.06] text-[#F5EDD6]/50 font-inter text-xs tracking-[0.04em] uppercase">
                  <th className="py-5 px-6 font-medium invisible sm:visible w-16"></th>
                  <th className="py-5 px-6 font-medium">Asset</th>
                  <th className="py-5 px-6 font-medium text-right">Price</th>
                  <th className="py-5 px-6 font-medium text-right">24h Change</th>
                  <th className="py-5 px-6 font-medium text-right">24h Volume</th>
                  <th className="py-5 px-6 font-medium text-right">Market Cap</th>
                  <th className="py-5 px-6 font-medium text-right">7d Trend</th>
                </tr>
              </thead>
              <motion.tbody variants={tableVariants} initial="hidden" animate="show">
                {filteredMarkets.map((asset) => (
                  <motion.tr 
                    key={asset.id}
                    variants={rowVariants}
                    className="border-b border-white/[0.04] last:border-none hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-6 text-[#F5EDD6]/30 hover:text-[#E8602C] transition-colors">
                      {/* [CASHFLOZ UI] — Micro-interactions: Scale on favorite click */}
                      <Star className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform" />
                    </td>
                    <td className="py-4 px-6 flex items-center gap-4">
                      {/* [CASHFLOZ UI] — Colors: Ember gradient for asset avatars */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8602C] to-[#E8602C]/20 flex items-center justify-center font-space-grotesk font-bold text-sm text-[#0A0A0F] shadow-[0_4px_12px_rgba(232,96,44,0.2)] group-hover:scale-105 transition-transform duration-300">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <div className="font-inter font-medium text-[#F5EDD6] text-[15px] group-hover:text-[#E8602C] transition-colors">{asset.name}</div>
                        {/* [CASHFLOZ UI] — Typography: JetBrains Mono for tickers */}
                        <div className="font-jetbrains-mono text-xs text-[#F5EDD6]/50 mt-0.5">{asset.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-jetbrains-mono tracking-tight font-medium text-[#F5EDD6] text-[15px]">
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: asset.price < 5 ? 4 : 2 })}
                    </td>
                    <td className={`py-4 px-6 text-right font-jetbrains-mono font-medium text-[15px] ${asset.change > 0 ? 'text-[#00FF88]' : 'text-[#E8602C]'}`}>
                      {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                    </td>
                    <td className="py-4 px-6 text-right font-jetbrains-mono text-[#F5EDD6]/60 text-[15px]">
                      {asset.volume}
                    </td>
                    <td className="py-4 px-6 text-right font-jetbrains-mono text-[#F5EDD6]/60 text-[15px]">
                      {asset.marketCap}
                    </td>
                    <td className="py-4 px-6 flex justify-end items-center h-[72px]">
                      <Sparkline type={asset.sparkline as "up" | "down"} />
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
            
            {filteredMarkets.length === 0 && (
              <div className="p-16 text-center text-[#F5EDD6]/50 font-inter text-sm">
                No markets match your criteria.
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}