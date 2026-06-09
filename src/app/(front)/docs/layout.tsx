import React from "react";
import { DocuForgeSidebar } from "@/components/docu-forge-sidebar";

export default function DocuForgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DocuForgeSidebar />
      <main className="flex-1 pl-[280px]">
        <div className="mx-auto max-w-[768px] py-12 px-6">
          {children}
        </div>
      </main>
    </div>
  );
}
