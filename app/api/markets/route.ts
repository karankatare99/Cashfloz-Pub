import { NextResponse } from "next/server"

const BASE_MARKETS = [
  { id: 1,  name: "Bitcoin",    symbol: "BTC",    type: "Crypto",      basePrice: 64231.50, volume: "32.4B", marketCap: "1.2T"  },
  { id: 2,  name: "Ethereum",   symbol: "ETH",    type: "Crypto",      basePrice: 3450.20,  volume: "15.1B", marketCap: "415B"  },
  { id: 3,  name: "Solana",     symbol: "SOL",    type: "Crypto",      basePrice: 145.60,   volume: "4.2B",  marketCap: "65B"   },
  { id: 4,  name: "BNB",        symbol: "BNB",    type: "Crypto",      basePrice: 412.80,   volume: "2.1B",  marketCap: "62B"   },
  { id: 5,  name: "XRP",        symbol: "XRP",    type: "Crypto",      basePrice: 0.5820,   volume: "3.8B",  marketCap: "32B"   },
  { id: 6,  name: "EUR/USD",    symbol: "EURUSD", type: "Forex",       basePrice: 1.0845,   volume: "850B",  marketCap: "-"     },
  { id: 7,  name: "GBP/USD",    symbol: "GBPUSD", type: "Forex",       basePrice: 1.2701,   volume: "420B",  marketCap: "-"     },
  { id: 8,  name: "USD/JPY",    symbol: "USDJPY", type: "Forex",       basePrice: 149.82,   volume: "380B",  marketCap: "-"     },
  { id: 9,  name: "USD/CAD",    symbol: "USDCAD", type: "Forex",       basePrice: 1.3612,   volume: "180B",  marketCap: "-"     },
  { id: 10, name: "Gold",       symbol: "XAU",    type: "Commodities", basePrice: 2340.10,  volume: "120B",  marketCap: "-"     },
  { id: 11, name: "Silver",     symbol: "XAG",    type: "Commodities", basePrice: 27.45,    volume: "18B",   marketCap: "-"     },
  { id: 12, name: "Crude Oil",  symbol: "WTI",    type: "Commodities", basePrice: 81.20,    volume: "95B",   marketCap: "-"     },
  { id: 13, name: "Natural Gas",symbol: "NATGAS", type: "Commodities", basePrice: 2.14,     volume: "12B",   marketCap: "-"     },
  { id: 14, name: "Apple",      symbol: "AAPL",   type: "Stocks",      basePrice: 173.50,   volume: "10.5B", marketCap: "2.8T"  },
  { id: 15, name: "Tesla",      symbol: "TSLA",   type: "Stocks",      basePrice: 175.22,   volume: "25.2B", marketCap: "560B"  },
  { id: 16, name: "Microsoft",  symbol: "MSFT",   type: "Stocks",      basePrice: 415.30,   volume: "14.8B", marketCap: "3.1T"  },
  { id: 17, name: "NVIDIA",     symbol: "NVDA",   type: "Stocks",      basePrice: 875.40,   volume: "42.1B", marketCap: "2.1T"  },
  { id: 18, name: "Amazon",     symbol: "AMZN",   type: "Stocks",      basePrice: 182.10,   volume: "18.3B", marketCap: "1.9T"  },
  { id: 19, name: "S&P 500",    symbol: "SPY",    type: "Indices",     basePrice: 523.44,   volume: "85B",   marketCap: "-"     },
  { id: 20, name: "NASDAQ 100", symbol: "QQQ",    type: "Indices",     basePrice: 445.22,   volume: "62B",   marketCap: "-"     },
  { id: 21, name: "Dow Jones",  symbol: "DIA",    type: "Indices",     basePrice: 389.10,   volume: "28B",   marketCap: "-"     },
  { id: 22, name: "FTSE 100",   symbol: "ISF",    type: "Indices",     basePrice: 77.54,    volume: "8B",    marketCap: "-"     },
]

// Simulate a realistic price tick — small random walk within ±2% of base
function simulatePrice(basePrice: number): number {
  const maxSwing = basePrice * 0.02
  const swing = (Math.random() - 0.5) * 2 * maxSwing
  return parseFloat((basePrice + swing).toFixed(basePrice < 10 ? 4 : 2))
}

// Simulate a 24h change between -5% and +5%
function simulateChange(): number {
  return parseFloat(((Math.random() - 0.5) * 10).toFixed(2))
}

export async function GET() {
  const markets = BASE_MARKETS.map((m) => {
    const change = simulateChange()
    const price = simulatePrice(m.basePrice)
    return {
      id: m.id,
      name: m.name,
      symbol: m.symbol,
      type: m.type,
      price,
      change,
      volume: m.volume,
      marketCap: m.marketCap,
      sparkline: change >= 0 ? "up" : "down",
    }
  })

  return NextResponse.json({ markets })
}