import type { Metadata } from "next";
import { Prompt, Roboto, Lora } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

const loraHeading = Lora({ subsets: ['latin'], variable: '--font-heading' });

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap'
});


export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard - WHA Group",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(promptFont.className, "font-sans", roboto.variable, loraHeading.variable)}
    >
      <body className="bg-background text-tertiary">
        {children}
      </body>
    </html>
  );
}