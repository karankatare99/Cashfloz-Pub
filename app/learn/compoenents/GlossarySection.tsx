"use client"
import React from "react"
import { motion } from "framer-motion"
import { containerVariants, fadeUpVariants } from "./animations"
import { GLOSSARY } from "./data"

export function GlossarySection() {
  return (
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
  )
}