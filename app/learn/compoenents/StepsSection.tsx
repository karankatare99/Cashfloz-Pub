"use client"
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { containerVariants, fadeUpVariants, slideRightVariants } from "./animations"
import { STEPS } from "./data"

export function StepsSection() {
  return (
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
  )
}