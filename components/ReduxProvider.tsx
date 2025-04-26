"use client";

import { store } from "@/Context/store";
import React from "react";
import { Provider } from "react-redux";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import Header from "./Header";
import LandingPageFooter from "./LandingPageFooter";

const ReduxProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const publicRoutes = ["/login", "/register", "/forget-password", "/reset-password"];
  return (
    <Provider store={store}>
      <HeaderConditional publicRoutes={publicRoutes} />
      {children}
      <FooterConditional publicRoutes={publicRoutes} />
    </Provider>
  );
};

const HeaderConditional = ({ publicRoutes }: { publicRoutes: string[] }) => {
  const pathname = usePathname();

  if (publicRoutes.includes(pathname || "")) {
    return null;
  }

  return <Header />;
};

const FooterConditional = ({ publicRoutes }: { publicRoutes: string[] }) => {
  const pathname = usePathname();

  if (publicRoutes.includes(pathname || "")) {
    return <Footer />;
  }

  return <LandingPageFooter />;
};

export default ReduxProvider;
