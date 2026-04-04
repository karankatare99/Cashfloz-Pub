"use client"
import React from "react"
import { motion } from "framer-motion"
import { containerVariants, fadeUpVariants } from "./animations"

export function HeroSection() {
  return (
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
  )
}