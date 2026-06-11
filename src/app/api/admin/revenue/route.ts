import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30d";
    
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startDate = new Date();
    if (period === "7d") startDate.setDate(startDate.getDate() - 7);
    else if (period === "90d") startDate.setDate(startDate.getDate() - 90);
    else startDate.setDate(startDate.getDate() - 30);

    const orders = await prisma.orders.findMany({
      where: { date: { gte: startDate } },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        total_amount: true,
      }
    });

    const revenueMap: Record<string, { revenue: number, orders: number }> = {};
    
    orders.forEach(order => {
      const dateStr = order.date ? order.date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }) : 'Unknown';
      if (!revenueMap[dateStr]) {
        revenueMap[dateStr] = { revenue: 0, orders: 0 };
      }
      revenueMap[dateStr].revenue += Number(order.total_amount || 0);
      revenueMap[dateStr].orders += 1;
    });

    const result = Object.entries(revenueMap).map(([date, value]) => ({
      date,
      ...value
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ADMIN_REVENUE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
