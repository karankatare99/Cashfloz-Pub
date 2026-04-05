import { NextResponse } from "next/server"

const BASE_PRICE = 64231.50
const HIGH_24H   = 65100.00
const LOW_24H    = 62900.00
const VOLUME_24H = "32.4B"

export async function GET() {
  
  const swing      = (Math.random() - 0.5) * 2 * BASE_PRICE * 0.01
  const price      = parseFloat((BASE_PRICE + swing).toFixed(2))
  const change     = parseFloat((price - 62670.00).toFixed(2))   
  const changePct  = parseFloat(((change / 62670.00) * 100).toFixed(2))

  return NextResponse.json({
    symbol:    "BTC/USD",
    price,
    change,
    changePct,
    high24h:   HIGH_24H,
    low24h:    LOW_24H,
    volume24h: VOLUME_24H,
    positive:  change >= 0,
  })
}