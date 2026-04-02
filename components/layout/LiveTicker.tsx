"use client"
import React from "react"
import { motion } from "framer-motion"

const TICKER_DATA = [
  { symbol: "BTC-USD", price: "64,231.50", change: "+2.4%" },
  { symbol: "ETH-USD", price: "3,450.20", change: "+1.8%" },
  { symbol: "SOL-USD", price: "145.60", change: "-0.5%" },
  { symbol: "EUR-USD", price: "1.0845", change: "+0.1%" },
  { symbol: "XAU-USD", price: "2,340.10", change: "+0.8%" },
  { symbol: "AAPL", price: "173.50", change: "-1.2%" },
  { symbol: "TSLA", price: "175.22", change: "+3.4%" },
  { symbol: "SPY", price: "523.44", change: "+0.5%" },
]

export function LiveTicker() {
  const items = [...TICKER_DATA, ...TICKER_DATA] // Duplicate for seamless infinite scroll

  return (
    // [CASHFLOZ UI] — Layout & Colors: 48px height (h-12), #0A0A0F base, transparent borders
    // [CASHFLOZ UI] — Visual Effects: Added edge-fade mask using an arbitrary Tailwind property
    <div className="w-full bg-[#0A0A0F] border-b border-white/[0.06] overflow-hidden h-12 flex text-[13px] font-jetbrains-mono mt-16 lg:mt-20 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div
        className="flex min-w-max items-center h-full"
        // [CASHFLOZ UI] — Animation: Translated to -50% to ensure a completely seamless infinite loop
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Slowed down slightly for a more premium, readable pace
        }}
      >
        {items.map((item, idx) => {
          const isUp = item.change.startsWith("+")
          return (
            // [CASHFLOZ UI] — Spacing & Interactions: 24px padding (px-6), 16px gap (gap-4), subtle hover state
            <div key={idx} className="flex items-center gap-4 px-6 border-r border-white/[0.04] whitespace-nowrap h-full hover:bg-white/[0.02] transition-colors cursor-default">
              {/* [CASHFLOZ UI] — Typography: Cream text with lowered opacity for the asset symbol */}
              <span className="text-[#F5EDD6]/40 font-medium tracking-wide">{item.symbol}</span>
              <span className="text-[#F5EDD6] font-medium">{item.price}</span>
              {/* [CASHFLOZ UI] — Colors: Ember accent applied for negative values */}
              <span className={`font-medium ${isUp ? "text-[#00FF88]" : "text-[#E8602C]"}`}>
                {item.change}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}