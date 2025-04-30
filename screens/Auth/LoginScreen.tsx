"use client";

import BrandLogo from "@/components/BrandLogo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginSchema } from "@/types/definitions";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { LoginUserAction } from "@/redux/action/UserAction";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const navigate = useRouter();
  const { loading, error } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumbit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const res = await dispatch(LoginUserAction(values.email, values.password));

      if (res?.token) {
        toast.success(`Welcome Back! ${res.user.username}`);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error) {
        await errorFunction(error);
      }
    } finally {
      form.reset({
        email: "",
        password: "",
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
      <div className='max-w-[448px] max-h-[600px] my-12 mx-auto flex flex-col gap-5'>
        <div className='w-full min-h-24 flex flex-col items-center gap-4'>
          <div className='flex gap-1.5 lg:gap-4 items-center'>
            <BrandLogo />
            <h2 className='lg:text-lg font-bold'>SmartSpend</h2>
          </div>

          <p className='text-[#0F172A] text-center font-bold text-xl'>Welcome back</p>
          <p className='text-xs'>Enter your credentials to access your account</p>
        </div>

        <div className='w-full min-h-full'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className='w-full h-full space-y-6'>
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

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='password'
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

              <Button className='w-full p-6 btnbg'>{loading ? "Loading . . ." : "Login"}</Button>

              <div className='flex items-center my-4'>
                <hr className='flex-grow border-t border-gray-300' />
                <span className='mx-3 text-sm text-gray-500'>Or continue with</span>
                <hr className='flex-grow border-t border-gray-300' />
              </div>

              <div className='h-full grid grid-cols-2 gap-4'>
                <Button className='p-6 flex gap-5 w-full' variant={"outline"}>
                  <FaFacebook />
                  <p>Facebook</p>
                </Button>
                <Button className='p-6 flex gap-5 w-full' variant={"outline"}>
                  <FaGoogle />
                  <p>Google</p>
                </Button>
              </div>
            </form>
          </Form>

          <div className='w-full text-sm flex flex-col lg:flex-row gap-2 items-center justify-center my-10'>
            <p>Don&apos;t have an account?</p>
            <a href='/register'>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
