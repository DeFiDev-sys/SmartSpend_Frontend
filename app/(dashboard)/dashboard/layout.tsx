import { cookies } from "next/headers";

import AppSidebar from "@/components/app-sideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen: boolean = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>
        <SidebarTrigger className='absolute top-1/2' />
        {children}
      </main>
    </SidebarProvider>
  );
}
