import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddExpensesScheme } from "@/types/expensesType";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryItems } from "@/data/featureData";
import { useAppDispatch, useAppSelector } from "@/hooks/ReactHook";
import { AddExpenses } from "@/redux/action/ExpensesAction";
import { useRouter } from "next/navigation";

type AddExpensesScreenProps = {
  setActiveModel: () => void;
};

const AddExpensesScreen = ({ setActiveModel }: AddExpensesScreenProps) => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { loading, error } = useAppSelector((state) => state.expenses);
  const form = useForm<z.infer<typeof AddExpensesScheme>>({
    resolver: zodResolver(AddExpensesScheme),
    defaultValues: {
      title: "",
      category: "",
      amount: 10.0,
    },
  });

  const onSubmit = async (values: z.infer<typeof AddExpensesScheme>) => {
    try {
      const res = await dispatch(AddExpenses(values.title, values.amount, values.category));
      if (!res) {
        toast(error);
      }
      toast.success("Expenses Added Successfully");
      setActiveModel();
      route.refresh();
    } catch (error) {
      if (error) {
        toast.error("Request Failed");
      }
    } finally {
      form.reset({
        title: "",
        category: "",
        amount: 10.0,
      });
    }
  };

  return (
    <div className='bg-white rounded-lg max-w-md w-full space-y-5'>
      <div className=' flex justify-between items-center border-b-2 py-2 w-full'>
        <h2 className='font-bold text-xl'>Add New Expenses</h2>
        <Button onClick={setActiveModel} className='text-3xl' variant={"ghost"}>
          <X />
        </Button>
      </div>

      {/* Form Data */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Enter expenses name' {...field} required className='bg-transparent' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className='w-full'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CategoryItems.map((items, i) => (
                      <SelectItem key={i} value={items.name}>
                        {items.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='1000.00'
                    {...field}
                    min={10.0}
                    required
                    className='bg-transparent'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            <div className='flex gap-5'>
              <Button variant={"outline"} onClick={setActiveModel}>
                Cancle
              </Button>
              <Button disabled={loading} type='submit'>
                {loading ? `loading...` : "Add Expenses"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddExpensesScreen;
