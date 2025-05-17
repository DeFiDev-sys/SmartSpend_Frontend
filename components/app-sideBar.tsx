"use client";

import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "./ui/sidebar";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { setLoading, setUserLogout } from "@/redux/slice/UserSlice";
import { deleteAuthToken } from "@/servers/server";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AppSidebar = () => {
  const dispatch = useAppDispatch();
  const { loading, userData } = useAppSelector((state) => state.user);
  const router = useRouter();

  const logOutFunc = async () => {
    dispatch(setLoading(true));
    try {
      await deleteAuthToken();
      dispatch(setUserLogout());
      router.push("/");
      toast.success("Logged out");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Log out");
    }
  };
  return (
    <Sidebar>
      <SidebarHeader className='flex justify-center items-center'>
        {userData && userData.admin === false && (
          <div className='flex items-center justify-center h-20 w-20 rounded-full bg-[#0F172A] text-white font-bold text-2xl'>
            {`${userData.firstname[0]}${userData.lastname[0]}`.toUpperCase()}
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>Side Bar</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant={"outline"} className='font-medium text-xs' onClick={logOutFunc} disabled={loading}>
          {loading ? "logging out..." : "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
