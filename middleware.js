import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "experimental-edge"; // Keep this if using the Edge Runtime

// Wrap the Clerk middleware with custom logic for error handling and public route support
export default function middleware(req) {
  try {
    // Execute Clerk middleware
    return clerkMiddleware({
      publicRoutes: ["/", "/about", "/contact"], // Add public routes here
    })(req);
  } catch (error) {
    console.error("🚨 Clerk Middleware Error:", error);

    // Return a user-friendly error response
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Exclude specific paths (e.g., _next, static files, API routes) from middleware processing
export const config = {
  matcher: "/((?!_next|.*\\..*|api/.*).*)", // Adjust matcher as needed
};