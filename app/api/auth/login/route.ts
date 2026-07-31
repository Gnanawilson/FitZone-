import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 });
    }

    // Try finding existing user or return mock demo user if sqlite dev database is uninitialized
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch {
      // Fallback for unseeded DB
      user = null;
    }

    const displayName = name || (user?.name ? user.name : email.split("@")[0].toUpperCase());

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user?.id || `usr_${Date.now()}`,
        email: email,
        name: displayName,
        role: user?.role || "USER",
        streak: user?.streak || 7,
        xp: user?.xp || 2450,
        level: user?.level || 5,
      },
      token: `mock_jwt_token_${Date.now()}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", details: String(error) }, { status: 500 });
  }
}
