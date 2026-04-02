import { NextResponse } from "next/server"
import { getGoogleAuthURL, generateOAuthState, OAUTH_STATE_COOKIE } from "@/lib/auth"

export async function GET() {
  const state = generateOAuthState()
  const url = getGoogleAuthURL(state)

  const res = NextResponse.redirect(url)
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes — enough to complete the OAuth flow
    path: "/",
  })

  return res
}