"use client"
import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Hero3DCard } from "./Hero3DCard"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const router = useRouter()

  return (
    <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden px-6">
      <Hero3DCard />
      <div className="container mx-auto relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-2xl"
        >
          <h1 className="font-space-grotesk text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Trade the Future. <br/> <span className="text-accent">Zero Compromises.</span>
          </h1>
          <p className="font-inter text-lg lg:text-xl text-gray-light mb-10 leading-relaxed">
            Cashfloz is the professional multi-asset trading platform built for retail and institutional traders. Real-time charts, deep order books, and advanced execution tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => router.push("/trade")} variant="buy" size="lg" className="w-full sm:w-auto font-syne uppercase tracking-wider text-sm">
              Start Trading <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button onClick={() => router.push("/markets")} variant="outline" size="lg" className="w-full sm:w-auto font-syne uppercase tracking-wider text-sm">
              View Markets
            </Button>
          </div>
        </motion.div>
      </div>
      
      {}
      <div className="absolute inset-0 pointer-events-none z-[-1]" style={{ backgroundImage: "linear-gradient(to right, #1F2937 1px, transparent 1px), linear-gradient(to bottom, #1F2937 1px, transparent 1px)", backgroundSize: "4rem 4rem", opacity: 0.2 }}></div>
    </section>
  )
}