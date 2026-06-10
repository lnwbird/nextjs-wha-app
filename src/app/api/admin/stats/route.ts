import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth.api.getSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [todaySales, todayOrders, pendingOrders, totalProducts, totalUsers] = await Promise.all([
      prisma.orders.aggregate({
        where: { 
          date: { gte: today, lt: tomorrow },
          status: 'delivered' 
        },
        _sum: { total_amount: true }
      }),
      prisma.orders.count({
        where: { date: { gte: today, lt: tomorrow } }
      }),
      prisma.orders.count({
        where: { status: 'processing' }
      }),
      prisma.products.count(),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      todaySales: Number(todaySales._sum.total_amount || 0),
      todayOrders: todayOrders,
      pendingOrders: pendingOrders,
      totalProducts: totalProducts,
      totalUsers: totalUsers,
    });
  } catch (error) {
    console.error("[ADMIN_STATS]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
