import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE } from "@/lib/auth"
import prisma from "@/lib/prisma"

const DUMMY_POSITIONS = [
  { asset: "BTC-USD", size: "0.50", entryPrice: 62100.00, currentPrice: 64231.50 },
  { asset: "ETH-USD", size: "10.00", entryPrice: 3500.00, currentPrice: 3450.20 },
  { asset: "SOL-USD", size: "25.00", entryPrice: 140.00, currentPrice: 145.60 },
  { asset: "AAPL",    size: "15.00", entryPrice: 178.00, currentPrice: 173.50 },
]

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value
    if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 })

    const session = await prisma.session.findUnique({
      where: { token },
      select: { expiresAt: true },
    })

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const positions = DUMMY_POSITIONS.map((p) => {
      const size = parseFloat(p.size)
      
      const livePrice = parseFloat(
        (p.currentPrice * (1 + (Math.random() - 0.5) * 0.004)).toFixed(2)
      )
      const pnl = parseFloat(((livePrice - p.entryPrice) * size).toFixed(2))
      const pnlPct = parseFloat((((livePrice - p.entryPrice) / p.entryPrice) * 100).toFixed(2))

      return {
        asset: p.asset,
        size: p.size,
        entryPrice: p.entryPrice.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        currentPrice: livePrice.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        pnl,
        pnlPct,
      }
    })

    return NextResponse.json({ positions })
  } catch (err) {
    console.error("[dashboard/positions]", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}