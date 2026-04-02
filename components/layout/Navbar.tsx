"use client"
import React, { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import axios from "axios"

interface AuthUser {
  id: string
  email: string
  username: string
  avatarUrl?: string | null
}

export function Navbar() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Check session on mount
  useEffect(() => {
    axios
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false))
  }, [])

  const handleLogout = async () => {
    await axios.post("/api/auth/logout")
    setUser(null)
    router.push("/")
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 20)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "h-[56px] py-0 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "h-[72px] py-0 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto h-full px-6 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-xl skew-x-[-10deg] group-hover:scale-105 transition-transform duration-200 shadow-[0_0_15px_rgba(232,96,44,0.3)] group-hover:shadow-[0_0_24px_rgba(232,96,44,0.5)]">
            C
          </div>
          <span className="font-space-grotesk font-bold text-2xl tracking-widest text-[#F5EDD6]">
            CASHFLOZ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-inter font-medium uppercase tracking-[0.04em]">
          {["Markets", "Trade", "Dashboard", "Pro", "Learn"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[#F5EDD6]/60 hover:text-[#F5EDD6] relative group transition-colors duration-200 py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E8602C] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {/* Skeleton while checking session */}
          {authLoading ? (
            <div className="h-9 w-24 rounded-lg bg-white/[0.06] animate-pulse" />
          ) : user ? (
            // ── Logged in ──────────────────────────────────────────────────
            <div className="flex items-center gap-4">
              {/* Username pill */}
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 text-[13px] font-inter font-medium text-[#F5EDD6]/70 hover:text-[#F5EDD6] transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-[#E8602C]/20 border border-[#E8602C]/40 flex items-center justify-center text-[#E8602C] text-xs font-bold uppercase">
                  {user.username.charAt(0)}
                </div>
                <span className="uppercase tracking-[0.04em]">{user.username}</span>
              </Link>

              <Button
                onClick={handleLogout}
                className="h-9 px-5 bg-white/[0.04] text-[#F5EDD6]/80 font-space-grotesk font-bold text-sm tracking-wide rounded-lg border border-white/[0.08] hover:bg-white/[0.08] hover:text-[#F5EDD6] hover:border-white/[0.15] hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200"
              >
                LOG OUT
              </Button>
            </div>
          ) : (
            // ── Logged out ─────────────────────────────────────────────────
            <>
              <Link
                href="/login"
                className="text-[13px] font-inter font-medium uppercase tracking-[0.04em] text-[#F5EDD6]/60 hover:text-[#F5EDD6] transition-colors duration-200"
              >
                Log In
              </Link>
              <Button
                className="hidden sm:inline-flex h-9 px-5 bg-[#E8602C] text-[#0A0A0F] font-space-grotesk font-bold text-sm tracking-wide rounded-lg shadow-[0_0_15px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:bg-[#E8602C]/90 hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 border-none"
                onClick={() => router.push("/register")}
              >
                START TRADING
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}