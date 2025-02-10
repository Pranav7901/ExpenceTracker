"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp className="bg-white text-black border border-gray-300 rounded-lg shadow-lg p-6 max-w-sm mx-auto" />
    </div>
  );
}