"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    // [CASHFLOZ UI] — Spacing & Colors: 48px height (h-12), #0A0A0F base, subtle border, inset shadow for depth
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-xl bg-[#0A0A0F] border border-white/[0.08] p-1.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      // [CASHFLOZ UI] — Typography & Interactions: Inter font, 200ms transitions, Ember focus ring, Cream active text
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-inter font-medium transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8602C]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-white/[0.1] data-[state=active]:text-[#F5EDD6] data-[state=active]:shadow-sm",
        "data-[state=inactive]:text-[#F5EDD6]/50 data-[state=inactive]:hover:text-[#F5EDD6]/80 data-[state=inactive]:hover:bg-white/[0.04]",
        "z-10",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    // [CASHFLOZ UI] — Spacing & Interactions: 16px top margin (mt-4), Ember focus ring
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8602C]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }