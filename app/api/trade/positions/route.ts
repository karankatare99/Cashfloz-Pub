import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SESSION_COOKIE } from "@/lib/auth"

const DUMMY_POSITIONS = [
  {
    symbol:     "BTC/USD",
    size:       "0.500",
    entryPrice: "62,100.00",
    liqPrice:   "51,000.00",
    baseMarkPrice: 64231.00,
    entryRaw:   62100.00,
    sizeRaw:    0.500,
  },
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
      const markPrice = parseFloat(
        (p.baseMarkPrice + (Math.random() - 0.5) * 40).toFixed(2)
      )
      const pnlRaw    = (markPrice - p.entryRaw) * p.sizeRaw
      const pnlPct    = ((markPrice - p.entryRaw) / p.entryRaw) * 100

      return {
        symbol:     p.symbol,
        size:       p.size,
        entryPrice: p.entryPrice,
        markPrice:  markPrice.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        liqPrice:   p.liqPrice,
        pnl:        `${pnlRaw >= 0 ? "+" : ""}${pnlRaw.toFixed(2)} (${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(2)}%)`,
        pnlStatus:  pnlRaw >= 0 ? "positive" : "negative",
      }
    })

    return NextResponse.json({ positions })
  } catch (err) {
    console.error("[trade/positions]", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}