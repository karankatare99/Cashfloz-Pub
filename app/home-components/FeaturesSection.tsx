"use client"
import React from "react"
import { motion } from "framer-motion"
import { LineChart, Zap, Waves, ShieldCheck, Globe2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FEATURES = [
  { icon: LineChart, title: "Real-Time Charts", desc: "True tick-level data with 0 latency for serious technical analysis." },
  { icon: Zap, title: "Smart Order Routing", desc: "Execute seamlessly across fragmented liquidity pools." },
  { icon: Waves, title: "Deep Liquidity", desc: "Institutional-grade depth to handle block trades without slippage." },
  { icon: ShieldCheck, title: "Risk Management", desc: "Advanced bracket orders, trailing stops, and portfolio Greeks." },
  { icon: Globe2, title: "Multi-Asset Support", desc: "Trade Crypto, Forex, Equities, and Commodities from a single account." },
  { icon: Clock, title: "24/7 Markets", desc: "Never miss an opportunity with our around-the-clock trading desk." },
]

export function FeaturesSection() {
  return (
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
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-gray-border/50 hover:border-accent/50 transition-colors group bg-transparent">
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
  )
}