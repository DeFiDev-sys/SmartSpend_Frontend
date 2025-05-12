"use client";

import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { ResetPasswordAction } from "@/redux/action/UserAction";
import { setLoading } from "@/redux/slice/UserSlice";
import { ResetPasswordScheme, token } from "@/types/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPassword = ({ token }: token) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfrimPassword] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof ResetPasswordScheme>>({
    resolver: zodResolver(ResetPasswordScheme),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSumbit = async (values: z.infer<typeof ResetPasswordScheme>) => {
    dispatch(setLoading(true));
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        dispatch(setLoading(false));
        return;
      }

      const res = await dispatch(ResetPasswordAction(token, values.password));

      if (res?.status === 200 || res?.statusText === "OK") {
        window.location.href = "/login";
      }
    } catch (error) {
      if (error) {
        await errorFunction(error);
      }
    } finally {
      form.reset({
        password: "",
        confirmPassword: "",
      });

      dispatch(setLoading(false));
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

          <p className='text-[#0F172A] text-center font-bold text-xl'>Reset Password</p>
          <p className='text-xs'>Enter your new password below</p>
        </div>

        <div className='w-full min-h-full space-y-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className='w-full h-full space-y-6'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Enter password'
                          type={showPassword ? "text" : "password"}
                          {...field}
                          autoComplete='current-password'
                          required
                        />
                        <Button
                          className='absolute right-3 bottom-0 bg-transparent hover:bg-transparent p-0 shadow-none cursor-pointer'
                          type='button'
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}>
                          {showPassword ? (
                            <LucideEye size='20px' color='black' />
                          ) : (
                            <LucideEyeClosed size='20px' color='black' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Re-Enter password'
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          autoComplete='current-password'
                          required
                        />
                        <Button
                          className='absolute right-3 bottom-0 bg-transparent hover:bg-transparent p-0 shadow-none cursor-pointer'
                          type='button'
                          onClick={() => {
                            setShowConfrimPassword((prev) => !prev);
                          }}>
                          {showConfirmPassword ? (
                            <LucideEye size='20px' color='black' />
                          ) : (
                            <LucideEyeClosed size='20px' color='black' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='w-full p-6 btnbg' disabled={loading}>
                {loading ? "Loading . . ." : "Reset Password"}
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

export default ResetPassword;
