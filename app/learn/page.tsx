"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Link from "next/link"
import { Navbar } from "../../components/layout/Navbar"
import { 
  ChevronDown, ArrowRight, Wallet, Activity, 
  Layers, Percent, TerminalSquare, LayoutDashboard
} from "lucide-react"
import axios from "axios"

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
}

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
}

// --- Static Data ---
const STATS = [
  { label: "Starting Balance", value: "100K", icon: Wallet, color: "text-[#E8602C]", bg: "bg-[#E8602C]/10" },
  { label: "Assets", value: "200+", icon: Layers, color: "text-[#00FF88]", bg: "bg-[#00FF88]/10" },
  { label: "Commission", value: "0%", icon: Percent, color: "text-[#E8602C]", bg: "bg-[#E8602C]/10" },
  { label: "Market Data", value: "Real-Time", icon: Activity, color: "text-[#00FF88]", bg: "bg-[#00FF88]/10" },
]

const CONCEPTS = [
  { id: "01", title: "Order Book", desc: "A real-time electronic list of buy and sell orders for a specific asset, organized by price level." },
  { id: "02", title: "Market vs Limit", desc: "Market orders execute immediately at current prices. Limit orders execute only at your specified target price." },
  { id: "03", title: "Bid/Ask Spread", desc: "The difference between the highest price a buyer is willing to pay (bid) and lowest a seller will accept (ask)." },
  { id: "04", title: "Candlestick Charts", desc: "Visual representations of price movements showing the open, high, low, and close prices for a specific time period." },
  { id: "05", title: "Position Sizing", desc: "Determining the exact dollar amount or number of units to trade to manage risk effectively in your portfolio." },
  { id: "06", title: "Stop Loss & Take Profit", desc: "Automated exit orders designed to limit your potential losses or lock in your profits when you are away from the screen." },
]

const STEPS = [
  { title: "Create your free account", desc: "Sign up in seconds to claim your $100,000 paper trading portfolio.", link: "/register", linkText: "Sign Up" },
  { title: "Explore the markets", desc: "Browse hundreds of real-world assets with live price feeds and charts.", link: "/markets", linkText: "View Markets" },
  { title: "Place your first paper trade", desc: "Use the trade terminal to buy or sell assets risk-free using market or limit orders.", link: "/trade", linkText: "Trade Now" },
  { title: "Track your portfolio", desc: "Monitor your PnL, manage open positions, and review your order history.", link: "/dashboard", linkText: "Go to Dashboard" },
]

const GLOSSARY = [
  { term: "Bull Market", def: "A market condition where asset prices are generally rising or expected to rise." },
  { term: "Bear Market", def: "A market condition where asset prices are generally falling or expected to fall." },
  { term: "Leverage", def: "Using borrowed capital to increase the potential return (and risk) of an investment." },
  { term: "Margin", def: "The collateral that an investor has to deposit with their broker to cover credit risk." },
  { term: "Liquidation", def: "The forceful closing of a trader's position by the exchange due to insufficient margin." },
  { term: "Volatility", def: "A statistical measure of the dispersion of returns for a given security or market index." },
  { term: "Portfolio", def: "A collection of financial investments like stocks, bonds, commodities, cash, and their equivalents." },
  { term: "Hedge", def: "An investment made with the intention of reducing the risk of adverse price movements in an asset." },
  { term: "Long", def: "Buying an asset with the expectation that it will rise in value over time." },
  { term: "Short", def: "Selling a borrowed asset with the expectation that its price will fall, allowing it to be bought back cheaper." },
  { term: "ATH", def: "All-Time High. The highest price an asset has ever reached in its history." },
  { term: "Drawdown", def: "The peak-to-trough decline during a specific record period of an investment or fund." },
]

