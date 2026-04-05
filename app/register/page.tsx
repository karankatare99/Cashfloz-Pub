"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import axios, { AxiosError } from "axios"

function FocusRingInput({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative rounded-xl group">
      <div
        className={`absolute -inset-[2px] rounded-xl bg-gradient-to-r from-[#E8602C] via-[#E8602C]/60 to-transparent opacity-0 blur-[4px] transition-opacity duration-300 ease-out z-0 ${focused ? "opacity-100" : ""}`}
      />
      <div className="relative z-10 bg-[#0A0A0F] rounded-xl border border-white/[0.08] transition-colors duration-200 hover:border-white/[0.15] overflow-hidden">
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-12 w-full text-base font-inter text-[#F5EDD6] placeholder:text-[#F5EDD6]/30 bg-transparent border-none focus-visible:ring-0 focus-visible:outline-none px-4"
        />
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onSignupHandler = async () => {
    setError("")

    
    if (!username || !email || !password) {
      setError("All fields are required.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    try {
      setLoading(true)
      await axios.post("/api/auth/register", { username, email, password })
      
      router.push("/dashboard")
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>
      setError(
        axiosError.response?.data?.error ?? "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const onGoogleRegister = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center font-inter px-6 relative overflow-hidden selection:bg-[#E8602C]/30 selection:text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8602C]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-3 group cursor-pointer z-20 hover:scale-[1.02] transition-transform duration-200 ease-out">
        <div className="w-8 h-8 rounded bg-[#E8602C] flex items-center justify-center text-[#0A0A0F] font-space-grotesk font-bold text-xl skew-x-[-10deg]">C</div>
        <span className="font-space-grotesk font-bold text-xl tracking-widest text-[#F5EDD6]">CASHFLOZ</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="w-full max-w-md z-10 my-12"
      >
        <Card className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6 px-8">
            <CardTitle className="font-space-grotesk text-3xl font-bold tracking-tight text-[#F5EDD6]">Create Account</CardTitle>
            <p className="text-[#F5EDD6]/60 font-inter text-sm mt-3">Join the future of institutional trading</p>
          </CardHeader>

          <CardContent className="px-8 pb-10 space-y-8">
            {}
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={onGoogleRegister} variant="outline" className="w-full h-12 bg-white/[0.03] border-white/[0.08] text-[#F5EDD6]/80 hover:text-[#F5EDD6] hover:bg-white/[0.06] hover:border-white/[0.15] rounded-xl transition-all duration-200">
                Google
              </Button>
              <Button variant="outline" className="w-full h-12 bg-white/[0.03] border-white/[0.08] text-[#F5EDD6]/80 hover:text-[#F5EDD6] hover:bg-white/[0.06] hover:border-white/[0.15] rounded-xl transition-all duration-200">
                Apple
              </Button>
            </div>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-white/[0.08]" />
              <span className="flex-shrink-0 px-4 text-[#F5EDD6]/40 text-xs font-inter tracking-[0.04em] uppercase font-medium">Or register with email</span>
              <div className="flex-grow border-t border-white/[0.08]" />
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSignupHandler() }}>
              <div className="space-y-2">
                <label className="text-[13px] text-[#F5EDD6]/70 font-inter font-medium tracking-wide">Username</label>
                <FocusRingInput
                  type="text"
                  placeholder="satoshi"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] text-[#F5EDD6]/70 font-inter font-medium tracking-wide">Email Address</label>
                <FocusRingInput
                  type="email"
                  placeholder="trade@cashfloz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] text-[#F5EDD6]/70 font-inter font-medium tracking-wide">Password</label>
                <FocusRingInput
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#E8602C] text-[13px] font-inter font-medium bg-[#E8602C]/10 border border-[#E8602C]/20 rounded-lg px-4 py-3"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-white/[0.15] bg-white/[0.03] accent-[#E8602C] focus:ring-[#E8602C] focus:ring-offset-0 cursor-pointer transition-colors"
                />
                <label htmlFor="terms" className="text-[13px] text-[#F5EDD6]/60 font-inter leading-relaxed cursor-pointer select-none">
                  I agree to the{" "}
                  <a href="#" className="text-[#F5EDD6] hover:text-[#E8602C] transition-colors underline underline-offset-2 decoration-white/20 hover:decoration-[#E8602C]/50">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#F5EDD6] hover:text-[#E8602C] transition-colors underline underline-offset-2 decoration-white/20 hover:decoration-[#E8602C]/50">Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-4 bg-[#E8602C] text-white text-[15px] font-space-grotesk font-semibold tracking-wide rounded-xl shadow-[0_0_20px_rgba(232,96,44,0.15)] hover:shadow-[0_0_24px_rgba(232,96,44,0.35)] hover:bg-[#E8602C]/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? "Creating account..." : "SIGN UP"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 px-4">
          <span className="text-[#F5EDD6]/50 text-sm font-inter">Already have an account? </span>
          <Link href="/login" className="text-[#F5EDD6] hover:text-[#E8602C] transition-colors text-sm font-inter font-medium underline underline-offset-4 decoration-white/20 hover:decoration-[#E8602C]/50">
            Log in here
          </Link>
        </div>
      </motion.div>
    </div>
  )
}