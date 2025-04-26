import {z} from "zod"
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