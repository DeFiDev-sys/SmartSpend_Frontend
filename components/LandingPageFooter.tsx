import React from "react";
import BrandLogo from "./BrandLogo";
import { footerLinks } from "@/data/featureData";

const LandingPageFooter = () => {
  return (
    <footer className='w-full h-full lg:min-h-[322px] px-4 py-2 flex flex-col gap-8'>
      {/* first div */}
      <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-4 h-full lg:min-h-[140px]'>
        <div className='w-full lg:max-w-[301px] h-full flex flex-col  gap-5'>
          <div className='w-full flex gap-1.5 items-center'>
            <BrandLogo />
            <h1 className='font-bold'>SmartSpend</h1>
          </div>

          <p className='text-xs'>Take control of your finances with our powerful expense tracking solution.</p>
        </div>
        <div className='w-full lg:max-w-[301px] h-full flex flex-col  gap-5'>
          <h5>Product</h5>
          <ul className='footerul'>
            {footerLinks.products.map((links, i) => (
              <a href={links.linkPath} key={i}>
                <li>{links.name}</li>
              </a>
            ))}
          </ul>
        </div>
        <div className='w-full lg:max-w-[301px] h-full flex flex-col  gap-5'>
          <h5>Company</h5>
          <ul className='footerul'>
            {footerLinks.company.map((links, i) => (
              <a href={links.linkPath} key={i}>
                <li>{links.name}</li>
              </a>
            ))}
          </ul>
        </div>
        <div className='w-full lg:max-w-[301px] h-full flex flex-col  gap-5'>
          <h5>Legal</h5>
          <ul className='footerul'>
            {footerLinks.legal.map((links, i) => (
              <a href={links.linkPath} key={i}>
                <li>{links.name}</li>
              </a>
            ))}
          </ul>
        </div>
      </div>

      {/* second div */}
      <div className='w-full min-h-24 flex justify-center items-center border-t'>
        <p>© {new Date().getFullYear()} SmartSpend. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
