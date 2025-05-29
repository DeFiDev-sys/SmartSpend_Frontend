import {z} from "zod"

export type ExpensesData = {
    _id:string,
    title : string,
    amount : number,
    category : string,
    createdAt:Date,
}

export interface ExpensesState {
    loading : boolean,
    error : string | null,
    expenses : ExpensesData[],
    totalAmount : number | string,
    highestAmount : number | string,
    highestAmountCategory :string,
    recentItems : ExpensesData | null,
}

export type filter ={
    category?: string;
    startDate?: string;
    endDate?: string;
    range?: string;
    sort?: string;
}

export type SidebarItem = {
    icon: React.ReactNode;
    name: string;
  };

export const AddExpensesScheme = z.object({
    title : z.string().toUpperCase().trim(),
    category : z.string().trim(),
    amount: z.coerce.number().min(10.00),
})