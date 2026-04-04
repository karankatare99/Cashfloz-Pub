import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "cashfloz_session"

// Routes that logged-in users should not access
const AUTH_ROUTES = ["/login", "/register"]

// Routes that require a logged-in user
const PROTECTED_ROUTES = ["/dashboard", "/trade", "/deposit"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(SESSION_COOKIE)?.value

  // Logged-in user trying to access login/register → send to dashboard
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Logged-out user trying to access protected pages → send to login
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/trade/:path*", "/deposit/:path*"],
}