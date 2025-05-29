import axiosInstance from "@/utils/apiClientInstance";
import { AppDispatch } from "../store";
import {
  setLoading,
  setError as setExpensesError,
  updateExpenses,
  addExpenses,
  getExpenses,
  deleteExpenses,
} from "../slice/Expenses";
import { ExpensesData, ExpensesState, filter } from "@/types/expensesType";
import { asyncErrorHandler } from "./error";

export const GetExpenses = (params?: filter) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await axiosInstance.get<ExpensesState>("/expense/get_expenses?", { params });
    dispatch(getExpenses(response.data.expenses));
  } catch (error) {
    asyncErrorHandler(error, dispatch, setExpensesError);
  } finally {
    dispatch(setLoading(false));
  }
};

export const AddExpenses =
  (title: string, amount: number, category: string) =>
  async (dispatch: AppDispatch): Promise<ExpensesData | null> => {
    dispatch(setLoading(true));

    try {
      const response = await axiosInstance.post<ExpensesData>("/expense/create_expenses", { title, amount, category });
      dispatch(addExpenses(response.data));
      return response.data;
    } catch (error) {
      if (error) {
        asyncErrorHandler(error, dispatch, setExpensesError);
      }
      throw new Error("Request Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const UpdateExpenses =
  (id: string, title: string) =>
  async (dispatch: AppDispatch): Promise<ExpensesData | null> => {
    dispatch(setLoading(true));

    try {
      const { data } = await axiosInstance.patch<ExpensesData>(`/expense/update_expenses/${id}`, { title });
      dispatch(updateExpenses(data));
      return data;
    } catch (error) {
      if (error) {
        asyncErrorHandler(error, dispatch, setExpensesError);
      }
      throw new Error("Request Failed");
    }
  };

export const DeleteExpenses = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    await axiosInstance.delete(`/expense/delete_expenses/${id}`);
    dispatch(deleteExpenses(id));
  } catch (error) {
    if (error) {
      asyncErrorHandler(error, dispatch, setExpensesError);
    }
    throw new Error("Request Failed");
  }
};
