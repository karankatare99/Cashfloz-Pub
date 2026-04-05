import { NextRequest, NextResponse } from "next/server"
import { SESSION_COOKIE } from "@/lib/auth"
import prisma from "@/lib/prisma"

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

    return NextResponse.json({
      allocation: [
        { label: "Crypto",      color: "bg-[#00FF88]",                          pct: 45, display: "45%" },
        { label: "Equities",    color: "bg-[#E8602C]",                          pct: 20, display: "20%" },
        { label: "Commodities", color: "bg-[#F7931A]",                          pct: 20, display: "20%" },
        { label: "Cash",        color: "bg-transparent border border-[#F5EDD6]/30", pct: 15, display: "15%" },
      ],
      
      donut: "conic-gradient(#00FF88 0% 45%, #E8602C 45% 65%, #F7931A 65% 85%, rgba(255,255,255,0.1) 85% 100%)",
      totalLabel: "$104k",
    })
  } catch (err) {
    console.error("[dashboard/allocation]", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}