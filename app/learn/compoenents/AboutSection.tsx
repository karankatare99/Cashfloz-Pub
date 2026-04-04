"use client"
import React from "react"
import { motion } from "framer-motion"
import { containerVariants, fadeUpVariants } from "./animations"
import { STATS } from "./data"

export function AboutSection() {
  return (
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
  )
}