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