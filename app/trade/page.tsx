"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "../../components/layout/Navbar"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { createChart, ColorType, IChartApi, UTCTimestamp } from "lightweight-charts"
import { ArrowUpRight, ArrowLeft, Activity } from "lucide-react"

// --- Fake Data Generators ---
const generateCandleData = () => {
  const data = []
  let time = Math.floor(Date.now() / 1000) - 100000
  let open = 64000
  for (let i = 0; i < 200; i++) {
    const close = open + (Math.random() - 0.5) * 1000
    const high = Math.max(open, close) + Math.random() * 500
    const low = Math.min(open, close) - Math.random() * 500
    data.push({ time: time as UTCTimestamp, open, high, low, close })
    open = close
    time += 3600 // 1 hour
  }
  return data
}

// [CASHFLOZ UI] — Animation: Shared panel entrance stagger with strict typing to fix TS error
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
}

// --- Sub-components ---
function OrderBook() {
  const [bids, setBids] = useState<any[]>([])
  const [asks, setAsks] = useState<any[]>([])

  useEffect(() => {
    const b = Array.from({ length: 15 }).map((_, i) => ({
      price: 64230.50 - i * 0.5,
      size: (Math.random() * 2).toFixed(3),
      total: (Math.random() * 10).toFixed(3),
      depth: Math.random() * 100
    }))
    const a = Array.from({ length: 15 }).map((_, i) => ({
      price: 64231.00 + i * 0.5,
      size: (Math.random() * 2).toFixed(3),
      total: (Math.random() * 10).toFixed(3),
      depth: Math.random() * 100
    })).reverse()
    setBids(b)
    setAsks(a)
  }, [])

  return (
    // [CASHFLOZ UI] — Layout & Borders: Standardized 320px width, clean 0.06 opacity borders
    <motion.div variants={panelVariants} className="flex flex-col h-full bg-[#0A0A0F] border-r border-white/[0.06] text-xs font-jetbrains-mono tracking-tight text-right w-[320px] shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      {/* [CASHFLOZ UI] — Typography & Spacing: Inter for labels, 16px horizontal padding */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex justify-between text-[#F5EDD6]/50 font-inter uppercase tracking-[0.04em] font-medium text-[11px]">
        <span>Size</span><span>Price (USD)</span>
      </div>
      
      {/* Asks */}
      <div className="flex-1 overflow-hidden flex flex-col justify-end pt-2">
        {asks.map((ask, i) => (
          // [CASHFLOZ UI] — Micro-interactions & Colors: Hover states, Ember for asks
          <div key={`ask-${i}`} className="relative flex justify-between px-4 py-1.5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
            <div className="absolute top-0 right-0 h-full bg-[#E8602C]/10 -z-10 transition-all duration-300" style={{ width: `${ask.depth}%` }}></div>
            <span className="text-[#F5EDD6]/60">{ask.size}</span>
            <span className="text-[#E8602C] font-medium">{ask.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Spread */}
      {/* [CASHFLOZ UI] — Spacing & Visuals: 16px vertical padding for the spread block to separate lists */}
      <div className="py-3 px-4 border-y border-white/[0.06] my-2 bg-white/[0.01] text-center flex items-center justify-center gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
        <span className="text-xl font-bold text-[#00FF88] tracking-tight">64,231.00</span>
        <span className="text-[#F5EDD6]/50 font-inter text-xs flex items-center gap-1 font-medium">
           <ArrowUpRight className="w-3 h-3 text-[#00FF88]"/> Spread: 0.50
        </span>
      </div>

      {/* Bids */}
      <div className="flex-1 overflow-hidden pb-2">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative flex justify-between px-4 py-1.5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
            <div className="absolute top-0 right-0 h-full bg-[#00FF88]/10 -z-10 transition-all duration-300" style={{ width: `${bid.depth}%` }}></div>
            <span className="text-[#F5EDD6]/60">{bid.size}</span>
            <span className="text-[#00FF88] font-medium">{bid.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      {/* Grouping */}
      {/* [CASHFLOZ UI] — Typography: Inter for footers */}
      <div className="mt-auto border-t border-white/[0.06] px-4 py-3 flex justify-between bg-white/[0.01] text-[11px] font-inter font-medium">
        <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors">Grouping: 0.5</span>
        <span className="text-[#F5EDD6]/40 flex gap-3">
           <span className="hover:text-[#F5EDD6] cursor-pointer transition-colors">0.01</span>
           <span className="text-[#E8602C] font-bold cursor-pointer">0.5</span>
           <span className="hover:text-[#F5EDD6] cursor-pointer transition-colors">1.0</span>
        </span>
      </div>
    </motion.div>
  )
}

function ChartPanel() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const [activeRes, setActiveRes] = useState("1H")
  const [chartType, setChartType] = useState("Candles")

  useEffect(() => {
    if (!chartContainerRef.current) return
    const container = chartContainerRef.current

    // [CASHFLOZ UI] — Data Viz: Customized Lightweight Charts to match the #0A0A0F aesthetic
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(245, 237, 214, 0.4)", // Cream text with opacity
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.04)" },
        horzLines: { color: "rgba(255, 255, 255, 0.04)" },
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
      },
      crosshair: {
        mode: 0,
        vertLine: { color: "rgba(255, 255, 255, 0.2)", labelBackgroundColor: "#E8602C" },
        horzLine: { color: "rgba(255, 255, 255, 0.2)", labelBackgroundColor: "#E8602C" },
      },
    })
    
    chartRef.current = chart

    const series = chart.addCandlestickSeries({
      upColor: '#00FF88',
      downColor: '#E8602C', // Using Ember for down candles to match brand
      borderVisible: false,
      wickUpColor: '#00FF88',
      wickDownColor: '#E8602C',
    })
    
    series.setData(generateCandleData())

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth })
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [activeRes, chartType])

  return (
    <motion.div variants={panelVariants} className="flex-1 flex flex-col h-full bg-[#0A0A0F] relative border-r border-white/[0.06]">
      {/* Chart Header */}
      {/* [CASHFLOZ UI] — Spacing: 64px height (h-16), 24px padding (px-6) */}
      <div className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 bg-white/[0.01]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7931A] to-[#F7931A]/20 flex items-center justify-center font-space-grotesk font-bold text-[15px] text-[#0A0A0F] shadow-[0_4px_12px_rgba(247,147,26,0.15)]">₿</div>
             <div>
               <div className="font-space-grotesk font-bold text-[#F5EDD6] text-xl tracking-tight">BTC / USD</div>
             </div>
          </div>
          <div className="hidden lg:flex gap-6 font-jetbrains-mono text-[13px]">
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h Change</span><span className="text-[#00FF88] font-medium">+1,560.20 (+2.45%)</span></div>
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h High</span><span className="text-[#F5EDD6] font-medium">65,100.00</span></div>
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h Low</span><span className="text-[#F5EDD6] font-medium">62,900.00</span></div>
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h Vol</span><span className="text-[#F5EDD6] font-medium">32.4B</span></div>
          </div>
        </div>
      </div>
      
      {/* Chart Tools Bar */}
      {/* [CASHFLOZ UI] — Spacing & UI: 48px height (h-12), 24px padding (px-6) */}
      <div className="h-12 border-b border-white/[0.04] flex items-center px-6 justify-between bg-transparent hidden sm:flex">
         <div className="flex gap-1">
            {["1m", "5m", "15m", "1H", "4H", "1D"].map(res => (
               <button 
                  key={res} 
                  onClick={() => setActiveRes(res)}
                  className={`px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-all duration-200 ${activeRes === res ? 'bg-white/[0.06] text-[#F5EDD6]' : 'text-[#F5EDD6]/40 hover:text-[#F5EDD6]/80 hover:bg-white/[0.02]'}`}
               >
                 {res}
               </button>
            ))}
         </div>
         <div className="flex gap-1">
             <button 
                  onClick={() => setChartType("Candles")}
                  className={`px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-all ${chartType === "Candles" ? 'text-[#E8602C] bg-[#E8602C]/10' : 'text-[#F5EDD6]/40 hover:text-[#F5EDD6]/80'}`}>Candles</button>
             <button 
                  onClick={() => setChartType("Line")}
                  className={`px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-all ${chartType === "Line" ? 'text-[#E8602C] bg-[#E8602C]/10' : 'text-[#F5EDD6]/40 hover:text-[#F5EDD6]/80'}`}>Line</button>
         </div>
      </div>

      {/* Actual Chart Container */}
      <div ref={chartContainerRef} className="flex-1 w-full h-full min-h-0 relative"></div>
      
      {/* Chart Logo Watermark overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] text-[180px] font-space-grotesk font-black tracking-[-0.04em] text-white selection:bg-transparent">
        CASHFLOZ
      </div>
    </motion.div>
  )
}

function OrderEntryPanel() {
  const [side, setSide] = useState("buy")
  
  return (
    // [CASHFLOZ UI] — Layout: 340px width for better breathing room inside
    <motion.div variants={panelVariants} className="w-[340px] shrink-0 bg-[#0A0A0F] flex flex-col h-full relative z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
      {/* [CASHFLOZ UI] — Spacing: 24px padding (p-6) */}
      <div className="p-6 border-b border-white/[0.06]">
        <Tabs value={side} onValueChange={setSide} className="w-full">
          {/* [CASHFLOZ UI] — UI Polish: Glassmorphic tab list with active glows */}
          <TabsList className="grid grid-cols-2 w-full p-1.5 bg-white/[0.02] border border-white/[0.06] rounded-xl h-auto">
            <TabsTrigger 
              value="buy" 
              className="font-inter font-semibold uppercase tracking-wider text-[13px] py-2.5 data-[state=active]:bg-[#00FF88]/15 data-[state=active]:text-[#00FF88] data-[state=active]:shadow-none text-[#F5EDD6]/40 transition-all duration-200 rounded-lg"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger 
              value="sell" 
              className="font-inter font-semibold uppercase tracking-wider text-[13px] py-2.5 data-[state=active]:bg-[#E8602C]/15 data-[state=active]:text-[#E8602C] data-[state=active]:shadow-none text-[#F5EDD6]/40 transition-all duration-200 rounded-lg"
            >
              Sell
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* [CASHFLOZ UI] — Spacing: 24px padding (p-6) */}
      <div className="p-6 flex-1 overflow-y-auto">
         <div className="flex gap-5 mb-8 text-xs font-inter uppercase tracking-[0.04em] font-medium">
           {/* [CASHFLOZ UI] — Colors: Dynamic accent underline based on selected side */}
           <span className={`cursor-pointer border-b-2 pb-1.5 transition-colors ${side === 'buy' ? 'text-[#00FF88] border-[#00FF88]' : 'text-[#E8602C] border-[#E8602C]'}`}>Limit</span>
           <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors pb-1.5 border-b-2 border-transparent">Market</span>
           <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors pb-1.5 border-b-2 border-transparent">Stop-Limit</span>
         </div>

         {/* [CASHFLOZ UI] — Spacing: 24px gap between form elements (space-y-6) */}
         <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-[13px] text-[#F5EDD6]/60 font-inter font-medium tracking-wide">Price (USD)</label>
             <div className="relative group">
                <Input type="number" defaultValue="64231.00" className="h-12 pr-14 bg-[#0A0A0F] border border-white/[0.08] rounded-xl text-right font-jetbrains-mono text-[15px] text-[#F5EDD6] focus-visible:ring-1 focus-visible:ring-white/[0.2] focus-visible:border-white/[0.2] transition-all" />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-[#F5EDD6]/40 font-jetbrains-mono pointer-events-none">USD</div>
             </div>
           </div>
           
           <div className="space-y-2">
             <label className="text-[13px] text-[#F5EDD6]/60 font-inter font-medium tracking-wide">Amount (BTC)</label>
             <div className="relative group">
                <Input type="number" placeholder="0.00" className="h-12 pr-14 bg-[#0A0A0F] border border-white/[0.08] rounded-xl text-right font-jetbrains-mono text-[15px] text-[#F5EDD6] placeholder:text-[#F5EDD6]/20 focus-visible:ring-1 focus-visible:ring-white/[0.2] focus-visible:border-white/[0.2] transition-all" />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs text-[#F5EDD6]/40 font-jetbrains-mono pointer-events-none">BTC</div>
             </div>
           </div>
           
           <div className="pt-2">
             {/* [CASHFLOZ UI] — Micro-interactions: Dynamic slider accent */}
             <input 
               type="range" 
               className={`w-full h-1.5 rounded-full appearance-none outline-none cursor-pointer bg-white/[0.08] ${side === 'buy' ? 'accent-[#00FF88]' : 'accent-[#E8602C]'}`} 
               min="0" max="100" defaultValue="25" 
             />
             <div className="flex justify-between text-[11px] text-[#F5EDD6]/40 font-jetbrains-mono mt-3">
               <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
             </div>
           </div>
           
           {/* [CASHFLOZ UI] — Visual Effects: Subtle border and background for the receipt card */}
           <div className="bg-white/[0.02] p-5 rounded-xl border border-white/[0.06] text-[13px] font-jetbrains-mono mt-8">
             <div className="flex justify-between mb-3">
               <span className="text-[#F5EDD6]/50">Available:</span>
               <span className="text-[#F5EDD6] font-medium">104,230.50 USD</span>
             </div>
             <div className="flex justify-between mb-3">
               <span className="text-[#F5EDD6]/50">Est. Fee:</span>
               <span className="text-[#F5EDD6]">0.05% (Maker)</span>
             </div>
             <div className="flex justify-between pt-3 border-t border-white/[0.06] mt-3 font-medium">
               <span className="text-[#F5EDD6]/50">Total:</span>
               <span className="text-[#F5EDD6] text-[15px]">0.00 USD</span>
             </div>
           </div>

           {/* [CASHFLOZ UI] — Interactions: Dynamic primary button styling with glows */}
           <Button 
             className={`w-full h-12 text-[15px] font-space-grotesk font-semibold rounded-xl uppercase tracking-wider transition-all duration-200 border-none hover:-translate-y-0.5 active:scale-[0.98] mt-6 ${
               side === 'buy' 
                 ? 'bg-[#00FF88] text-[#0A0A0F] shadow-[0_0_20px_rgba(0,255,136,0.15)] hover:shadow-[0_0_24px_rgba(0,255,136,0.35)] hover:bg-[#00FF88]/90' 
                 : 'bg-[#E8602C] text-[#0A0A0F] shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:bg-[#E8602C]/90'
             }`}
           >
             {side} BTC
           </Button>
         </div>
      </div>
      
      {/* Recent Trades (Mini Feed) */}
      <div className="h-48 border-t border-white/[0.06] bg-transparent font-jetbrains-mono text-[11px]">
        <div className="px-6 py-3 border-b border-white/[0.04] text-[#F5EDD6]/40 flex justify-between font-inter uppercase tracking-[0.04em] font-medium">
           <span>Price</span><span>Amount</span><span>Time</span>
        </div>
        <div className="overflow-hidden px-4 py-2 flex flex-col gap-1.5 text-right">
           <div className="flex justify-between px-2 py-1 hover:bg-white/[0.02] rounded transition-colors"><span className="text-[#00FF88] font-medium">64,231.00</span><span className="text-[#F5EDD6]/80">0.045</span><span className="text-[#F5EDD6]/40">12:30:45</span></div>
           <div className="flex justify-between px-2 py-1 hover:bg-white/[0.02] rounded transition-colors"><span className="text-[#E8602C] font-medium">64,230.50</span><span className="text-[#F5EDD6]/80">1.200</span><span className="text-[#F5EDD6]/40">12:30:44</span></div>
           <div className="flex justify-between px-2 py-1 hover:bg-white/[0.02] rounded transition-colors"><span className="text-[#00FF88] font-medium">64,230.50</span><span className="text-[#F5EDD6]/80">0.010</span><span className="text-[#F5EDD6]/40">12:30:42</span></div>
           <div className="flex justify-between px-2 py-1 hover:bg-white/[0.02] rounded transition-colors"><span className="text-[#E8602C] font-medium">64,230.00</span><span className="text-[#F5EDD6]/80">0.500</span><span className="text-[#F5EDD6]/40">12:30:40</span></div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TradeTerminal() {
  const router = useRouter()

  return (
    // [CASHFLOZ UI] — Global: #0A0A0F bg, text cream, hidden overflow to ensure app-like feel
    <div className="h-screen w-full bg-[#0A0A0F] text-[#F5EDD6] flex flex-col overflow-hidden max-h-screen selection:bg-[#E8602C]/30 selection:text-white antialiased">
       {/* Minimal trade navbar */}
       {/* [CASHFLOZ UI] — Spacing: 64px height (h-16), 24px padding (px-6) */}
       <header className="h-16 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between px-6 shrink-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <button 
                onClick={() => router.back()} 
                className="flex items-center justify-center w-8 h-8 rounded border border-white/[0.06] bg-white/[0.02] text-[#F5EDD6]/50 hover:text-[#F5EDD6] hover:bg-white/[0.06] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 group cursor-pointer hover:scale-[1.02] transition-transform duration-200">
                <div className="w-8 h-8 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-lg skew-x-[-10deg]">C</div>
                <span className="font-space-grotesk font-bold text-xl tracking-widest leading-none">CASHFLOZ</span>
              </div>
            </div>
            
            <div className="h-6 w-[1px] bg-white/[0.1]"></div>
            <nav className="flex gap-6 font-inter text-[13px] font-medium uppercase tracking-wide">
               <span className="text-[#E8602C] border-b-2 border-[#E8602C] pb-[21px] pt-5 cursor-pointer">Spot</span>
               <span className="text-[#F5EDD6]/50 pb-[21px] pt-5 cursor-pointer hover:text-[#F5EDD6] transition-colors">Margin</span>
               <span className="text-[#F5EDD6]/50 pb-[21px] pt-5 cursor-pointer hover:text-[#F5EDD6] transition-colors">Futures</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-[11px] font-jetbrains-mono bg-[#00FF88]/10 px-4 py-2 rounded-full border border-[#00FF88]/20">
                <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
                <span className="text-[#00FF88] font-medium tracking-wide">API Connected</span>
             </div>
          </div>
       </header>

       {/* Main Terminal Grid */}
       <motion.main 
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col md:flex-row min-h-0 relative"
       >
          <OrderBook />
          <ChartPanel />
          <OrderEntryPanel />
       </motion.main>
       
       {/* Bottom Panel */}
       {/* [CASHFLOZ UI] — Entrance animation for footer panel */}
       <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="h-56 border-t border-white/[0.06] bg-[#0A0A0F] shrink-0 hidden lg:flex flex-col z-20"
       >
          <div className="h-12 border-b border-white/[0.04] flex flex-row items-center px-6 font-inter text-[13px] font-medium uppercase tracking-wider bg-white/[0.01] gap-8">
             <span className="text-[#E8602C] cursor-pointer border-b-2 border-[#E8602C] h-full flex items-center">Open Positions (2)</span>
             <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors">Active Orders (0)</span>
             <span className="text-[#F5EDD6]/40 cursor-pointer hover:text-[#F5EDD6] transition-colors">Order History</span>
          </div>
          <div className="flex-1 overflow-auto p-0 text-[13px] font-jetbrains-mono">
             {/* [CASHFLOZ UI] — Spacing & Typography: JetBrains Mono for data, 24px horizontal padding inside table */}
             <table className="w-full text-left font-medium whitespace-nowrap">
                 <thead>
                    <tr className="text-[#F5EDD6]/40 uppercase font-inter text-[11px] tracking-[0.04em] border-b border-white/[0.04]">
                       <th className="py-4 px-6 font-medium">Symbol</th>
                       <th className="py-4 px-6 font-medium">Size</th>
                       <th className="py-4 px-6 font-medium">Entry Price</th>
                       <th className="py-4 px-6 font-medium">Mark Price</th>
                       <th className="py-4 px-6 font-medium text-right">Liq. Price</th>
                       <th className="py-4 px-6 font-medium text-right">Unrealized PNL</th>
                       <th className="py-4 px-6 font-medium text-right">Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr className="hover:bg-white/[0.02] transition-colors group cursor-default border-b border-white/[0.02]">
                       <td className="py-4 px-6 text-[#F5EDD6]">BTC/USD</td>
                       <td className="py-4 px-6 text-[#F5EDD6]/80">0.500</td>
                       <td className="py-4 px-6 text-[#F5EDD6]/50">62,100.00</td>
                       <td className="py-4 px-6 text-[#F5EDD6]">64,231.00</td>
                       <td className="py-4 px-6 text-[#F7931A] text-right">51,000.00</td>
                       <td className="py-4 px-6 text-[#00FF88] text-right font-semibold">+1,065.50 (1.65%)</td>
                       <td className="py-4 px-6 text-right">
                          {/* [CASHFLOZ UI] — Micro-interactions: Show on hover */}
                          <button className="text-[#E8602C] opacity-0 group-hover:opacity-100 uppercase text-[10px] font-inter font-bold border border-[#E8602C]/50 hover:bg-[#E8602C]/10 px-3 py-1.5 rounded-md transition-all duration-200">Close</button>
                       </td>
                    </tr>
                 </tbody>
             </table>
          </div>
       </motion.footer>
    </div>
  )
}