"use client"
import React from "react"
import { motion } from "framer-motion"
import { TradeHeader } from "./components/TradeHeader"
import { OrderBook } from "./components/OrderBook"
import { ChartPanel } from "./components/ChartPanel"
import { OrderEntryPanel } from "./components/OrderEntryPanel"
import { PositionsFooter } from "./components/PositionsFooter"
import { containerVariants } from "./components/animations"

export default function TradeTerminal() {
  return (
    <div className="h-screen w-full bg-[#0A0A0F] text-[#F5EDD6] flex flex-col overflow-hidden max-h-screen selection:bg-[#E8602C]/30 selection:text-white antialiased">
       <TradeHeader />

       <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col md:flex-row min-h-0 relative"
       >
          <OrderBook />
          <ChartPanel />
          <OrderEntryPanel />
       </motion.main>
       
       <PositionsFooter />
    </div>
  )
}
