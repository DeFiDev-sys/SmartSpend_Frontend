import axiosInstance from "@/utils/apiClientInstance";
import { setLoading, setError as setUserError, setSuccess, setUserData } from "@/redux/slice/UserSlice";
import { AppDispatch } from "../store";
import { userDataResponse } from "@/types/definitions";
import { setAuthCookies } from "@/servers/server";
import { handleAsyncError } from "@/utils/errorHandler";

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
