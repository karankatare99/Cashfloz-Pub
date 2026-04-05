"use client"
import React from "react"
import { Navbar } from "../components/layout/Navbar"
import { LiveTicker } from "../components/layout/LiveTicker"


import { HeroSection } from "./home-components/HeroSection"
import { StatsSection } from "./home-components/StatsSection"
import { FeaturesSection } from "./home-components/FeaturesSection"
import { TestimonialsSection } from "./home-components/TestimonialsSection"
import { Footer } from "./home-components/Footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-navy overflow-hidden">
      <Navbar />
      <LiveTicker />

      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}