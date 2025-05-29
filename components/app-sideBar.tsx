"use client";

import React, { ReactNode, useEffect } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { setLoading, setUserLogout } from "@/redux/slice/UserSlice";
import { deleteAuthToken } from "@/servers/server";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BrandLogo from "./BrandLogo";
import { LogOut } from "lucide-react";
import { DashboardData } from "@/data/featureData";
import AddExpensesScreen from "@/screens/Dashboard/User/Components/AddExpensesScreen";
import CalenderScreen from "@/screens/Dashboard/User/Components/CalenderScreen";

const AppSidebar = () => {
  const dispatch = useAppDispatch();
  const { loading, userData } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [activeModel, setActiveModel] = React.useState<ReactNode | null>(null);
  const [isClient, setIsClient] = React.useState<boolean>(false); // to delay the SSR for userData to avoid hydrations

  useEffect(() => {
    setIsClient(true);
  }, []);

  const logOutFunc = async () => {
    dispatch(setLoading(true));
    try {
      await deleteAuthToken();
      dispatch(setUserLogout());
      router.push("/");
      toast.success("Logged out");
      router.refresh();
    } catch (error) {
      if (error) {
        toast.error("Failed to Log out");
      }
    }
  };

  const handleAddExpenses = () => {
    setActiveModel(<AddExpensesScreen setActiveModel={handleCloseModal} />);
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };
  const handleAnalysis = () => {
    router.push("/anaylsis");
  };
  const handleCalender = () => {
    setActiveModel(<CalenderScreen />);
  };
  const handleSettings = () => {
    router.push("/settings");
  };

  const handleCloseModal = () => {
    setActiveModel(null);
  };

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row justify-between items-center border-b-2 p-5'>
        <div className='flex justify-between gap-1.5 lg:gap-4 items-center'>
          <BrandLogo />
          <h1 className='lg:text-xl font-bold'>SmartSpend</h1>
        </div>
        {isClient && userData && userData.admin === false && (
          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-[#0F172A] text-white font-bold text-xl'>
            {`${userData.firstname[0]}${userData.lastname[0]}`.toUpperCase()}
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className='flex flex-col py-5'>
        {DashboardData.map((sideBarData, i) => (
          <SidebarGroup key={i}>
            <Button
              variant={"outline"}
              className='py-8 px-10 flex justify-start'
              onClick={
                sideBarData.name === "Add Expenses"
                  ? handleAddExpenses
                  : sideBarData.name === "Dashboard"
                  ? handleDashboard
                  : sideBarData.name === "Analysis"
                  ? handleAnalysis
                  : sideBarData.name === "Calendar"
                  ? handleCalender
                  : handleSettings
              }>
              <span>{sideBarData.icon}</span>
              <span>{sideBarData.name}</span>
            </Button>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant={"outline"}
          className='font-medium text-xs text-red-600 p-5 hover:text-red-600'
          onClick={logOutFunc}
          disabled={loading}>
          <LogOut color='red' />
          {loading ? "logging out..." : "Logout"}
        </Button>
      </SidebarFooter>

      {activeModel && (
        <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center  overflow-hidden'>
          <div className='bg-white p-6 rounded-lg max-w-md w-full flex justify-between items-center'>{activeModel}</div>
        </div>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
