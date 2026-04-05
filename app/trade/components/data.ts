import { UTCTimestamp } from "lightweight-charts"

export const generateCandleData = () => {
  const data = []
  let time = Math.floor(Date.now() / 1000) - 100000
  let open = 64000
  for (let i = 0; i < 200; i++) {
    const close = open + (Math.random() - 0.5) * 1000
    const high = Math.max(open, close) + Math.random() * 500
    const low = Math.min(open, close) - Math.random() * 500
    data.push({ time: time as UTCTimestamp, open, high, low, close })
    open = close
    time += 3600 
  }
  return data
}

export const generateOrderBookData = () => {
  const bids = Array.from({ length: 15 }).map((_, i) => ({
    price: 64230.50 - i * 0.5,
    size: (Math.random() * 2).toFixed(3),
    total: (Math.random() * 10).toFixed(3),
    depth: Math.random() * 100
  }))
  const asks = Array.from({ length: 15 }).map((_, i) => ({
    price: 64231.00 + i * 0.5,
    size: (Math.random() * 2).toFixed(3),
    total: (Math.random() * 10).toFixed(3),
    depth: Math.random() * 100
  })).reverse()
  return { bids, asks }
}

export const mockRecentTrades = [
  { price: "64,231.00", amount: "0.045", time: "12:30:45", type: 'buy' },
  { price: "64,230.50", amount: "1.200", time: "12:30:44", type: 'sell' },
  { price: "64,230.50", amount: "0.010", time: "12:30:42", type: 'buy' },
  { price: "64,230.00", amount: "0.500", time: "12:30:40", type: 'sell' },
]

export const mockPositions = [
  {
    symbol: "BTC/USD",
    size: "0.500",
    entryPrice: "62,100.00",
    markPrice: "64,231.00",
    liqPrice: "51,000.00",
    pnl: "+1,065.50 (1.65%)",
    pnlStatus: "positive"
  }
]
