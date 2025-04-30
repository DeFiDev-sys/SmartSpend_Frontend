import { getAuthToken } from "@/servers/server";
import axios from 'axios'

const BASE_URL = 'http://localhost:8000/'


const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL || BASE_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
});

axiosInstance.interceptors.request.use(async (config)=>{
    const token = await getAuthToken();

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},

    (error)=>Promise.reject(error)
);

axiosInstance.interceptors.response.use((res)=>res,(error)=>Promise.reject(error))


export default axiosInstance