"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { createChart, ColorType, IChartApi } from "lightweight-charts"
import { panelVariants } from "./animations"
import { generateCandleData } from "./data"

export function ChartPanel() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const [activeRes, setActiveRes] = useState("1H")
  const [chartType, setChartType] = useState("Candles")

  useEffect(() => {
    if (!chartContainerRef.current) return
    const container = chartContainerRef.current

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(245, 237, 214, 0.4)",
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.04)" },
        horzLines: { color: "rgba(255, 255, 255, 0.04)" },
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
      },
      crosshair: {
        mode: 0,
        vertLine: { color: "rgba(255, 255, 255, 0.2)", labelBackgroundColor: "#E8602C" },
        horzLine: { color: "rgba(255, 255, 255, 0.2)", labelBackgroundColor: "#E8602C" },
      },
    })
    
    chartRef.current = chart

    const series = chart.addCandlestickSeries({
      upColor: '#00FF88',
      downColor: '#E8602C',
      borderVisible: false,
      wickUpColor: '#00FF88',
      wickDownColor: '#E8602C',
    })
    
    series.setData(generateCandleData())

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth })
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [activeRes, chartType])

  return (
    <motion.div variants={panelVariants} className="flex-1 flex flex-col h-full bg-[#0A0A0F] relative border-r border-white/[0.06]">
      <div className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 bg-white/[0.01]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F7931A] to-[#F7931A]/20 flex items-center justify-center font-space-grotesk font-bold text-[15px] text-[#0A0A0F] shadow-[0_4px_12px_rgba(247,147,26,0.15)]">₿</div>
             <div>
               <div className="font-space-grotesk font-bold text-[#F5EDD6] text-xl tracking-tight">BTC / USD</div>
             </div>
          </div>
          <div className="hidden lg:flex gap-6 font-jetbrains-mono text-[13px]">
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h Change</span><span className="text-[#00FF88] font-medium">+1,560.20 (+2.45%)</span></div>
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h High</span><span className="text-[#F5EDD6] font-medium">65,100.00</span></div>
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h Low</span><span className="text-[#F5EDD6] font-medium">62,900.00</span></div>
             <div><span className="text-[#F5EDD6]/40 text-[10px] font-inter uppercase tracking-wide block mb-0.5">24h Vol</span><span className="text-[#F5EDD6] font-medium">32.4B</span></div>
          </div>
        </div>
      </div>
      
      <div className="h-12 border-b border-white/[0.04] flex items-center px-6 justify-between bg-transparent hidden sm:flex">
         <div className="flex gap-1">
            {["1m", "5m", "15m", "1H", "4H", "1D"].map(res => (
               <button 
                  key={res} 
                  onClick={() => setActiveRes(res)}
                  className={`px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-all duration-200 ${activeRes === res ? 'bg-white/[0.06] text-[#F5EDD6]' : 'text-[#F5EDD6]/40 hover:text-[#F5EDD6]/80 hover:bg-white/[0.02]'}`}
               >
                 {res}
               </button>
            ))}
         </div>
         <div className="flex gap-1">
             <button 
                  onClick={() => setChartType("Candles")}
                  className={`px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-all ${chartType === "Candles" ? 'text-[#E8602C] bg-[#E8602C]/10' : 'text-[#F5EDD6]/40 hover:text-[#F5EDD6]/80'}`}>Candles</button>
             <button 
                  onClick={() => setChartType("Line")}
                  className={`px-3 py-1.5 rounded-lg font-inter text-xs font-medium transition-all ${chartType === "Line" ? 'text-[#E8602C] bg-[#E8602C]/10' : 'text-[#F5EDD6]/40 hover:text-[#F5EDD6]/80'}`}>Line</button>
         </div>
      </div>

      <div ref={chartContainerRef} className="flex-1 w-full h-full min-h-0 relative"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] text-[180px] font-space-grotesk font-black tracking-[-0.04em] text-white selection:bg-transparent">
        CASHFLOZ
      </div>
    </motion.div>
  )
}
