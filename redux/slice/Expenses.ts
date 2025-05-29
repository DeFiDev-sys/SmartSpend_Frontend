import { ExpensesData, ExpensesState } from '@/types/expensesType'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const calculateSubtotalAmount = (expenses :ExpensesData[])  => {
    let totalAmount = 0
    if (!expenses || expenses.length === 0) {
        return 0
    }
    expenses.map((item) => (totalAmount += item.amount))
    return totalAmount
}

const getHighestAmount = ( expenses : ExpensesData[]) => {
    if (!expenses || expenses.length === 0) {
        return 0
    }
    return expenses.reduce((max, items) => Math.max(max, items.amount), -Infinity)
}

const getHighestAmountCategory = (expenses : ExpensesData[]) => {
    if (!expenses || expenses.length === 0) {
        return ""
    }
    const categoryData = expenses.reduce((prev, current) => 
        (prev.amount > current.amount) ? prev : current
    );

    return categoryData.category
}

const getRecentItem = (expenses : ExpensesData[]) => {
    if (!expenses || expenses.length === 0) {
        return null
    }
    return expenses.reduce((latest, expense) =>
        new Date(expense.createdAt) > new Date(latest.createdAt) ? expense : latest
    )
}

const initialState : ExpensesState ={
    loading : false,
    error : null,
    expenses : [],
    totalAmount :  0,
    highestAmount :  0,
    highestAmountCategory:"",
    recentItems : null,
};

export const ExpensesSlice = createSlice({
    name:"expenses",
    initialState,
    reducers:{
        setLoading:(state, action:PayloadAction<boolean>)=>{
            state.loading = action.payload;
        },
        setError:(state,action:PayloadAction<string>)=>{
            state.loading = false;
            state.error = action.payload;
        },
        getExpenses : (state, action:PayloadAction<ExpensesData[]>) => {
            state.loading = false;
            state.error = null;
            state.expenses = action.payload;
            state.totalAmount = Number(calculateSubtotalAmount(state.expenses));
            state.highestAmount = Number(getHighestAmount(state.expenses));
            state.highestAmountCategory = String (getHighestAmountCategory(state.expenses))
            state.recentItems = getRecentItem(state.expenses)
        },
        addExpenses : (state,action:PayloadAction<ExpensesData>) => {
            state.expenses?.unshift(action.payload);
        },
        updateExpenses : (state, action:PayloadAction<ExpensesData>) => {
            const index = state.expenses?.findIndex((expense)=>expense._id === action.payload._id);
            if(index !== -1){
                state.expenses[index] = action.payload
            };
        },
        deleteExpenses : (state, action:PayloadAction<string>) => {
            state.expenses = state.expenses.filter((expense)=>expense._id !== action.payload);
        },
    },
});


interface RootState {
    expenses : ExpensesState
}

export const {setLoading,setError,getExpenses,addExpenses,updateExpenses,deleteExpenses} = ExpensesSlice.actions
export default ExpensesSlice.reducer
export const ExpensesSelector = (state : RootState) => state.expenses