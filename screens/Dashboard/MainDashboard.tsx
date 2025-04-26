"use client";

import { UserSelector } from "@/redux/slice/UserSlice";
import { useSelector } from "react-redux";

export default function MainDashboard() {
  const { userData } = useSelector(UserSelector);

  return (
    <div className='p-4'>
      <h1>Welcome, {userData?.firstname}</h1>
      {/* Your dashboard content */}
    </div>
  );
}
