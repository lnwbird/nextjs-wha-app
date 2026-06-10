"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  loading?: boolean;
  error?: string | null;
};

export const KpiCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  loading,
  error
}: KpiCardProps) => {
  if (loading) return <KpiCardSkeleton />;

  if (error) {
    return (
      <Card className="p-6 flex items-center justify-between">
        <div className="text-destructive">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-lg font-medium">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${trendUp ? "text-green-500" : "text-red-500"}`}>
            <svg className={`mr-1 ${trendUp ? "" : "rotate-90"}`} width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 15l-6-6-6 6" />
            </svg>
            {trend}
          </div>
        )}
      </div>
      <div className="p-3 bg-secondary rounded-xl">
        <Icon size={24} className="text-primary" />
      </div>
    </Card>
  );
};

export const KpiCardSkeleton = () => {
  return (
    <Card className="p-6 flex items-center justify-between">
      <div className="space-y-2 flex-1">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
      </div>
      <div className="p-3 bg-muted animate-pulse rounded-xl w-12 h-12" />
    </Card>
  );
};
