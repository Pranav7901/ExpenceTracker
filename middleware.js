import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: "/((?!_next|.*\\..*|api/.*).*)",
  runtime: "experimental-edge", // Use experimental-edge
};