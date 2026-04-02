import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SESSION_COOKIE } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            avatarUrl: true,
            createdAt: true,
            portfolio: {
              select: { id: true, cashBalance: true },
            },
          },
        },
      },
    })

    if (!session || session.expiresAt < new Date()) {
      if (session) await prisma.session.delete({ where: { token } })
      const res = NextResponse.json({ user: null }, { status: 401 })
      res.cookies.delete(SESSION_COOKIE)
      return res
    }

    return NextResponse.json({ user: session.user })
  } catch (err) {
    console.error("[me]", err)
    return NextResponse.json({ user: null }, { status: 500 })
  }
}