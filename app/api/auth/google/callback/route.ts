import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import {
  exchangeGoogleCode,
  getGoogleUser,
  generateSessionToken,
  sessionExpiryDate,
  SESSION_COOKIE,
  OAUTH_STATE_COOKIE,
} from "@/lib/auth"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value

  
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?error=invalid_state`
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?error=no_code`
    )
  }

  try {
    
    const tokens = await exchangeGoogleCode(code)
    const googleUser = await getGoogleUser(tokens.access_token)

    if (!googleUser.email_verified) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/login?error=email_not_verified`
      )
    }

    
    
    
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
      select: { id: true, email: true, username: true },
    })

    if (!user) {
      
      const baseUsername = googleUser.given_name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 20)

      const existing = await prisma.user.findUnique({
        where: { username: baseUsername },
      })

      const username = existing
        ? `${baseUsername}${randomSuffix()}`
        : baseUsername

      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          username,
          passwordHash: "", 
          avatarUrl: googleUser.picture,
          portfolio: { create: { cashBalance: 100000 } },
        },
        select: { id: true, email: true, username: true },
      })
    } else {
      
      await prisma.user.update({
        where: { id: user.id },
        data: { avatarUrl: googleUser.picture },
      })
    }

    
    const token = generateSessionToken()
    const expiresAt = sessionExpiryDate()

    await prisma.session.create({
      data: { userId: user.id, token, expiresAt },
    })

    
    const res = NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`)

    res.cookies.delete(OAUTH_STATE_COOKIE)
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    })

    return res
  } catch (err) {
    console.error("[google/callback]", err)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?error=server_error`
    )
  }
}

function randomSuffix(): string {
  return Math.floor(Math.random() * 9000 + 1000).toString()
}