"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PeriodSelectorProps = {
  value: '7d' | '30d' | '90d'
  onChange: (value: '7d' | '30d' | '90d') => void
}

export const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
  const periods: { label: string; value: '7d' | '30d' | '90d' }[] = [
    { label: '7 วัน', value: '7d' },
    { label: '30 วัน', value: '30d' },
    { label: '90 วัน', value: '90d' },
  ]

  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={value === period.value ? "default" : "ghost"}
          size="sm"
          className="text-xs h-7 px-3"
          onClick={() => onChange(period.value)}
        >
          {period.label}
        </Button>
      ))}
    </div>
  )
}
