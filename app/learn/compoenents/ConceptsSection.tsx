"use client"
import React from "react"
import { motion } from "framer-motion"
import { containerVariants, fadeUpVariants } from "./animations"
import { CONCEPTS } from "./data"

export function ConceptsSection() {
  return (
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
  )
}