import axiosInstance from "@/utils/apiClientInstance";
import { setLoading, setError as setUserError, setSuccess, setUserData } from "@/redux/slice/UserSlice";
import { AppDispatch } from "../store";
import { userDataResponse, userStatusMsg } from "@/types/definitions";
import { setAuthCookies } from "@/servers/server";
import { handleAsyncError } from "@/utils/errorHandler";
import axios from "axios";
import { asyncErrorHandler } from "./error";

export const LoginUserAction =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<userDataResponse> => {
    dispatch(setLoading(true));

    try {
      const response = await axiosInstance.post<userDataResponse>("/auth/login", { email, password });

      if (response.data.token) {
        await setAuthCookies(response.data.token);
        dispatch(setSuccess(response.data.message));
        dispatch(setUserData(response.data.user));
      } else {
        const error = new Error("No authentication token found");
        dispatch(setUserError(error.message));
      }

      return response.data;
    } catch (error) {
      handleAsyncError(error, dispatch, setUserError);
      throw new Error("Request Failed");
    }
  };

export const RegisterUserAction =
  (firstname: string, lastname: string, email: string, username: string, password: string,) =>
  async (dispatch: AppDispatch): Promise<userDataResponse> => {
    dispatch(setLoading(true));

    try {
      const response = await axiosInstance.post<userDataResponse>("/auth/register", {
        firstname,
        lastname,
        email,
        username,
        password,
      });

      if (response.data.token) {
        await setAuthCookies(response.data.token);

        dispatch(setSuccess(response.data.message));
        dispatch(setUserData(response.data.user));
      }

      return response.data;
    } catch (error) {
        handleAsyncError(error, dispatch, setUserError);
        throw new Error("Request Failed");
    }
  };

export const ForgetPasswordAction =  (email:string) => async (dispatch:AppDispatch) => {
  dispatch(setLoading(true))
  
  try {
    const {data} = await axiosInstance.post<userStatusMsg>('/auth/request-new-password',{email})
     dispatch(setSuccess(data.message))
  } catch (error) {
    // handleAsyncError(error,dispatch,setUserError);
    asyncErrorHandler(error,dispatch,setUserError)
  }
}

export const ResetPasswordAction = (token:string,newPassword:string) => async (dispatch:AppDispatch) =>{
  dispatch(setLoading(true))

  try {
    const response = await axiosInstance.post<userStatusMsg>('/auth/reset-password',{token,newPassword})
    dispatch(setSuccess(response.data.message))
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      dispatch(setUserError(serverMessage || 'Password reset failed'));
    } else {
      handleAsyncError(error, dispatch, setUserError);
    }
  }
}
