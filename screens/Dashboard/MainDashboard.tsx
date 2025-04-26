"use client";

import { UserSelector } from "@/redux/slice/UserSlice";
import { useSelector } from "react-redux";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

export default function MainDashboard() {
  const { userData } = useSelector(UserSelector);

  return <>{userData && userData.admin === true ? <AdminDashboard /> : <UserDashboard />}</>;
}
