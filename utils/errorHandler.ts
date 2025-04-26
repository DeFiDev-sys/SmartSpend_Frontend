import axios from "axios";
import { AppDispatch } from "@/redux/store";
import { PayloadAction } from "@reduxjs/toolkit";

export const handleAsyncError  = (
    error:unknown,
    dispatch:AppDispatch,
    setError:(message:string)=>PayloadAction<string | null>,
): string =>{
    if (axios.isAxiosError(error)) {
        dispatch(setError(error.response?.data?.message))
        throw new Error(error.response?.data?.message || "Login failed");
    }
    
    throw error;
}