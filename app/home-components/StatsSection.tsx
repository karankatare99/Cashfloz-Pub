"use client"
import React from "react"
import { motion } from "framer-motion"

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

export function StatsSection() {
  return (
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
  )
}