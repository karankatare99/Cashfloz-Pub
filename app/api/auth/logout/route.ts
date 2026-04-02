import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { SESSION_COOKIE } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value
    if (token) {
      await prisma.session.deleteMany({ where: { token } })
    }
    const response = NextResponse.json({ success: true })
    response.cookies.delete(SESSION_COOKIE)
    return response
  } catch (err) {
    console.error("[logout]", err)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}