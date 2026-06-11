import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardClient from "./dashboard-client";

async function DashboardContent() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return <DashboardClient />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 animate-pulse">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}