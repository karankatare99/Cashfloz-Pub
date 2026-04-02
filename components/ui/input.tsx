"use client"
import * as React from "react"
import { cn } from "../../lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <motion.div
        // [CASHFLOZ UI] — Micro-interactions: Spring-damped scale effect when the child input receives focus
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative w-full"
      >
        <input
          type={type}
          className={cn(
            // [CASHFLOZ UI] — Spacing & Typography: 48px height (h-12), 16px padding (px-4), Inter font
            "flex h-12 w-full rounded-xl border border-white/[0.08] bg-[#0A0A0F] px-4 py-2 text-[15px] text-[#F5EDD6] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out",
            "file:border-0 file:bg-transparent file:text-[15px] file:font-medium",
            // [CASHFLOZ UI] — Colors: Cream text with opacity for placeholders, Ember for focus rings
            "placeholder:text-[#F5EDD6]/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8602C]/20 focus-visible:border-[#E8602C]/50",
            "disabled:cursor-not-allowed disabled:opacity-50 font-inter",
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  }
)
Input.displayName = "Input"

export { Input }