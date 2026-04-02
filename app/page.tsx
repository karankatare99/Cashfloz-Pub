"use client"
import React, { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Navbar } from "../components/layout/Navbar"
import { LiveTicker } from "../components/layout/LiveTicker"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { LineChart, Zap, Waves, ShieldCheck, Globe2, Clock, ArrowRight } from "lucide-react"

function Hero3DCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="absolute inset-0 z-0 hidden lg:flex items-center justify-end pr-32 pointer-events-none perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[30rem] h-[20rem] rounded-2xl border border-gray-border/50 bg-navy-light/40 backdrop-blur-md shadow-2xl p-6 flex flex-col pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full w-full rounded-lg border border-gray-border overflow-hidden bg-navy relative" style={{ transform: "translateZ(50px)" }}>
          {/* Faux Chart Area */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#00FF88]/20 to-transparent flex items-end">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full stroke-accent fill-transparent stroke-2 opacity-80">
              <path d="M0 40 Q 10 30 20 20 T 40 35 T 60 10 T 80 25 T 100 5" />
            </svg>
          </div>
          <div className="absolute top-4 left-4" style={{ transform: "translateZ(80px)" }}>
            <div className="text-sm text-gray-light font-jetbrains-mono">BTC/USD</div>
            <div className="text-2xl font-bold text-white font-jetbrains-mono mt-1">64,231.50</div>
            <div className="text-sm text-[#00FF88]">+2.45%</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="flex flex-col items-center gap-2"
    >
      <div className="text-4xl lg:text-5xl font-jetbrains-mono font-bold text-white">{value}</div>
      <div className="text-sm lg:text-base text-gray-medium font-dm-sans uppercase tracking-widest">{label}</div>
    </motion.div>
  )
}

export default function LandingPage() {
  const features = [
    { icon: LineChart, title: "Real-Time Charts", desc: "True tick-level data with 0 latency for serious technical analysis." },
    { icon: Zap, title: "Smart Order Routing", desc: "Execute seamlessly across fragmented liquidity pools." },
    { icon: Waves, title: "Deep Liquidity", desc: "Institutional-grade depth to handle block trades without slippage." },
    { icon: ShieldCheck, title: "Risk Management", desc: "Advanced bracket orders, trailing stops, and portfolio Greeks." },
    { icon: Globe2, title: "Multi-Asset Support", desc: "Trade Crypto, Forex, Equities, and Commodities from a single account." },
    { icon: Clock, title: "24/7 Markets", desc: "Never miss an opportunity with our around-the-clock trading desk." },
  ]

  return (
    <main className="min-h-screen bg-navy overflow-hidden">
      <Navbar />
      <LiveTicker />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden px-6">
        <Hero3DCard />
        <div className="container mx-auto relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="max-w-2xl"
          >
            <h1 className="font-space-grotesk text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Trade the Future. <br/> <span className="text-accent">Zero Compromises.</span>
            </h1>
            <p className="font-inter text-lg lg:text-xl text-gray-light mb-10 leading-relaxed">
              Cashfloz is the professional multi-asset trading platform built for retail and institutional traders. Real-time charts, deep order books, and advanced execution tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="buy" size="lg" className="w-full sm:w-auto font-syne uppercase tracking-wider text-sm">
                Start Trading <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-syne uppercase tracking-wider text-sm">
                View Markets
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none z-[-1]" style={{ backgroundImage: "linear-gradient(to right, #1F2937 1px, transparent 1px), linear-gradient(to bottom, #1F2937 1px, transparent 1px)", backgroundSize: "4rem 4rem", opacity: 0.2 }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-border/50 bg-navy-light/30">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12"
        >
          <StatItem value="2M+" label="Traders" />
          <StatItem value="$50B+" label="Volume" />
          <StatItem value="200+" label="Instruments" />
          <StatItem value="0.001s" label="Execution" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-syne text-3xl lg:text-5xl font-extrabold text-white mb-4">ENGINEERED FOR ALPHA</h2>
            <p className="font-inter text-gray-medium max-w-2xl mx-auto">Everything you need to execute complex strategies across global markets with absolute precision.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-gray-border/50 hover:border-accent/50 transition-colors group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center border border-gray-border group-hover:scale-110 transition-transform mb-4 shadow-[0_0_10px_rgba(0,255,136,0)] group-hover:shadow-[0_0_15px_rgba(0,255,136,0.2)] group-hover:border-accent">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="font-syne text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-medium font-inter">
                    {feature.desc}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-navy px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-syne text-3xl lg:text-5xl font-extrabold text-white mb-4">TRUSTED BY PROFESSIONALS</h2>
            <p className="font-inter text-gray-medium max-w-2xl mx-auto">Don't just take our word for it. Hear from top traders and institutional partners.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex R.", role: "Prop Trader", text: "The execution speed is unmatched. Cashfloz's routing algorithms have saved me thousands in slippage alone." },
              { name: "Sarah M.", role: "Quant Analyst", text: "Finally, a platform that gives me true tick-level data without paying exorbitant institutional terminal fees." },
              { name: "David K.", role: "Hedge Fund Manager", text: "Managing multi-asset portfolios across crypto and traditional equities in one neat, dark aesthetic UI. Phenomenal." },
            ].map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-gray-border/50 bg-navy-light/60">
                  <CardContent className="p-8 pt-8 flex flex-col h-full relative">
                    <div className="text-accent text-6xl font-syne opacity-20 absolute top-4 left-6">"</div>
                    <p className="font-inter text-gray-light italic relative z-10 text-lg flex-grow">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-dark to-navy flex items-center justify-center font-bold font-syne text-white border border-gray-border">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <div className="font-dm-sans text-white font-bold">{testimonial.name}</div>
                        <div className="font-jetbrains-mono text-xs text-accent uppercase tracking-wider">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-navy-light py-12 border-t border-gray-border px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-syne font-bold text-xl text-white tracking-widest skew-x-[-5deg]">CASHFLOZ</div>
          <div className="text-gray-medium text-sm font-dm-sans">© 2026 Cashfloz Trading Ltd. All rights reserved.</div>
          <div className="flex gap-4 text-gray-light">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">API</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
