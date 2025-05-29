import WindowIcon from "@/components/Svgs/windowIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { GetExpenses } from "@/redux/action/ExpensesAction";
import React, { useEffect } from "react";
import CardComponent from "./Components/CardComponent";
import SpirialIcon from "@/components/Svgs/spirialIcon";
import GrowthIcon from "@/components/Svgs/growthIcon";
import { Card } from "@/components/ui/card";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetExpenses());
  }, [dispatch]);

  const { loading, error, expenses, highestAmount, highestAmountCategory, recentItems, totalAmount } = useAppSelector(
    (state) => state.expenses
  );

  return (
    <div className='p-10 w-full h-full'>
      {loading ? (
        <div className='flex justify-center items-center text-center w-full h-full'>
          <span>loading ...</span>
        </div>
      ) : error ? (
        <div className='flex justify-center items-center text-center w-full h-full'>{error}</div>
      ) : expenses.length !== 0 ? (
        <div className='space-y-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            <CardComponent amount={totalAmount} svg={<WindowIcon />} h1='Total Spent' h2='from last month' />
            <CardComponent amount={60000} svg={<SpirialIcon />} h1='Monthly Budget' h2='remaining budget' />
            <CardComponent
              amount={highestAmount}
              svg={<GrowthIcon />}
              h1='Highest Expenses'
              h2={highestAmountCategory}
            />
            <CardComponent
              amount={recentItems?.amount}
              svg={<WindowIcon />}
              h1='Recent Expenses'
              h2={recentItems?.category}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card></Card>
            <Card></Card>
          </div>
          <div></div>
        </div>
      ) : (
        <div className='flex justify-center items-center text-center w-full h-full'>
          <span>No Expenses Found</span>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
