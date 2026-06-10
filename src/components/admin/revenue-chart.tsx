"use client"

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenuePoint } from "@/types/admin"

type RevenueChartProps = {
  data: RevenuePoint[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export const RevenueChart = ({ data, loading, error, onRetry }: RevenueChartProps) => {
  if (loading) {
    return (
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle>รายได้และคำสั่งซื้อ</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <div className="h-64 w-full animate-pulse bg-muted rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-[400px] flex flex-col items-center justify-center text-center p-6">
        <CardTitle className="text-lg mb-2">ไม่สามารถโหลดข้อมูลได้</CardTitle>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
        >
          ลองใหม่อีกครั้ง
        </button>
      </Card>
    )
  }

  const formatCurrency = new Intl.NumberFormat('th-TH', { 
    style: 'currency', 
    currency: 'THB',
    maximumFractionDigits: 0 
  })

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>รายได้และคำสั่งซื้อ</CardTitle>
      </CardHeader>
      <CardContent className="h-full pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'rgb(110 110 110)' }}
              />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'rgb(110 110 110)' }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                formatter={(value: any) => [formatCurrency.format(value as number), 'รายได้']}
              />
              <Legend verticalAlign="top" align="right" height={36} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={false}
                name="รายได้"
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false}
                name="คำสั่งซื้อ"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
