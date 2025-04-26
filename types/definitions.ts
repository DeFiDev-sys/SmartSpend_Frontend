// import {z} from "zod"


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