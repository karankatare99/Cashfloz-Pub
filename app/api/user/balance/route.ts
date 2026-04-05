import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SESSION_COOKIE } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const session = await prisma.session.findUnique({
      where: { token },
      select: {
        expiresAt: true,
        user: {
          select: {
            portfolio: {
              select: { cashBalance: true },
            },
          },
        },
      },
    })

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const portfolio = session.user.portfolio

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 })
    }

    return NextResponse.json({ cashBalance: portfolio.cashBalance })
  } catch (err) {
    console.error("[balance]", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

const DEPOSIT_AMOUNT = 46500

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const session = await prisma.session.findUnique({
      where: { token },
      select: {
        expiresAt: true,
        user: {
          select: {
            portfolio: {
              select: { id: true, cashBalance: true },
            },
          },
        },
      },
    })

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const portfolio = session.user.portfolio

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found." }, { status: 404 })
    }

    const updated = await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { cashBalance: { increment: DEPOSIT_AMOUNT } },
      select: { cashBalance: true },
    })

    return NextResponse.json({
      success:        true,
      deposited:      DEPOSIT_AMOUNT,
      newCashBalance: updated.cashBalance,
    })
  } catch (err) {
    console.error("[user/balance PATCH]", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}