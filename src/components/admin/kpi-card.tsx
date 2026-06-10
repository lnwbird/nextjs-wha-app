import React from "react";
import { Card } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  Users, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Clock 
} from "remixicon";

type KpiCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  loading?: boolean;
};

export const KpiCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  loading 
}: KpiCardProps) => {
  if (loading) return <KpiCardSkeleton />;

  return (
    <Card className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${trendUp ? "text-green-500" : "text-red-500"}`}>
            <ArrowUpRight className={`mr-1 ${trendUp ? "" : "rotate-90"}`} size={14} />
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
