import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
});

export const metadata: Metadata = {
  title: "DocuForge Docs",
  description: "API Documentation Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${jakarta.variable} ${firaCode.variable} font-sans`}>
      <body className="bg-background text-tertiary">
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
