"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

type CookieOptions = {
  expires: Date;
  httpOnly: boolean;
  secure: boolean;
  path: string;
  sameSite: "strict" | "lax" | "none";
};

export const setAuthCookies = async (token: string) => {
  (await cookies()).set("token", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  } as CookieOptions);
};

export const verifyAuthToken = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      throw new Error("No authentication token found");
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: string; email: string };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAuthToken = async () => {
  return (await cookies()).get("token")?.value;
};

export const deleteAuthToken = async () => {
  try {
    const cookie = await cookies();
    cookie.delete("token");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete token:", error);
    throw error;
  }
};
