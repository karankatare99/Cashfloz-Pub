import { randomBytes, scryptSync, timingSafeEqual } from "crypto"

// ─── Password ────────────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex")
  const hash = scryptSync(password, salt, 64).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  const hashBuffer = Buffer.from(hash, "hex")
  const supplied = scryptSync(password, salt, 64)
  return timingSafeEqual(hashBuffer, supplied)
}

// ─── Session Token ────────────────────────────────────────────────────────────

export function generateSessionToken(): string {
  return randomBytes(32).toString("hex")
}

export const SESSION_COOKIE = "cashfloz_session"
export const SESSION_TTL_DAYS = 7

export function sessionExpiryDate(): Date {
  const d = new Date()
  d.setDate(d.getDate() + SESSION_TTL_DAYS)
  return d
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

export function getGoogleAuthURL(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    state,
  })
  return `${GOOGLE_AUTH_URL}?${params.toString()}`
}

export async function exchangeGoogleCode(code: string): Promise<{
  access_token: string
  id_token: string
}> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Google token exchange failed: ${err}`)
  }

  return res.json()
}

export interface GoogleUser {
  sub: string        // Google's unique user ID
  email: string
  email_verified: boolean
  name: string
  given_name: string
  picture: string
}

export async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
  const res = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch Google user info")
  }

  return res.json()
}

// ─── OAuth State (CSRF protection) ───────────────────────────────────────────
// A short-lived random string stored in a cookie to verify the callback
// is coming from a request we initiated — prevents CSRF attacks on the
// OAuth flow.

export const OAUTH_STATE_COOKIE = "cashfloz_oauth_state"

export function generateOAuthState(): string {
  return randomBytes(16).toString("hex")
}