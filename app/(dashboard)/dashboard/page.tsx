import MainDashboard from "@/screens/Dashboard/MainDashboard";
import { verifyAuthToken } from "@/servers/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function DashboardPage() {
  const user:
    | Error
    | {
        id: string;
        email: string;
      }
    | null = await verifyAuthToken();

  if (!user) {
    toast.error("No authentication token found");
    redirect("/login");
  }

  return <MainDashboard />;
}
