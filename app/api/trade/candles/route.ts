import { NextRequest, NextResponse } from "next/server"

// Timeframe → seconds per candle
const TIMEFRAME_SECONDS: Record<string, number> = {
  "1m":  60,
  "5m":  300,
  "15m": 900,
  "1H":  3600,
  "4H":  14400,
  "1D":  86400,
}

// Each timeframe has its own volatility feel
const TIMEFRAME_VOLATILITY: Record<string, number> = {
  "1m":  80,
  "5m":  200,
  "15m": 350,
  "1H":  700,
  "4H":  1200,
  "1D":  2000,
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const timeframe = searchParams.get("timeframe") ?? "1H"

  const interval   = TIMEFRAME_SECONDS[timeframe]  ?? 3600
  const volatility = TIMEFRAME_VOLATILITY[timeframe] ?? 700
  const count      = 200

  const now  = Math.floor(Date.now() / 1000)
  const start = now - interval * count

  const candles = []
  let open = 62000

  for (let i = 0; i < count; i++) {
    const time  = start + i * interval
    const close = open + (Math.random() - 0.5) * volatility
    const high  = Math.max(open, close) + Math.random() * (volatility * 0.3)
    const low   = Math.min(open, close) - Math.random() * (volatility * 0.3)
    const volume = parseFloat((Math.random() * 500 + 50).toFixed(2))

    candles.push({
      time,
      open:   parseFloat(open.toFixed(2)),
      high:   parseFloat(high.toFixed(2)),
      low:    parseFloat(low.toFixed(2)),
      close:  parseFloat(close.toFixed(2)),
      volume,
    })

    open = close
  }

  return NextResponse.json({ timeframe, candles })
}