import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default function middleware(req) {
  try {
    return clerkMiddleware()(req);
  } catch (error) {
    console.error("Clerk Middleware Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const config = {
  matcher: "/((?!_next|.*\\..*|api/.*).*)",
};