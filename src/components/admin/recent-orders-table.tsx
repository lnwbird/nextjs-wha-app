"use client";

import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { AdminOrderItem } from "@/types/admin";

type RecentOrdersTableProps = {
  orders: AdminOrderItem[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

const statusStyles = {
  processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  received: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function RecentOrdersTable({ orders, loading, error, onRetry }: RecentOrdersTableProps) {
  if (loading) return <RecentOrdersTableSkeleton />;

  if (error) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center text-center h-64">
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
    <Card className="p-6 overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  No recent orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.customerName}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("th-TH", { 
                      style: "currency", 
                      currency: "THB" 
                    }).format(order.totalAmount)}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs border ${statusStyles[order.status as keyof typeof statusStyles] || "bg-gray-100"}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(order.createdAt).toLocaleDateString("th-TH")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

function RecentOrdersTableSkeleton() {
  return (
    <Card className="p-6">
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 w-full bg-muted animate-pulse rounded" />
        ))}
      </div>
    </Card>
  );
}
