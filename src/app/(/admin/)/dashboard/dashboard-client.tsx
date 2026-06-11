"use client"

import { useEffect, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { 
  LayoutDashboard, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  Clock 
} from "lucide-react"
import { 
  KpiCard, 
  KpiCardSkeleton 
} from "@/components/admin/kpi-card"
import { PeriodSelector } from "@/components/admin/period-selector"
import { AdminStats, RevenuePoint, AdminOrderItem } from "@/types/admin"

const RevenueChart = dynamic(() => import("@/components/admin/revenue-chart").then(mod => mod.default), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-lg" />
})

const RecentOrdersTable = dynamic(() => import("@/components/admin/recent-orders-table").then(mod => mod.default), {
  ssr: false
})

type DashboardClientProps = {
  initialSessionUser?: any
}

export default function DashboardClient({ initialSessionUser }: DashboardClientProps) {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [revenue, setRevenue] = useState<RevenuePoint[]>([])
  const [revenueLoading, setRevenueLoading] = useState(true)
  const [revenueError, setRevenueError] = useState<string | null>(null)

  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')
  
  const [orders, setOrders] = useState<AdminOrderItem[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  const fetchStatsAndOrders = useCallback(async () => {
    setStatsLoading(true)
    setOrdersLoading(true)
    setStatsError(null)
    setOrdersError(null)
    
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/orders?limit=5')
      ])

      if (!statsRes.ok) throw new Error(`Stats API error: ${statsRes.status}`)
      if (!ordersRes.ok) throw new Error(`Orders API error: ${ordersRes.status}`)

      const statsData = await statsRes.json()
      const ordersData = await ordersRes.json()

      setStats(statsData)
      setOrders(ordersData.orders)
    } catch (err: any) {
      setStatsError(err.message)
      setOrdersError(err.message)
    } finally {
      setStatsLoading(false)
      setOrdersLoading(false)
    }
  }, [])

  const fetchRevenue = useCallback(async () => {
    setRevenueLoading(true)
    setRevenueError(null)
    try {
      const res = await fetch(`/api/admin/revenue?period=${period}`)
      if (!res.ok) throw new Error(`Revenue API error: ${res.status}`)
      const data = await res.json()
      setRevenue(data)
    } catch (err: any) {
      setRevenueError(err.message)
    } finally {
      setRevenueLoading(false)
    }
  }, [period])

  useEffect(() => {
    fetchStatsAndOrders()
    fetchRevenue()

    const interval = setInterval(fetchStatsAndOrders, 30000)
    return () => clearInterval(interval)
  }, [fetchStatsAndOrders, fetchRevenue])

  const formatCurrency = new Intl.NumberFormat('th-TH', { 
    style: 'currency', 
    currency: 'THB',
    maximumFractionDigits: 0 
  })

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            ยินดีต้อนรับกลับมา, {initialSessionUser?.name || 'Administrator'}
          </p>
        </div>
        <PeriodSelector 
          value={period} 
          onChange={(val) => setPeriod(val)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          <>
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
          </>
        ) : statsError ? (
          <div className="col-span-full p-4 bg-rose-50 text-rose-600 rounded-lg border border-rose-200 flex flex-col items-center justify-center text-center">
            <p>เกิดข้อผิดพลาดในการโหลดข้อมูลสถิติ: {statsError}</p>
            <button 
              onClick={fetchStatsAndOrders}
              className="mt-2 px-3 py-1 bg-rose-600 text-white rounded-md text-xs font-medium"
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        ) : (
<>
            <KpiCard 
              title="�ʹ����ѹ���" 
              value={formatCurrency.format(stats?.todaySales || 0)} 
              icon={DollarSign} 
              trend="+12.5%"
              trendUp={true}
            />
            <KpiCard 
              title="����觫����ѹ���" 
              value={stats?.todayOrders || 0} 
              icon={ShoppingBag} 
              trend="+5.4%"
              trendUp={true}
            />
            <KpiCard 
              title="�����Թ���" 
              value={stats?.pendingOrders || 0} 
              icon={Clock} 
              trend="-2.1%"
              trendUp={false}
            />
            <KpiCard 
              title="����������" 
              value={stats?.totalUsers || 0} 
              icon={Users} 
              trend="+1.2%"
              trendUp={true}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart 
            data={revenue} 
            loading={revenueLoading} 
            error={revenueError} 
            onRetry={fetchRevenue} 
          />
        </div>
        <div className="lg:col-span-1">
          <RecentOrdersTable 
            orders={orders} 
            loading={ordersLoading} 
            error={ordersError} 
            onRetry={fetchStatsAndOrders} 
          />
        </div>
      </div>
    </div>
  )
}
