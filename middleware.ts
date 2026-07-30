import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths requiring auth session
  const protectedRoutes = [
    "/dashboard",
    "/workout-planner",
    "/diet-calculator",
    "/bmi-calculator",
    "/progress-tracker",
    "/ai-coach",
    "/exercise-library",
    "/workout-logger",
    "/nutrition-tracker",
    "/gamification",
    "/analytics",
    "/admin",
    "/settings",
  ];

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    // In production, verify auth token session cookie here.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
