"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { aboutData } from "@/data/featureData";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className='min-h-dvh space-y-10 scroll-smooth overflow-x-hidden'>
      {/* Hero section */}
      <section className='min-h-[304px] w-full flex items-center'>
        <div className='w-full min-h-full'>
          <div className='w-full text-center space-y-4'>
            <h1 className='font-bold text-3xl lg:text-5xl'>Our Mission</h1>
            <p className='text-xs md:text-sm font-light'>
              We&apos;re on a mission to empower individuals and businesses with smart financial <br /> tools that make
              expense tracking simple, insightful, and effective.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className=' w-full min-h-[765px] bg-[#F1F5F9] py-24'>
        <div className='w-full min-h-[590px] px-5 lg:px-10 space-y-20'>
          <div className='w-full h-full space-y-5'>
            <h2 className='text-2xl lg:text-3xl font-bold'>Our Story</h2>
            <p>
              Founded in 2024, SmartSpend emerged from a simple observation: managing expenses shouldn&apos;t be
              complicated. Our founders experienced firsthand the challenges of tracking expenses across multiple
              platforms and decided to create a solution that would make financial management accessible to everyone.
            </p>
            <p>
              What started as a simple expense tracker has evolved into a comprehensive financial management platform,
              helping thousands of users take control of their finances and achieve their financial goals.
            </p>
          </div>
          <div className='flex items-center justify-center w-full min-h-full'>
            <Image
              src={
                "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              }
              alt='story image'
              className='object-cover rounded-lg shadow-2xl'
              width={650}
              height={350}
            />
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className='w-full min-h-[414px] px-5 lg:px-20 flex justify-center items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-14 2xl:gap-24 py-10 px-5 lg:px-20  w-full text-center'>
          {aboutData.achievements.map((achieve, i) => (
            <Card key={i} className='flex flex-col items-center justify-center p-5 2xl:p-10'>
              <h2 className='flex font-bold text-xl lg:text-3xl'>
                <span>{achieve.preInitials}</span>
                {achieve.tags}
                <span>{achieve.postInitials}</span>
              </h2>
              <h3 className='font-semibold text-lg'>{achieve.headlines}</h3>
              <p>{achieve.writeUps}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Our values */}
      <section className='w-full min-h-[724px] bg-[#F1F5F9] py-24'>
        <div className='w-full min-h-[545px] space-y-10 px-10 lg:px-52'>
          <div className='w-full text-center h-full space-y-5'>
            <h2 className='font-bold text-xl lg:text-3xl'>
              Our <br /> Values
            </h2>
            <p>The principle that guides everything we do</p>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 w-full text-center'>
            {aboutData.values.map((values, i) => (
              <Card key={i} className='flex flex-col items-center justify-center p-5  bg-[#F1F5F9]'>
                <CardContent>{values.icons}</CardContent>

                <CardTitle>{values.title}</CardTitle>

                <CardDescription className='px-10 2xl:px-32'>{values.desc}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='w-full min-h-[600px]'>
        <div className='w-full h-full space-y-10 px-5 py-5'>
          <div className='w-full text-center h-full space-y-5'>
            <h2 className='font-bold text-xl lg:text-3xl'>Meet Our Team</h2>
            <p>The people behind SmartSpend who are passionate about helping you achieve financial success</p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 w-full px-20 text-center'>
            {aboutData.teamManagers.map((team, i) => (
              <div key={i} className='flex flex-col items-center justify-center p-5 w-full h-full'>
                <Avatar className='w-28 h-28'>
                  <AvatarImage src={team.pics} alt='@shadcn' className='object-cover' width={650} height={650} />
                  <AvatarFallback>{`${team.firstName[0]}${team.lastName[0]}`.toLocaleUpperCase()}</AvatarFallback>
                </Avatar>

                <h3 className='font-bold text-xl'>
                  {team.firstName} {team.lastName}
                </h3>

                <p>{team.post}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='w-full min-h-[324px] bg-[#F1F5F9] py-24 mb-14 flex items-center text-center'>
        <div className='w-full h-full flex flex-col items-center justify-center gap-5 px-10'>
          <h2 className='font-bold text-xl lg:text-3xl'>Join Our Journey</h2>
          <p>Be part of our mission to revolutionize personal finance management</p>
          <div className='flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between w-full lg:w-[250px]'>
            <a href='/register'>
              <Button className='btnbg w-full py-6'>Get Started</Button>
            </a>
            <a href='/career'>
              <Button variant={"outline"} className='py-6 w-full'>
                View Careers
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
