"use client";

import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { ForgetPasswordAction } from "@/redux/action/UserAction";
import { setLoading } from "@/redux/slice/UserSlice";
import { ForgetPasswordScheme } from "@/types/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ForgetScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof ForgetPasswordScheme>>({
    resolver: zodResolver(ForgetPasswordScheme),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgetPasswordScheme>) => {
    dispatch(setLoading(true));
    try {
      await dispatch(ForgetPasswordAction(values.email));
      toast(success || "Link successfully sent");
    } catch (error) {
      if (error) {
        await errorFunction(error);
      }
    } finally {
      form.reset({
        email: "",
      });
    }
  };

  const errorFunction = (err: string | unknown) => {
    if (err) {
      toast(error);
    }
  };

  return (
    <div className='w-full min-h-dvh overflow-hidden px-3'>
      <div className='max-w-[448px] max-h-[600px] my-12 mx-auto flex flex-col gap-20'>
        <div className='w-full min-h-24 flex flex-col items-center gap-4'>
          <div className='flex gap-1.5 lg:gap-4 items-center'>
            <BrandLogo />
            <h2 className='lg:text-lg font-bold'>SmartSpend</h2>
          </div>

          <p className='text-[#0F172A] text-center font-bold text-xl'>Forget Password</p>
          <p className='text-xs'>Enter your email to recieve password reset link</p>
        </div>

        <div className='w-full min-h-full space-y-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='name@exmaple.com'
                        type='email'
                        {...field}
                        required
                        className='bg-transparent'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='w-full p-6 btnbg' disabled={loading}>
                {loading ? "Loading. . ." : "Send Reset Link"}
              </Button>
            </form>
          </Form>

          <div className='flex gap-5 w-full justify-center text-sm'>
            <p>Remember your password?</p>
            <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetScreen;
