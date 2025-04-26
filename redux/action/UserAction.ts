import axiosInstance from "@/utils/apiClientInstance";
import {setLoading,setError as setUserError,setSuccess,setUserData} from "@/redux/slice/UserSlice"
import { AppDispatch } from "../store";
import { userDataResponse } from "@/types/definitions";
import { setAuthCookies } from "@/servers/server";
import { handleAsyncError } from "@/utils/errorHandler";


export const LoginUserAction = (email:string, password:string) => async (dispatch:AppDispatch): Promise<userDataResponse>  => {
    dispatch(setLoading(true));

    try {
        const response = await axiosInstance.post<userDataResponse>('/auth/login',{email,password})

        if((await response).data.token){
            await setAuthCookies(response.data.token);
            dispatch(setSuccess(response.data.message))
            // setTimeout(()=>dispatch(setSuccess(null)),2000);
            dispatch(setUserData(response.data.user))
        }else{
           const error = new Error("No authentication token found");
           dispatch(setUserError(error.message))
        //    setTimeout(() => dispatch(setUserError(null)), 2000);
        }

        return response.data
    } catch (error) {
        handleAsyncError(error,dispatch,setUserError)
        // setTimeout(() => dispatch(setUserError(null)), 2000);
        throw error
    }
}