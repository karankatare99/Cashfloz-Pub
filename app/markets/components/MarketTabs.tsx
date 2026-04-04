"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react"

interface MarketTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MarketTabs({ activeTab, setActiveTab }: MarketTabsProps) {
  const categories = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"]

  return (
    <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="bg-transparent overflow-x-auto border-b border-white/[0.06] w-full justify-start rounded-none h-auto p-0 gap-6">
        {categories.map(tab => (
          <TabsTrigger
            key={tab} 
            value={tab} 
            className="font-inter font-medium uppercase tracking-[0.04em] text-[13px] px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#E8602C] data-[state=active]:text-[#E8602C] text-[#F5EDD6]/50 data-[state=active]:bg-transparent hover:text-[#F5EDD6] transition-colors"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}