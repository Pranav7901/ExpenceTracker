import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Use the Edge Runtime explicitly
export const runtime = "experimental-edge";

// Custom middleware to wrap Clerk's middleware with error handling
export default function middleware(req) {
  try {
    // Execute Clerk middleware with public routes specified
    return clerkMiddleware({
      publicRoutes: [
        "/",       // Home route
        "/about",  // About page
        "/contact" // Contact page
      ],
    })(req);
  } catch (error) {
    console.error("🚨 Clerk Middleware Error:", error);

    // Return a user-friendly error response in case of middleware failure
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Middleware configuration to exclude specific paths
export const config = {
  matcher: "/((?!_next|.*\\..*).*)", // Matches all routes except _next and static files
};