"use client";

import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { RegisterUserAction } from "@/redux/action/UserAction";
import { setLoading } from "@/redux/slice/UserSlice";
import { RegisterSchema } from "@/types/definitions";

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfrimPassword] = React.useState<boolean>(false);
  const [checkPolicy, setCheckPolicy] = React.useState<boolean | undefined>(true);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      checkPolicy: false,
    },
  });

  const onSumbit = async (values: z.infer<typeof RegisterSchema>) => {
    dispatch(setLoading(true));

    if (values.confirmPassword !== values.password) {
      toast.error("Passwords do not match");
      dispatch(setLoading(false));
      return;
    }

    try {
      const res = await dispatch(
        RegisterUserAction(values.firstname, values.lastname, values.email, values.username, values.password)
      );

      if (res?.token) {
        toast.success(`Welcome! ${res.user.username}`);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error) {
        await errorFunction(error);
      }
    } finally {
      await form.reset();
      await dispatch(setLoading(false));
    }
  };

  const errorFunction = (err: string | unknown) => {
    if (err) {
      toast(error);
    }
  };

  const checkPoliycFunc = (value: boolean | undefined) => {
    setCheckPolicy(value);
  };

  return (
    <div className='w-full h-full 2xl:overflow-hidden px-3'>
      <div className='max-w-[448px] h-full my-10 mx-auto flex flex-col gap-5'>
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
              <div className='flex flex-col lg:flex-row gap-2'>
                <FormField
                  control={form.control}
                  name='firstname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input placeholder='John' type='text' {...field} required className='bg-transparent' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastname'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input placeholder='Doe' type='text' {...field} required className='bg-transparent' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex flex-col lg:flex-row gap-2'>
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
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='JohnDoe123' type='text' {...field} required className='bg-transparent' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <div className='flex gap-2 items-center'>
                <FormField
                  control={form.control}
                  name='checkPolicy'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          onClick={() => {
                            checkPoliycFunc(field.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p>I agree to the terms of services and privacy policy</p>
              </div>

              <Button disabled={checkPolicy} className='w-full p-6 btnbg'>
                {loading ? "Loading . . ." : "Login"}
              </Button>

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

          <div className='w-full text-sm flex flex-col lg:flex-row gap-2 items-center justify-center mt-10'>
            <p>Already have an account?</p>
            <a href='/login'>Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
