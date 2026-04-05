import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SESSION_COOKIE } from "@/lib/auth"

export async function POST(req: NextRequest) {
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

    const body = await req.json()
    const { side, type, price, amount } = body

    if (!side || !type || !amount) {
      return NextResponse.json({ error: "side, type and amount are required." }, { status: 400 })
    }

    
    const executionPrice = parseFloat(price ?? 64231.00)
    const total          = parseFloat((executionPrice * parseFloat(amount)).toFixed(2))
    const fee            = parseFloat((total * 0.0005).toFixed(2)) 

    return NextResponse.json({
      success:  true,
      orderId:  `ORD-${Date.now()}`,
      side,
      type,
      amount,
      executionPrice,
      fee,
      total,
      status:   "FILLED",
      filledAt: new Date().toISOString(),
    }, { status: 201 })
  } catch (err) {
    console.error("[trade/order]", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}