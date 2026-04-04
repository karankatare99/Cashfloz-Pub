import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SESSION_COOKIE } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value
    if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 })

    const session = await prisma.session.findUnique({
      where: { token },
      select: {
        expiresAt: true,
        user: {
          select: {
            portfolio: {
              select: { cashBalance: true }
            }
          }
        }
      }
    })

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const cashBalance = session.user.portfolio?.cashBalance ?? 100000
    const startingBalance = 100000

    // Simulate realistic dummy stats derived from balance
    const pnl24h = parseFloat(((Math.random() - 0.3) * 2000).toFixed(2))
    const pnlRealized = parseFloat((pnl24h * 0.4).toFixed(2))
    const marginUsed = parseFloat((Math.random() * 30 + 5).toFixed(1)) // 5–35%
    const allTimePnl = cashBalance - startingBalance
    const allTimePct = parseFloat(((allTimePnl / startingBalance) * 100).toFixed(2))

    return NextResponse.json({
      cashBalance,
      pnl24h,
      pnlRealized,
      marginUsed,
      allTimePnl,
      allTimePct,
    })
  } catch (err) {
    console.error("[dashboard/stats]", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}