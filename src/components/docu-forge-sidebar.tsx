"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

const NAVIGATION_METADATA = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "Authentication", href: "/docs/auth" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Courses API", href: "/docs/api/courses" },
      { title: "Users API", href: "/docs/api/users" },
      { title: "Orders API", href: "/docs/api/orders" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "SDKs", href: "/docs/sdks" },
      { title: "Webhooks", href: "/docs/webhooks" },
      { title: "Rate Limits", href: "/docs/rate-limits" },
    ],
  },
];

export function DocuForgeSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r bg-surface px-4 py-6 transition-all">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="size-8 rounded-md bg-primary" />
        <span className="font-heading text-lg font-bold tracking-tight">DocuForge</span>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search docs... (⌘K)"
            className="pl-9 bg-muted border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <nav className="space-y-8 overflow-y-auto h-[calc(100vh-120px)]">
        {NAVIGATION_METADATA.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-tertiary/60">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items
                .filter((item) => 
                  item.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                    pathname === item.href 
                      ? "bg-[#EFF6FF] text-primary font-medium border-l-2 border-primary" 
                      : "text-tertiary"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
