import MainDashboard from "@/screens/Dashboard/MainDashboard";
import { verifyAuthToken } from "@/servers/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await verifyAuthToken();

  if (!user) {
    redirect("/login");
  }

  return <MainDashboard />;
}
