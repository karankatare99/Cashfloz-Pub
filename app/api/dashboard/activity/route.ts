import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE } from "@/lib/auth"
import prisma from "@/lib/prisma"

const DUMMY_ACTIVITY = [
  { type: "buy",      label: "Bought 0.05 BTC",       detail: "@ 64,120.00",        timeAgo: "2 hrs ago"  },
  { type: "alert",    label: "Margin call avoided",    detail: "ETH longs secured",  timeAgo: "5 hrs ago"  },
  { type: "transfer", label: "Transferred to Vault",   detail: "-5.00 ETH",          timeAgo: "1 day ago"  },
  { type: "sell",     label: "Sold 15 AAPL",           detail: "@ 173.50",           timeAgo: "2 days ago" },
  { type: "buy",      label: "Bought 25 SOL",          detail: "@ 140.00",           timeAgo: "3 days ago" },
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

    return NextResponse.json({ activity: DUMMY_ACTIVITY })
  } catch (err) {
    console.error("[dashboard/activity]", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}