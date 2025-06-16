"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Navbar } from "@/app/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./components/footer";
import { Toaster } from "sonner";



const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
  
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster position="top-right" />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>

  );
};

export default RootLayout;