"use client"
import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const TESTIMONIALS = [
  { name: "Alex R.", role: "Prop Trader", text: "The execution speed is unmatched. Cashfloz's routing algorithms have saved me thousands in slippage alone." },
  { name: "Sarah M.", role: "Quant Analyst", text: "Finally, a platform that gives me true tick-level data without paying exorbitant institutional terminal fees." },
  { name: "David K.", role: "Hedge Fund Manager", text: "Managing multi-asset portfolios across crypto and traditional equities in one neat, dark aesthetic UI. Phenomenal." },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-navy px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syne text-3xl lg:text-5xl font-extrabold text-white mb-4">TRUSTED BY PROFESSIONALS</h2>
          <p className="font-inter text-gray-medium max-w-2xl mx-auto">Don't just take our word for it. Hear from top traders and institutional partners.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-gray-border/50 bg-navy-light/60">
                <CardContent className="p-8 pt-8 flex flex-col h-full relative">
                  <div className="text-accent text-6xl font-syne opacity-20 absolute top-4 left-6">"</div>
                  <p className="font-inter text-gray-light italic relative z-10 text-lg flex-grow">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-dark to-navy flex items-center justify-center font-bold font-syne text-white border border-gray-border">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-dm-sans text-white font-bold">{testimonial.name}</div>
                      <div className="font-jetbrains-mono text-xs text-accent uppercase tracking-wider">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}