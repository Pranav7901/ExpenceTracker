import { clerkMiddleware } from "@clerk/nextjs/server";

export const runtime = "experimental-edge";

export default clerkMiddleware();

export const config = {
  matcher: "/((?!_next|.*\\..*|api/.*).*)", // Excludes _next, static files, and API routes
};