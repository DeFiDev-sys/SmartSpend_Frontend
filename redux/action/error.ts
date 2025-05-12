import { AxiosError } from "axios"
import { AppDispatch } from "../store"
import { PayloadAction } from "@reduxjs/toolkit"

type CustomError = {
    error: AxiosError
}

const asyncErrorHandler = (
    error: unknown,
    dispatch: AppDispatch,
    setError: (message: string) => PayloadAction<string | null>
): string => {
    let errorMessage = "Request Failed"
    
    if (typeof error === 'object' && error !== null) {
        if ('isAxiosError' in error && error.isAxiosError) {
            const axiosError = error as AxiosError
            errorMessage = axiosError.message
        } 

        else if ('error' in error && (error as CustomError).error instanceof Error) {
            const customError = error as CustomError
            errorMessage = customError.error.message
        }

        else if ('message' in error && typeof (error as Error).message === 'string') {
            errorMessage = (error as Error).message
        }
    }
    dispatch(setError(errorMessage))
    return errorMessage
}

export { asyncErrorHandler }