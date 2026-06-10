"use client";

import { useEffect, useState } from "react";
import { KpiCard, KpiCardSkeleton } from "@/components/admin/kpi-card";
import dynamic from "next/dynamic";
import { PeriodSelector } from "@/components/admin/period-selector";
import { cn } from "@/lib/utils";
import type { AdminStats, RevenuePoint, AdminOrderItem } from "@/types/admin";

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((mod) => mod.default),
  { ssr: false }
);

const RecentOrdersTable = dynamic(
  () => import("@/components/admin/recent-orders-table").then((mod) => mod.default),
  { ssr: false }
);

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState<string | null>(null);

  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      setStatsError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError(null);
      const res = await fetch("/api/admin/orders?limit=5");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      setOrdersError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchRevenue = async () => {
    try {
      setRevenueLoading(true);
      setRevenueError(null);
      const res = await fetch(`/api/admin/revenue?period=${period}`);
      if (!res.ok) throw new Error("Failed to fetch revenue");
      const data = await res.json();
      setRevenue(data);
    } catch (err) {
      setRevenueError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setRevenueLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchRevenue();
  }, [period]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats();
      fetchOrders();
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(value);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Today Sales"
          value={stats ? formatCurrency(stats.todaySales) : "—"}
          icon={() => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          loading={statsLoading}
          error={statsError}
        />
        <KpiCard
          title="Today Orders"
          value={stats ? stats.todayOrders : "—"}
          icon={() => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>}
          loading={statsLoading}
          error={statsError}
        />
        <KpiCard
          title="Pending Orders"
          value={stats ? stats.pendingOrders : "—"}
          icon={() => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          loading={statsLoading}
          error={statsError}
        />
        <KpiCard
          title="Total Products"
          value={stats ? stats.totalProducts : "—"}
          icon={() => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          loading={statsLoading}
          error={statsError}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Revenue Overview</h2>
            <PeriodSelector value={period} onChange={setPeriod} />
          </div>
          <RevenueChart
            data={revenue}
            loading={revenueLoading}
            error={revenueError}
            onRetry={fetchRevenue}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <RecentOrdersTable
            orders={orders}
            loading={ordersLoading}
            error={ordersError}
            onRetry={fetchOrders}
          />
        </div>
      </div>
    </div>
  );
}