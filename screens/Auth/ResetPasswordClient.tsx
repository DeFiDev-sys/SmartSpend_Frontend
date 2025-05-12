"use client";

import React, { Suspense, useEffect } from "react";
import ResetPassword from "./ResetPassword";
import { BounceLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordClient = () => {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center'>
          <BounceLoader color='#0F172A' />
        </div>
      }>
      <ResetComponent />
    </Suspense>
  );
};

const ResetComponent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const route = useRouter();

  useEffect(() => {
    if (!token) {
      toast.error("Error occured");
      route.push("/login");
    }
  }, [route, token]);
  return <ResetPassword token={token} />;
};

export default ResetPasswordClient;
