import { NextResponse } from "next/server"

const MID_PRICE = 64231.00

export async function GET() {
  // Slight mid-price drift on each call
  const mid = MID_PRICE + (Math.random() - 0.5) * 20

  const asks = Array.from({ length: 15 }, (_, i) => {
    const price = parseFloat((mid + 0.50 + i * 0.50).toFixed(2))
    const size  = parseFloat((Math.random() * 2 + 0.01).toFixed(3))
    return { price, size: size.toFixed(3), depth: Math.random() * 100 }
  }).reverse()

  const bids = Array.from({ length: 15 }, (_, i) => {
    const price = parseFloat((mid - i * 0.50).toFixed(2))
    const size  = parseFloat((Math.random() * 2 + 0.01).toFixed(3))
    return { price, size: size.toFixed(3), depth: Math.random() * 100 }
  })

  const spread = parseFloat((asks[asks.length - 1].price - bids[0].price).toFixed(2))

  return NextResponse.json({
    bids,
    asks,
    spread: spread > 0 ? spread : 0.50,
    midPrice: parseFloat(mid.toFixed(2)),
  })
}