import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth.api.getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return <DashboardClient />;
}