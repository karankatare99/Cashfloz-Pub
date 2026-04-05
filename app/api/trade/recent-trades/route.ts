import { NextResponse } from "next/server"

const BASE_PRICE = 64231.00

function randomTime(): string {
  const now  = new Date()
  const secs = Math.floor(Math.random() * 59)
  now.setSeconds(now.getSeconds() - secs)
  return now.toTimeString().slice(0, 8)
}

export async function GET() {
  const trades = Array.from({ length: 12 }, () => {
    const type   = Math.random() > 0.5 ? "buy" : "sell"
    const price  = parseFloat((BASE_PRICE + (Math.random() - 0.5) * 10).toFixed(2))
    const amount = parseFloat((Math.random() * 1.5 + 0.001).toFixed(3))
    return {
      type,
      price:  price.toLocaleString("en-US", { minimumFractionDigits: 2 }),
      amount: amount.toFixed(3),
      time:   randomTime(),
    }
  }).sort((a, b) => b.time.localeCompare(a.time))

  return NextResponse.json({ trades })
}