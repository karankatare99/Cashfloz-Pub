"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { TerminalSquare, LayoutDashboard } from "lucide-react"
import { fadeUpVariants } from "./animations"

export function CTASection({ user }: { user: { username: string } | null }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-xl p-12 text-center flex flex-col items-center shadow-[0_0_80px_rgba(232,96,44,0.08)] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E8602C]/10 blur-[100px] pointer-events-none rounded-full" />

      <AnimatePresence mode="wait">
        {user ? (
          <motion.div
            key="logged-in"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center relative z-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#E8602C]/20 border border-[#E8602C]/40 flex items-center justify-center text-[#E8602C] font-space-grotesk font-bold text-2xl uppercase mb-6 shadow-[0_0_24px_rgba(232,96,44,0.2)]">
              {user.username.charAt(0)}
            </div>

            <h2 className="font-space-grotesk text-4xl font-bold mb-3">
              Welcome back, <span className="text-[#E8602C]">{user.username}</span>
            </h2>
            <p className="font-inter text-[#F5EDD6]/60 mb-10 max-w-md">
              You already have an account. Head to your dashboard to check your portfolio, or jump straight into the markets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/dashboard"
                className="px-8 py-3.5 bg-[#E8602C] hover:bg-[#E8602C]/90 text-[#0A0A0F] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
              <Link
                href="/trade"
                className="px-8 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[#F5EDD6] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center"
              >
                Start Trading
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="logged-out"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center relative z-10"
          >
            <TerminalSquare className="w-12 h-12 text-[#E8602C] mb-6" />
            <h2 className="font-space-grotesk text-4xl font-bold mb-4">Ready to start trading?</h2>
            <p className="font-inter text-[#F5EDD6]/60 mb-10 max-w-md">
              Open your free account today and practice your strategies with a $100,000 paper trading portfolio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-[#E8602C] hover:bg-[#E8602C]/90 text-[#0A0A0F] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] flex items-center justify-center"
              >
                Create Account
              </Link>
              <Link
                href="/markets"
                className="px-8 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[#F5EDD6] font-space-grotesk font-semibold text-[15px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center"
              >
                Explore Markets
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}