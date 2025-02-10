import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  // ✅ Allow public access to these routes
  const publicRoutes = ["/", "/about", "/contact", "/api/public"];

  // ✅ Bypass authentication for ignored routes (e.g., webhooks, static files)
  const ignoredRoutes = ["/api/webhook", "/api/no-auth"];

  const url = req.nextUrl;

  // If the route is ignored, allow access without authentication
  if (ignoredRoutes.some((route) => url.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // If the user is not signed in and tries to access a protected route, redirect them to sign-in
  if (!auth().userId && !publicRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // ✅ Allow authenticated users to proceed
  return NextResponse.next();
});

// ✅ Apply middleware only to specific routes
export const config = {
  matcher: "/((?!_next|.*\\..*|api/.*).*)", // Excludes Next.js assets, static files, and API routes
};