"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"


import { Navbar } from "../../components/layout/Navbar" 
import { containerVariants } from "./components/animations"
import { HeroSection } from "./components/HeroSection"
import { AboutSection } from "./components/AboutSection"
import { ConceptsSection } from "./components/ConceptsSection"
import { StepsSection } from "./components/StepsSection"
import { GlossarySection } from "./components/GlossarySection"
import { FAQSection } from "./components/FAQSection"
import { CTASection } from "./components/CTASection"

export default function LearnPage() {
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user ?? null))
      .catch(() => setUser(null))
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F5EDD6] font-inter antialiased">
      <Navbar />

      <main className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <ConceptsSection />
        <StepsSection />
        <GlossarySection />
        <FAQSection />
        
        {}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="pt-16 pb-32 px-6 container mx-auto max-w-5xl"
        >
          <CTASection user={user} />
        </motion.section>
      </main>
    </div>
  )
}