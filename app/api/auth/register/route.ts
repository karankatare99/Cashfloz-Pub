import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import {
  hashPassword,
  generateSessionToken,
  sessionExpiryDate,
  SESSION_COOKIE,
} from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, username, password } = body

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: "Email, username and password are required." },
        { status: 400 }
      )
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      )
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      )
    }
    if (username.length < 3 || username.length > 24) {
      return NextResponse.json(
        { error: "Username must be between 3 and 24 characters." },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
        ],
      },
      select: { email: true, username: true },
    })

    if (existing) {
      const field = existing.email === email.toLowerCase() ? "email" : "username"
      return NextResponse.json(
        { error: `This ${field} is already taken.` },
        { status: 409 }
      )
    }

    const passwordHash = hashPassword(password)
    const token = generateSessionToken()
    const expiresAt = sessionExpiryDate()

    const { user, session } = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          passwordHash,
          portfolio: {
            create: { cashBalance: 100000 },
          },
        },
        select: { id: true, email: true, username: true, createdAt: true },
      })
      const session = await tx.session.create({
        data: { userId: user.id, token, expiresAt },
      })
      return { user, session }
    })

    const response = NextResponse.json(
      { user: { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt } },
      { status: 201 }
    )
    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    })
    return response
  } catch (err) {
    console.error("[register]", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}