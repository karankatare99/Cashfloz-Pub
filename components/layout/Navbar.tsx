"use client"
import React, { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Button } from "../ui/button"

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 20)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      // [CASHFLOZ UI] — Smooth Header: Transitions 72px -> 56px, #0A0A0F backdrop blur, 300ms transition
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "h-[56px] py-0 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06]" : "h-[72px] py-0 bg-transparent border-b border-transparent"
      }`}
    >
      {/* [CASHFLOZ UI] — Spacing: 24px horizontal padding (px-6) */}
      <div className="container mx-auto h-full px-6 flex items-center justify-between">
        
        {/* [CASHFLOZ UI] — Micro-interactions: Hover scale on logo group */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* [CASHFLOZ UI] — Colors & Typography: Ember accent, Space Grotesk logo */}
          <div className="w-8 h-8 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-xl skew-x-[-10deg] group-hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(232,96,44,0.3)] group-hover:shadow-[0_0_24px_rgba(232,96,44,0.5)]">
            C
          </div>
          <span className="font-space-grotesk font-bold text-2xl tracking-widest text-[#F5EDD6]">
            CASHFLOZ
          </span>
        </Link>
        
        {/* [CASHFLOZ UI] — Typography & Spacing: Inter font, 13px uppercase, 32px gap (gap-8) */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-inter font-medium uppercase tracking-[0.04em]">
          {["Markets", "Trade", "Dashboard", "Pro", "Learn"].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`}
              className="text-[#F5EDD6]/60 hover:text-[#F5EDD6] relative group transition-colors duration-200 py-2"
            >
              {item}
              {/* [CASHFLOZ UI] — Hover Effects: Left-to-right sliding underline */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E8602C] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* [CASHFLOZ UI] — Spacing: 24px gap between auth actions (gap-6) */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[13px] font-inter font-medium uppercase tracking-[0.04em] text-[#F5EDD6]/60 hover:text-[#F5EDD6] transition-colors duration-200">
            Log In
          </Link>
          {/* [CASHFLOZ UI] — Visual Effects: Primary button glow and active-press scale */}
          <Button 
            className="hidden sm:inline-flex h-9 px-5 bg-[#E8602C] text-[#0A0A0F] font-space-grotesk font-bold text-sm tracking-wide rounded-lg shadow-[0_0_15px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:bg-[#E8602C]/90 hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 border-none"
          >
            START TRADING
          </Button>
        </div>
      </div>
    </motion.header>
  )
}