"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { containerVariants, fadeUpVariants } from "./animations"
import { FAQS } from "./data"

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

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
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
  )
}