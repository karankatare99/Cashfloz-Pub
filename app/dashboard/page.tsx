"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, animate, useScroll, useTransform, Variants } from "framer-motion"
import { Navbar } from "../../components/layout/Navbar"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, History, PieChart } from "lucide-react"

// [CASHFLOZ UI] — Animation: Shared staggered variants for lists and grids
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

// [CASHFLOZ UI] — Animation: Number counter component for stats
function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const node = nodeRef.current
    if (!node) return
    
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // Custom smooth easing curve
      onUpdate(val) {
        node.textContent = `${prefix}${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
      }
    })
    
    return () => controls.stop()
  }, [value, prefix, suffix, decimals])
  
  return <span ref={nodeRef}>{prefix}0{suffix}</span>
}

function DonutChart() {
  return (
    <div className="relative w-40 h-40 mx-auto mt-6 rounded-full" style={{ background: "conic-gradient(#00FF88 0% 45%, #E8602C 45% 65%, #F7931A 65% 85%, rgba(255,255,255,0.1) 85% 100%)", boxShadow: "0 0 20px rgba(0,0,0,0.5) inset" }}>
      <div className="absolute inset-4 rounded-full bg-[#0A0A0F] flex items-center justify-center flex-col shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
          <span className="text-[#F5EDD6]/60 text-xs font-inter font-medium tracking-[0.04em] uppercase mb-1">Total Eq.</span>
          <span className="text-[#F5EDD6] font-jetbrains-mono tracking-tight font-medium text-lg">$104k</span>
      </div>
    </div>
  )
}

function MiniSparkline({ up }: { up: boolean }) {
  const color = up ? "#00FF88" : "#E8602C"
  return (
    <svg width="100" height="40" viewBox="0 0 100 40" className="opacity-70">
      <path d={up ? "M0 30 Q10 20 20 25 T40 10 T60 15 T80 5 T100 0" : "M0 10 Q10 5 20 15 T40 25 T60 20 T80 35 T100 40"} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export default function DashboardPage() {
  const [filter, setFilter] = useState("1M")
  
  // [CASHFLOZ UI] — Parallax: Scroll tracking for background elements
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]) // 0.3x scroll speed
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]) // 0.15x scroll speed

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter selection:bg-[#E8602C]/30 selection:text-white antialiased relative"
    >
      {/* [CASHFLOZ UI] — Parallax: Decorative ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <motion.div style={{ y: y1 }} className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full bg-[#E8602C]/[0.02] blur-[120px]" />
         <motion.div style={{ y: y2 }} className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#00FF88]/[0.02] blur-[120px]" />
      </div>

      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-12">
          <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4 tracking-[-0.02em] bg-clip-text text-transparent bg-gradient-to-r from-[#F5EDD6] to-[#F5EDD6]/60">
            Portfolio Dashboard
          </h1>
          <p className="text-[#F5EDD6]/70 font-inter text-base md:text-lg">Real-time performance and allocation.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
           <motion.div variants={staggerItem}>
             <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out overflow-hidden relative p-6">
               <CardHeader className="p-0 pb-3">
                 <CardTitle className="text-[#F5EDD6]/60 text-[13px] font-inter font-medium tracking-[0.04em] uppercase">Total Balance</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                 {/* [CASHFLOZ UI] — Animation: Counting up numerical values */}
                 <div className="text-3xl font-jetbrains-mono font-medium text-[#F5EDD6]">
                    <AnimatedCounter value={104230.50} prefix="$" decimals={2} />
                 </div>
                 <div className="text-[#00FF88] text-sm mt-2 flex items-center gap-1.5 font-medium"><TrendingUp className="w-4 h-4" /> +12.4% All Time</div>
                 
                 <div className="absolute bottom-0 right-0 p-4 opacity-50 mix-blend-screen">
                    <MiniSparkline up={true} />
                 </div>
               </CardContent>
             </Card>
           </motion.div>
           
           <motion.div variants={staggerItem}>
             <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out p-6">
               <CardHeader className="p-0 pb-3">
                 <CardTitle className="text-[#F5EDD6]/60 text-[13px] font-inter font-medium tracking-[0.04em] uppercase">24h PNL</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                 <div className="text-2xl font-jetbrains-mono font-medium text-[#00FF88]">
                    <AnimatedCounter value={1240.20} prefix="+$" decimals={2} />
                 </div>
                 <div className="text-[#F5EDD6]/60 text-sm mt-2 font-inter">Realized: +$450.00</div>
               </CardContent>
             </Card>
           </motion.div>

           <motion.div variants={staggerItem}>
             <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-200 ease-out p-6">
               <CardHeader className="p-0 pb-3">
                 <CardTitle className="text-[#F5EDD6]/60 text-[13px] font-inter font-medium tracking-[0.04em] uppercase">Margin Used</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                 <div className="text-2xl font-jetbrains-mono font-medium text-[#F5EDD6]">
                    <AnimatedCounter value={15.4} suffix="%" decimals={1} />
                 </div>
                 <div className="w-full bg-white/10 h-1.5 mt-4 rounded-full overflow-hidden relative">
                    {/* [CASHFLOZ UI] — Animation: Progress bar fill matches the number counter timing */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '15.4%' }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-[#E8602C] h-full absolute left-0 top-0" 
                    />
                 </div>
               </CardContent>
             </Card>
           </motion.div>
           
           <motion.div variants={staggerItem} className="h-full">
             <Card className="h-full bg-[#E8602C]/10 border border-[#E8602C]/30 rounded-2xl cursor-pointer hover:bg-[#E8602C]/20 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(232,96,44,0.25)] transition-all duration-200 ease-out flex items-center justify-center p-6 min-h-[140px] group">
                <div className="flex items-center gap-3 text-[#E8602C] font-inter text-[13px] tracking-[0.04em] font-medium uppercase group-active:scale-95 transition-transform">
                   <span>Deposit Funds</span> 
                   <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
                </div>
             </Card>
           </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <motion.div variants={staggerContainer} initial="hidden" animate="show" className="col-span-1 lg:col-span-2 space-y-8">
              <motion.div variants={staggerItem}>
                 <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] h-96 flex flex-col p-6">
                    <div className="flex justify-between items-center mb-6">
                       <CardTitle className="font-space-grotesk text-3xl font-semibold tracking-[-0.02em]">Performance History</CardTitle>
                       <Tabs value={filter} onValueChange={setFilter} className="bg-white/5 p-1 rounded-lg border border-white/10">
                         <TabsList className="flex gap-1">
                           {["1W", "1M", "3M", "1Y", "ALL"].map(i => (
                             <TabsTrigger 
                               key={i} 
                               value={i} 
                               className="text-xs font-inter font-medium px-3 py-1.5 rounded-md data-[state=active]:bg-white/10 data-[state=active]:text-[#F5EDD6] text-[#F5EDD6]/50 transition-colors"
                             >
                               {i}
                             </TabsTrigger>
                           ))}
                         </TabsList>
                       </Tabs>
                    </div>
                    <CardContent className="flex-1 border-t border-white/[0.06] relative p-0 pt-6">
                       <svg width="100%" height="100%" preserveAspectRatio="none" className="drop-shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                          <linearGradient id="pnlGrad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#00FF88" stopOpacity="0.15"/>
                            <stop offset="100%" stopColor="#00FF88" stopOpacity="0"/>
                          </linearGradient>
                          <path d="M0 200 L0 150 Q 100 100 200 130 T 400 80 T 600 30 L800 60 L1000 0 L1000 200 Z" fill="url(#pnlGrad)" />
                          <path d="M0 150 Q 100 100 200 130 T 400 80 T 600 30 L800 60 L1000 0" fill="none" stroke="#00FF88" strokeWidth="2.5" />
                       </svg>
                    </CardContent>
                 </Card>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                 <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
                    <CardHeader className="p-0 mb-6">
                       <CardTitle className="font-space-grotesk text-3xl font-semibold tracking-[-0.02em]">Active Positions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                       <table className="w-full text-left font-jetbrains-mono text-sm border-collapse whitespace-nowrap">
                          <thead>
                             <tr className="text-[#F5EDD6]/50 font-inter text-xs tracking-[0.04em] uppercase border-b border-white/[0.06]">
                                <th className="pb-4 font-medium">Asset</th>
                                <th className="pb-4 font-medium">Size</th>
                                <th className="pb-4 font-medium">Entry</th>
                                <th className="pb-4 font-medium text-right">PNL</th>
                             </tr>
                          </thead>
                          <tbody>
                             <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-default">
                                <td className="py-4 text-[#F5EDD6] font-medium">BTC-USD</td>
                                <td className="py-4 text-[#F5EDD6]/80">0.50</td>
                                <td className="py-4 text-[#F5EDD6]/50">62,100.00</td>
                                <td className="py-4 text-right text-[#00FF88] font-medium">+1,065.50</td>
                             </tr>
                             <tr className="hover:bg-white/[0.02] transition-colors cursor-default">
                                <td className="py-4 text-[#F5EDD6] font-medium">ETH-USD</td>
                                <td className="py-4 text-[#F5EDD6]/80">10.00</td>
                                <td className="py-4 text-[#F5EDD6]/50">3,500.00</td>
                                <td className="py-4 text-right text-[#E8602C] font-medium">-498.00</td>
                             </tr>
                          </tbody>
                       </table>
                    </CardContent>
                 </Card>
              </motion.div>
           </motion.div>
           
           <motion.div variants={staggerContainer} initial="hidden" animate="show" className="col-span-1 space-y-8 relative z-10">
              <motion.div variants={staggerItem}>
                 <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
                    <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                       <CardTitle className="font-space-grotesk text-2xl font-semibold">Allocation</CardTitle>
                       <PieChart className="w-5 h-5 text-[#F5EDD6]/40" />
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col items-center">
                       <DonutChart />
                       <div className="w-full mt-10 space-y-4 font-jetbrains-mono text-sm">
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                             <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-[#00FF88]"></div><span className="text-[#F5EDD6]/70">Crypto</span></div>
                             <span className="text-[#F5EDD6] font-medium">45%</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                             <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-[#E8602C]"></div><span className="text-[#F5EDD6]/70">Equities</span></div>
                             <span className="text-[#F5EDD6] font-medium">20%</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                             <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-[#F7931A]"></div><span className="text-[#F5EDD6]/70">Commodities</span></div>
                             <span className="text-[#F5EDD6] font-medium">20%</span>
                          </div>
                          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                             <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-transparent border border-[#F5EDD6]/30"></div><span className="text-[#F5EDD6]/70">Cash</span></div>
                             <span className="text-[#F5EDD6] font-medium">15%</span>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              </motion.div>
              
              <motion.div variants={staggerItem}>
                 <Card className="bg-white/[0.02] border border-white/[0.06] rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] p-6">
                    <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                       <CardTitle className="font-space-grotesk text-2xl font-semibold">Recent Activity</CardTitle>
                       <History className="w-5 h-5 text-[#F5EDD6]/40" />
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                       <div className="flex gap-4 items-start group cursor-default">
                          <div className="w-10 h-10 rounded-full bg-[#00FF88]/10 flex items-center justify-center text-[#00FF88] shrink-0 group-hover:scale-110 transition-transform"><ArrowDownRight size={18} /></div>
                          <div className="pt-0.5">
                             <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">Bought 0.05 BTC</div>
                             <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">@ 64,120.00 • 2 hrs ago</div>
                          </div>
                       </div>
                       <div className="flex gap-4 items-start group cursor-default">
                          <div className="w-10 h-10 rounded-full bg-[#E8602C]/10 flex items-center justify-center text-[#E8602C] shrink-0 group-hover:scale-110 transition-transform"><TrendingUp size={18} /></div>
                          <div className="pt-0.5">
                             <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">Margin call avoided</div>
                             <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">ETH longs secured • 5 hrs ago</div>
                          </div>
                       </div>
                       <div className="flex gap-4 items-start group cursor-default">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F5EDD6] shrink-0 group-hover:scale-110 transition-transform"><ArrowUpRight size={18} /></div>
                          <div className="pt-0.5">
                             <div className="text-[#F5EDD6] text-sm font-inter font-medium mb-1">Transferred to Vault</div>
                             <div className="text-xs text-[#F5EDD6]/50 font-jetbrains-mono">-5.00 ETH • 1 day ago</div>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
              </motion.div>
           </motion.div>
        </div>
      </main>
    </motion.div>
  )
}