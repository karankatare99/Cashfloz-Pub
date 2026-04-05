"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { Navbar } from "../components/layout/Navbar" 


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter antialiased flex flex-col selection:bg-[#E8602C]/30 selection:text-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center relative px-6 overflow-hidden">
        {}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#E8602C]/[0.04] blur-[120px] rounded-full pointer-events-none z-0" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl"
        >
          {}
          <motion.div variants={itemVariants} className="relative mb-4 flex items-center justify-center">
            {}
            <span className="absolute top-2 left-3 md:top-3 md:left-4 text-[140px] md:text-[180px] font-jetbrains-mono font-bold text-[#E8602C]/20 select-none tracking-tighter">
              404
            </span>
            {}
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              className="relative text-[140px] md:text-[180px] font-jetbrains-mono font-bold text-[#F5EDD6] leading-none select-none tracking-tighter drop-shadow-[0_0_24px_rgba(245,237,214,0.15)]"
            >
              404
            </motion.span>
          </motion.div>

          {}
          <motion.h1 
            variants={itemVariants} 
            className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight"
          >
            Page not found
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="font-inter text-[#F5EDD6]/60 text-base md:text-lg max-w-md text-center mb-8 leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved. Check the URL or head back to safety.
          </motion.p>

          {}
          <motion.div 
            variants={itemVariants} 
            className="font-jetbrains-mono text-[13px] text-[#F5EDD6]/40 mb-10 text-center bg-white/[0.02] border border-white/[0.06] px-5 py-2.5 rounded-lg backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            &gt; ERROR 404: route '/unknown-path' not found
          </motion.div>

          {}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
          >
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#E8602C] hover:bg-[#E8602C]/90 text-[#0A0A0F] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:-translate-y-0.5 flex items-center justify-center min-w-[180px]"
            >
              Go Home
            </Link>
            <Link
              href="/markets"
              className="px-8 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[#F5EDD6] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center min-w-[180px]"
            >
              View Markets
            </Link>
          </motion.div>

          {}
          <motion.div 
            variants={itemVariants} 
            className="font-inter text-sm text-[#F5EDD6]/40 flex items-center gap-2"
          >
            <span>or try</span>
            <Link href="/dashboard" className="hover:text-[#F5EDD6] transition-colors underline decoration-white/[0.2] hover:decoration-white/[0.6] underline-offset-4">
              /dashboard
            </Link>
            <span>&middot;</span>
            <Link href="/trade" className="hover:text-[#F5EDD6] transition-colors underline decoration-white/[0.2] hover:decoration-white/[0.6] underline-offset-4">
              /trade
            </Link>
            <span>&middot;</span>
            <Link href="/learn" className="hover:text-[#F5EDD6] transition-colors underline decoration-white/[0.2] hover:decoration-white/[0.6] underline-offset-4">
              /learn
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}