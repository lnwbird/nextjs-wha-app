import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5");
    
    const session = await auth.api.getSession();
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.orders.findMany({
      take: limit,
      orderBy: { date: 'desc' },
      include: {
        customers: true,
      }
    });

    const formattedOrders = orders.map(order => ({
      id: order.id.toString(),
      customerName: order.customers?.name || "Unknown",
      customerEmail: order.customers?.phone || "N/A", // Use phone since email isn't in customers model

      totalAmount: Number(order.total_amount || 0),
      status: order.status,
      createdAt: order.date ? order.date.toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({
      orders: formattedOrders,
      total: await prisma.orders.count(),
    });
  } catch (error) {
    console.error("[ADMIN_ORDERS]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
