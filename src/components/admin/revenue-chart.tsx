"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { RevenuePoint } from "@/types/admin";

type RevenueChartProps = {
  data: RevenuePoint[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export default function RevenueChart({ data, loading, error, onRetry }: RevenueChartProps) {
  if (loading) return <RevenueChartSkeleton />;
  
  if (error) {
    return (
      <Card className="p-6 h-[400px] flex flex-col items-center justify-center text-center">
        <p className="text-destructive mb-4">{error}</p>
        <button 
          onClick={onRetry} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
        >
          Try Again
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Revenue Over Time</h3>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `฿${value}`}
            />
            <Tooltip 
              formatter={(value: any) => [`฿${(value || 0).toLocaleString()}`, "Revenue"]} 
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function RevenueChartSkeleton() {
  return (
    <Card className="p-6 h-[400px] flex flex-col items-center justify-center">
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4 self-start" />
      <div className="h-[320px] w-full bg-muted animate-pulse rounded" />
    </Card>
  );
}
