import { 
  TrendingUp, 
  TrendingDown,
  LayoutDashboard
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type KpiCardProps = {
  title: string
  value: string | number
  icon: any
  description: string
  trend?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export const KpiCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: KpiCardProps) => {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={cn(
            "text-xs mt-1 font-medium flex items-center gap-1",
            trend.isPositive ? "text-emerald-600" : "text-rose-600"
          )}>
            {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export const KpiCardSkeleton = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="h-4 w-24 animate-pulse bg-muted rounded" />
        </CardTitle>
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 animate-pulse bg-muted rounded mb-2" />
        <div className="h-3 w-40 animate-pulse bg-muted rounded mb-1" />
        <div className="h-3 w-12 animate-pulse bg-muted rounded" />
      </CardContent>
    </Card>
  )
}
