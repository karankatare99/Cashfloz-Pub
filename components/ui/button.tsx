"use client"
import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "outline" | "ghost" | "buy" | "sell"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    // [CASHFLOZ UI] — Typography & Effects: Inter font, smooth transitions, Ember focus ring
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8602C]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] disabled:pointer-events-none disabled:opacity-50 font-inter"
    
    // [CASHFLOZ UI] — Colors & Visuals: Glassmorphic borders, cream text, glowing primary states
    const variants = {
      default: "bg-white/[0.04] text-[#F5EDD6] hover:bg-white/[0.08] border border-white/[0.08] shadow-sm",
      outline: "border border-white/[0.1] bg-transparent hover:bg-white/[0.04] text-[#F5EDD6]/80 hover:text-[#F5EDD6]",
      ghost: "hover:bg-white/[0.04] hover:text-[#F5EDD6] text-[#F5EDD6]/60",
      // Primary Action (Buy)
      buy: "bg-[#00FF88] text-[#0A0A0F] font-space-grotesk font-bold tracking-wide shadow-[0_0_15px_rgba(0,255,136,0.15)] hover:shadow-[0_0_24px_rgba(0,255,136,0.35)] border-none",
      // Secondary Action (Sell) - using Ember for consistency
      sell: "bg-[#E8602C] text-[#0A0A0F] font-space-grotesk font-bold tracking-wide shadow-[0_0_15px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] border-none",
    }
    
    // [CASHFLOZ UI] — Spacing Pass: 8px grid aligned (32px, 40px, 48px heights), 8-12px border radii
    const sizes = {
      default: "h-10 px-4 py-2 rounded-lg",
      sm: "h-8 rounded-md px-3 text-[13px]",
      lg: "h-12 rounded-xl px-8 text-[15px]",
      icon: "h-10 w-10 rounded-lg",
    }

    return (
      <motion.button
        ref={ref}
        // [CASHFLOZ UI] — Micro-interactions: scale(1.02) + translateY(-2px) on hover, scale(0.96) on press
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"