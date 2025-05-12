import {z} from "zod"
export const getUserFromLocalstorage = (): userInfo | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const storedUserInfo = localStorage.getItem("userData");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    return null;
  }
};



//Login Schema
export const LoginSchema = z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z
      .string()
      .min(2, { message: "Password must be at least 8 characters long." })
    //   .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    //   .regex(/[0-9]/, { message: "Contain at least one number." })
    //   .regex(/[^a-zA-Z0-9]/, {
    //     message: "Contain at least one special character.",
    // })
    .trim(),
  });
export const RegisterSchema = z.object({
    firstname:z.string().trim(),
    lastname:z.string().trim(),
    email: z.string().email("Invalid email address").trim(),
    username:z.string().min(3,{message:"UserName must be 3 characters long."}).trim(),
    password: z
      .string()
      .min(2, { message: "Password must be at least 8 characters long." })
    //   .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    //   .regex(/[0-9]/, { message: "Contain at least one number." })
    //   .regex(/[^a-zA-Z0-9]/, {
    //     message: "Contain at least one special character.",
    // })
    .trim(),
    confirmPassword: z
      .string()
      .min(2, { message: "Password must be at least 8 characters long." })
    //   .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    //   .regex(/[0-9]/, { message: "Contain at least one number." })
    //   .regex(/[^a-zA-Z0-9]/, {
    //     message: "Contain at least one special character.",
    // })
    .trim(),
    checkPolicy:z.boolean().default(false).optional()
  });

  export const ForgetPasswordScheme = z.object({
    email: z.string().email("Invalid email address").trim(),
  });

  export const ResetPasswordScheme = z.object({
    password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters long." })
  //   .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  //   .regex(/[0-9]/, { message: "Contain at least one number." })
  //   .regex(/[^a-zA-Z0-9]/, {
  //     message: "Contain at least one special character.",
  // })
  .trim(),
  confirmPassword: z
    .string()
    .min(2, { message: "Password must be at least 8 characters long." })
  //   .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
  //   .regex(/[0-9]/, { message: "Contain at least one number." })
  //   .regex(/[^a-zA-Z0-9]/, {
  //     message: "Contain at least one special character.",
  // })
  .trim(),
  });

// user types
export type userInfo ={
    id: string;
    firstname: string;
    lastname: string;
    username:string;
    email: string;
    admin:boolean;
}

//user response from the API
export interface userDataResponse {
    user:userInfo,
    token:string,
    message:string,
}

//user State interface
export interface userState {
    loading:boolean;
    error:string | null;
    success:string|null
    userData:userInfo | null;
}

export interface userStatusMsg {
  message:string
}

export type token ={
  token : string
}