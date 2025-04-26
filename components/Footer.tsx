import React from "react";

const Footer = () => {
  return (
    <footer className='w-full min-h-12 flex justify-center items-center border-t'>
      <p>© {new Date().getFullYear()} SmartSpend. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
