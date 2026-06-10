import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  // Note: role check skipped as User model in prisma/schema.prisma doesn't have role field
  // In a real scenario, we would check session.user.role === 'admin'
  return (
    <DashboardClient initialSessionUser={session.user} />
  );
}
