import * as React from "react";
import { cn } from "@/lib/utils";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

interface MethodBadgeProps {
  method: Method;
  className?: string;
}

export function MethodBadge({ method, className }: MethodBadgeProps) {
  const colors = {
    GET: "bg-[#F0FDF4] text-[#16A34A]",
    POST: "bg-[#EFF6FF] text-[#2563EB]",
    PUT: "bg-[#FFF7ED] text-[#CA8A04]",
    DELETE: "bg-[#FEF2F2] text-[#DC2626]",
  };

  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit items-center justify-center rounded-sm px-2 py-0.5 text-[12px] font-medium font-mono",
        colors[method],
        className
      )}
    >
      {method}
    </span>
  );
}
