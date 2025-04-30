import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { features, priceplanning } from "@/data/featureData";
import Image from "next/image";
import React from "react";
import CheckedIcon from "@/components/featuresIcons/checkedIcon";
import Link from "next/link";

const LandingScreen = () => {
  return (
    <div className='min-h-dvh space-y-10 scroll-smooth'>
      {/* Hero Section */}
      <section className='min-h-[418px] w-full p-3 my-20 2xl:justify-center flex flex-col lg:flex-row gap-11 dark:bg-[#030711]'>
        {/* Hero Write-Up */}
        <div className=' w-full lg:max-w-[657px] flex flex-col justify-center gap-4'>
          <h1 className='font-bold text-3xl lg:text-5xl'>Smart Expense Tracking for Your Financial Freedom</h1>
          <p className='lg:text-xl'>
            Take control of your finances with SmartSpend. Track expenses, set budgets, and reach your financial goals
            faster.
          </p>
          <div className='flex flex-col lg:flex-row  gap-4'>
            <Link href={"/login"}>
              <Button className='btnbg p-6'>Get Started</Button>
            </Link>
            <Link href={"/about"}>
              <Button className='p-6' variant={"outline"}>
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        {/*  */}
        <Image
          width={627.5}
          height={418}
          src={
            "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          }
          alt='heroImage'
        />
      </section>

      {/* {/* Features Section */}
      <section className='w-full min-h-[804px] bg-[#F1F5F9] my-20 flex items-center' id='features'>
        <div className='min-h-[548px] w-full my-14 lg:my-0'>
          <div className='flex flex-col justify-center gap-2 text-center w-full'>
            <h2 className='text-2xl lg:text-3xl font-bold'>Powerful Features for Better Financial Management</h2>
            <p className='text-sm lg:text-lg'>
              SmartSpend comes packed with all the tools you need to manage your <br className='hidden lg:block' />{" "}
              expenses effectively.
            </p>
          </div>

          <div className='mx-2 mt-4 lg:mx-32 h-full lg:max-h-[388px] grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {features.map((feature) => (
              <Card key={feature.title} className='flex flex-col items-center justify-center p-5 border bg-[#F1F5F9]'>
                <CardContent>{feature.icon}</CardContent>

                <CardTitle>{feature.title}</CardTitle>

                <CardDescription className='text-center'>{feature.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className='w-full min-h-[804px]flex items-center my-14 scroll-mt-20' id='pricing'>
        <div className='min-h-[548px] w-full my-14 lg:my-0'>
          <div className='flex flex-col justify-center gap-2 text-center w-full'>
            <h2 className='text-2xl lg:text-3xl font-bold'>Simple, Transparent Pricing</h2>
            <p className='text-sm lg:text-lg'>
              Choose the plan that&apos;s right for you and take control of your finances today.
            </p>
          </div>

          <div className='mx-2 mt-4 lg:mx-32 h-full lg:max-h-[400px] grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {priceplanning.map((prices, i) => (
              <Card key={i} className='relative'>
                <CardHeader className='flex flex-col gap-2'>
                  <CardTitle>{prices.plan}</CardTitle>
                  <CardDescription className='flex flex-col gap-1.5'>
                    <h3 className='text-2xl font-bold text-[#0F172A]'>{prices.price}</h3>
                    <span className='text-xs'>{prices.priceDesc}</span>
                  </CardDescription>
                </CardHeader>

                <CardDescription className='p-6 flex flex-col gap-5 text-[#0F172A] mb-6'>
                  {prices.desc.map((list, index) => (
                    <ul key={index} className='text-xs list-disc'>
                      <li className='flex gap-2'>
                        <CheckedIcon /> {list}
                      </li>
                    </ul>
                  ))}
                </CardDescription>

                <Link href={"/login"}>
                  <Button className='absolute bottom-0 left-1/2 translate-x-[-50%] w-[90%] lg:w-[70%] btnbg my-5'>
                    {prices.btnText}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sign up section */}

      <section className='w-full min-h-[400px] flex items-center my-14 bg-[#F1F5F9] p-4'>
        <div className='w-full min-h-[190px] flex flex-col gap-4 items-center text-center'>
          <h2 className='text-2xl lg:text-3xl font-bold'>Ready to Take Control of Your Finances?</h2>
          <p className='text-sm lg:text-lg'>
            Join thousands of users who are already managing their expenses smarter with{" "}
            <br className='hidden lg:block' /> SmartSpend.
          </p>
          <div className='flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between w-full lg:w-[250px]'>
            <a href='/register'>
              <Button className='btnbg'>Sign Up Now</Button>
            </a>
            <a href='/about'>
              <Button variant={"outline"}>Learn More</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingScreen;
