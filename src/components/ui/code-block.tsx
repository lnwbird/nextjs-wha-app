"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function DocuForgeCodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("group relative rounded-lg bg-[#18181B] p-4 font-mono text-sm text-gray-300 ring-1 ring-inset ring-border shadow-none", className)}>
      <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="secondary"
          size="xs"
          className="h-8 px-2 bg-transparent text-gray-400 hover:bg-gray-700 hover:text-white border-0"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </Button>
      </div>
      <pre className="overflow-x-auto">
        <code className="block leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}
