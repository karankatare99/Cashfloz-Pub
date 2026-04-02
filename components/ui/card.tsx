"use client"
import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // [CASHFLOZ UI] — Colors & Visuals: Glassmorphic background, subtle border, inset glow + deep shadow
      className={cn(
        "rounded-2xl border border-white/[0.06] bg-white/[0.02] text-[#F5EDD6] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_12px_40px_rgba(0,0,0,0.4)] flex flex-col transition-all duration-300 ease-out",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // [CASHFLOZ UI] — Spacing: Strictly 24px (p-6) padding, 8px vertical gap
      className={cn("flex flex-col space-y-2 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      // [CASHFLOZ UI] — Typography: Inherits Space Grotesk for prominent card titles
      className={cn("font-semibold leading-none tracking-tight font-space-grotesk text-[#F5EDD6]", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    // [CASHFLOZ UI] — Spacing: 24px (p-6) padding on all sides to prevent edge-touching
    <div ref={ref} className={cn("p-6 pt-0 flex-1", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }