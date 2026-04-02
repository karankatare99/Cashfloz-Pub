"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"

function FocusRingInput({ type, placeholder }: { type: string, placeholder: string }) {
  const [focused, setFocused] = useState(false)
  
  return (
    // [CASHFLOZ UI] — Spacing: Added group and transition structure
    <div className="relative rounded-xl group">
      {/* [CASHFLOZ UI] — Visual Effects: Ember gradient focus ring with smooth opacity toggle */}
      <div 
        className={`absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#E8602C] via-[#E8602C]/60 to-transparent opacity-0 blur-[4px] transition-opacity duration-300 ease-out z-0 ${focused ? "opacity-100" : ""}`}
      />
      
      {/* [CASHFLOZ UI] — Colors & Glassmorphism: Darker input background with subtle border */}
      <div className="relative z-10 bg-[#0A0A0F] rounded-xl border border-white/[0.08] transition-colors duration-200 hover:border-white/[0.15] overflow-hidden">
         <Input 
           type={type} 
           placeholder={placeholder}
           onFocus={() => setFocused(true)}
           onBlur={() => setFocused(false)}
           // [CASHFLOZ UI] — Typography & Spacing: 48px height (h-12), Inter font, transparent background
           className="h-12 w-full text-base font-inter text-[#F5EDD6] placeholder:text-[#F5EDD6]/30 bg-transparent border-none focus-visible:ring-0 focus-visible:outline-none px-4"
         />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    // [CASHFLOZ UI] — Page Transitions & Colors: #0A0A0F base, cream text
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center font-inter px-6 relative overflow-hidden selection:bg-[#E8602C]/30 selection:text-white">
       
       {/* [CASHFLOZ UI] — Visual Effects: Replaced ambient color with subtle Ember glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8602C]/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
       
       {/* [CASHFLOZ UI] — Micro-interactions: Hover scale on the logo */}
       <Link href="/" className="absolute top-8 left-8 flex items-center gap-3 group cursor-pointer z-20 hover:scale-[1.02] transition-transform duration-200 ease-out">
          {/* [CASHFLOZ UI] — Typography: Space Grotesk applied to logo elements */}
          <div className="w-8 h-8 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-xl skew-x-[-10deg]">C</div>
          <span className="font-space-grotesk font-bold text-xl tracking-widest text-[#F5EDD6]">CASHFLOZ</span>
       </Link>
       
       {/* [CASHFLOZ UI] — Animation: Smooth fade and slide up reveal */}
       <motion.div
         initial={{ opacity: 0, scale: 0.96, y: 24 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
         className="w-full max-w-md z-10"
       >
          {/* [CASHFLOZ UI] — Visual Effects: 24px/32px internal padding, subtle borders, inset shadows */}
          <Card className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
             
             {/* [CASHFLOZ UI] — Spacing: 32px padding top/bottom */}
             <CardHeader className="text-center pt-10 pb-6 px-8">
                {/* [CASHFLOZ UI] — Typography: Space Grotesk h2 sizing */}
                <CardTitle className="font-space-grotesk text-3xl font-bold tracking-tight text-[#F5EDD6]">Welcome Back</CardTitle>
                <p className="text-[#F5EDD6]/60 font-inter text-sm mt-3">Log in to access your trading dashboard</p>
             </CardHeader>
             
             {/* [CASHFLOZ UI] — Spacing: 32px padding sides/bottom, 24px gap between sections */}
             <CardContent className="px-8 pb-10 space-y-8">
                
                {/* Social Logins */}
                {/* [CASHFLOZ UI] — Spacing: 16px gap for tight grids */}
                <div className="grid grid-cols-2 gap-4">
                   <Button variant="outline" className="w-full h-12 bg-white/[0.03] border-white/[0.08] text-[#F5EDD6]/80 hover:text-[#F5EDD6] hover:bg-white/[0.06] hover:border-white/[0.15] rounded-xl transition-all duration-200">
                      Google
                   </Button>
                   <Button variant="outline" className="w-full h-12 bg-white/[0.03] border-white/[0.08] text-[#F5EDD6]/80 hover:text-[#F5EDD6] hover:bg-white/[0.06] hover:border-white/[0.15] rounded-xl transition-all duration-200">
                      Apple
                   </Button>
                </div>
                
                <div className="relative flex items-center">
                   <div className="flex-grow border-t border-white/[0.08]"></div>
                   {/* [CASHFLOZ UI] — Typography: Inter label rules (12px, tracking, uppercase) */}
                   <span className="flex-shrink-0 px-4 text-[#F5EDD6]/40 text-xs font-inter tracking-[0.04em] uppercase font-medium">Or continue with email</span>
                   <div className="flex-grow border-t border-white/[0.08]"></div>
                </div>

                {/* [CASHFLOZ UI] — Spacing: 24px gap between form rows */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {/* [CASHFLOZ UI] — Spacing: 8px gap between label and input */}
                  <div className="space-y-2">
                     <label className="text-[13px] text-[#F5EDD6]/70 font-inter font-medium tracking-wide">Email Address</label>
                     <FocusRingInput type="email" placeholder="trade@cashfloz.com" />
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between items-center mb-1">
                        <label className="text-[13px] text-[#F5EDD6]/70 font-inter font-medium tracking-wide">Password</label>
                        <a href="#" className="text-xs text-[#E8602C] hover:text-[#E8602C]/80 hover:underline underline-offset-4 transition-colors font-inter font-medium">Forgot?</a>
                     </div>
                     <FocusRingInput type="password" placeholder="••••••••" />
                  </div>
                  
                  {/* [CASHFLOZ UI] — Visual Effects: Primary button glow and scale interaction */}
                  <Button 
                    className="w-full h-12 mt-2 bg-[#E8602C] text-white text-[15px] font-space-grotesk font-semibold tracking-wide rounded-xl shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:bg-[#E8602C]/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border-none"
                  >
                     LOG IN
                  </Button>
                </form>
             </CardContent>
          </Card>
          
          <div className="text-center mt-8 px-4">
             <span className="text-[#F5EDD6]/50 text-sm font-inter">Don't have an account? </span>
             <Link href="/register" className="text-[#F5EDD6] hover:text-[#E8602C] transition-colors text-sm font-inter font-medium underline underline-offset-4 decoration-white/20 hover:decoration-[#E8602C]/50">
                Register here
             </Link>
          </div>
       </motion.div>
    </div>
  )
}