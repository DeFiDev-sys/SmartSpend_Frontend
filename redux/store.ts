import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/UserSlice';
import { ExpensesSlice } from './slice/Expenses';

export const store = configureStore({
    reducer: {
        user : userSlice.reducer,
        expenses : ExpensesSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
