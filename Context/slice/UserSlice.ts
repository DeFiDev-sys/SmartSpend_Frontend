
import { userInfo, userState } from "@/types/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userState = {
    loading: false,
    error: null,
    success: null,
    userData: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.loading = false
            state.success = null
            state.error = action.payload
        },
        setSuccess: (state, action: PayloadAction<string | null>) => {
            state.loading = false
            state.error = null
            state.success = action.payload
        },
        setUserData: (state, action: PayloadAction<userInfo>) => {
            state.loading = false
            state.error = null
            state.userData = action.payload
        },
        setUserLogout: (state) => {
            state.loading = false
            state.error = null
            state.success = null
            state.userData = null
        },
    }
});


interface RootState {
    user: userState
}


export const { setLoading, setError, setSuccess, setUserData, setUserLogout } = userSlice.actions;
export default userSlice.reducer;
export const UserSelector = (state: RootState) => state.user