const FAQS = [
  { q: "Is Cashfloz free to use?", a: "Yes, entirely free. Cashfloz is a portfolio project and educational tool designed to simulate trading mechanics." },
  { q: "Is this real money?", a: "No. All funds, balances, and trades on Cashfloz are simulated 'paper' money. No real financial transactions occur." },
  { q: "How is the price data generated?", a: "We pull delayed/simulated data from public APIs or generate realistic algorithmic movements for demonstration purposes." },
  { q: "Can I lose real money here?", a: "Absolutely not. Since no real money is ever deposited, there is zero financial risk involved in using this platform." },
  { q: "What assets can I trade?", a: "We offer a simulated selection of top cryptocurrencies, major forex pairs, and select global equities." },
  { q: "How do I place a trade?", a: "Navigate to the Trade terminal, select your asset, choose your order type (Market/Limit), enter an amount, and execute." },
  { q: "What is paper trading?", a: "Paper trading is simulated trading that allows investors to practice buying and selling without risking real money." },
  { q: "How does the order book work?", a: "Our order book simulates a live market depth, showing the accumulation of buy (bid) and sell (ask) orders at various price levels." },
]

// --- Sub-components ---
function FAQItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/[0.06] overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-[#F5EDD6]"
      >
        <span className="font-inter font-medium text-[15px]">{q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-[#F5EDD6]/40" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pb-5 font-inter text-sm text-[#F5EDD6]/60 leading-relaxed pr-8">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- CTA Section ---
function CTASection({ user }: { user: { username: string } | null }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-xl p-12 text-center flex flex-col items-center shadow-[0_0_80px_rgba(232,96,44,0.08)] relative overflow-hidden"
    >
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E8602C]/10 blur-[100px] pointer-events-none rounded-full" />

      <AnimatePresence mode="wait">
        {user ? (
          // ── Logged in state ───────────────────────────────────────────────
          <motion.div
            key="logged-in"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Avatar circle */}
            <div className="w-16 h-16 rounded-full bg-[#E8602C]/20 border border-[#E8602C]/40 flex items-center justify-center text-[#E8602C] font-space-grotesk font-bold text-2xl uppercase mb-6 shadow-[0_0_24px_rgba(232,96,44,0.2)]">
              {user.username.charAt(0)}
            </div>

            <h2 className="font-space-grotesk text-4xl font-bold mb-3">
              Welcome back,{" "}
              <span className="text-[#E8602C]">{user.username}</span>
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
          // ── Logged out state ──────────────────────────────────────────────
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

// --- Main Page ---
export default function LearnPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user ?? null))
      .catch(() => setUser(null))
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter antialiased">
      <Navbar />

      <main className="flex flex-col">
        {/* 1. Hero */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="pt-32 pb-24 px-6 container mx-auto max-w-5xl flex flex-col items-center text-center mt-12"
        >
          <motion.h1
            variants={fadeUpVariants}
            className="font-space-grotesk text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F5EDD6] to-[#F5EDD6]/50"
          >
            Learn to Trade
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="font-inter text-lg md:text-xl text-[#F5EDD6]/60 max-w-2xl mb-8">
            Everything you need to go from zero to confident trader on Cashfloz
          </motion.p>
          <motion.div variants={fadeUpVariants} className="flex gap-4">
            <span className="bg-[#E8602C]/10 border border-[#E8602C]/20 text-[#E8602C] rounded-full px-4 py-1.5 text-xs font-inter font-medium tracking-wide">
              Beginner Friendly
            </span>
            <span className="bg-[#E8602C]/10 border border-[#E8602C]/20 text-[#E8602C] rounded-full px-4 py-1.5 text-xs font-inter font-medium tracking-wide">
              Always Free
            </span>
          </motion.div>
        </motion.section>

        {/* 2. What is Cashfloz? */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-24 px-6 container mx-auto max-w-5xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUpVariants} className="space-y-6">
              <h2 className="font-space-grotesk text-3xl font-bold">What is Cashfloz?</h2>
              <div className="space-y-4 font-inter text-[#F5EDD6]/60 text-[15px] leading-relaxed">
                <p>Cashfloz is a comprehensive paper trading simulator designed to replicate the mechanics of real-world financial markets.</p>
                <p>Whether you are testing a complex new strategy or just learning how order books function, Cashfloz provides a risk-free sandbox. You start with a virtual balance and execute trades against simulated market data.</p>
                <p>Zero real money is required. Our goal is to help you build confidence, understand market dynamics, and practice portfolio management before you ever put actual capital on the line.</p>
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-xl p-6 flex flex-col justify-center"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="font-space-grotesk text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="font-inter text-xs text-[#F5EDD6]/40 uppercase tracking-wide font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* 3. Core Concepts */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-24 px-6 container mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUpVariants} className="mb-12">
            <span className="text-[#E8602C] text-xs font-bold uppercase tracking-widest mb-3 block">Fundamentals</span>
            <h2 className="font-space-grotesk text-3xl font-bold">Trading concepts you need to know</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONCEPTS.map((concept) => (
              <motion.div
                key={concept.id}
                variants={fadeUpVariants}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-xl p-6 hover:scale-[1.02] hover:border-white/[0.12] transition-all duration-200 group flex flex-col"
              >
                <div className="font-jetbrains-mono text-xl text-[#E8602C] mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{concept.id}</div>
                <h3 className="font-space-grotesk text-lg font-bold mb-3">{concept.title}</h3>
                <p className="font-inter text-sm text-[#F5EDD6]/60 leading-relaxed">{concept.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 4. How to use Cashfloz */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-24 px-6 container mx-auto max-w-5xl"
        >
          <motion.h2 variants={fadeUpVariants} className="font-space-grotesk text-3xl font-bold mb-12">
            How to use Cashfloz
          </motion.h2>

          <div className="max-w-2xl">
            {STEPS.map((step, i) => (
              <motion.div key={i} variants={slideRightVariants} className="flex gap-6 relative pb-12 last:pb-0">
                {i !== STEPS.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2" />
                )}
                <div className="relative z-10 shrink-0 w-10 h-10 rounded-full border border-[#E8602C]/40 bg-[#E8602C]/10 text-[#E8602C] flex items-center justify-center font-jetbrains-mono font-bold text-sm">
                  {i + 1}
                </div>
                <div className="pt-2">
                  <h3 className="font-space-grotesk text-xl font-bold mb-2">{step.title}</h3>
                  <p className="font-inter text-[#F5EDD6]/60 text-[15px] mb-4 leading-relaxed">{step.desc}</p>
                  <Link href={step.link} className="inline-flex items-center gap-1.5 text-sm font-inter text-[#E8602C] hover:text-[#E8602C]/80 transition-colors">
                    {step.linkText} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 5. Glossary */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-24 px-6 container mx-auto max-w-5xl"
        >
          <motion.h2 variants={fadeUpVariants} className="font-space-grotesk text-3xl font-bold mb-8">
            Quick Reference Glossary
          </motion.h2>

          <motion.div variants={fadeUpVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {GLOSSARY.map((item, i) => (
              <div key={i} className="py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors -mx-4 px-4 rounded-lg">
                <div className="font-space-grotesk font-bold text-[#F5EDD6] mb-1">{item.term}</div>
                <div className="font-inter text-sm text-[#F5EDD6]/60 leading-relaxed pr-4">{item.def}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* 6. FAQ */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-24 px-6 container mx-auto max-w-3xl"
        >
          <motion.h2 variants={fadeUpVariants} className="font-space-grotesk text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </motion.h2>

          <motion.div variants={fadeUpVariants} className="border-t border-white/[0.06]">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFAQ === i}
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </motion.div>
        </motion.section>

        {/* 7. CTA */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-32 px-6 container mx-auto max-w-5xl"
        >
          <CTASection user={user} />
        </motion.section>
      </main>
    </div>
  )
}