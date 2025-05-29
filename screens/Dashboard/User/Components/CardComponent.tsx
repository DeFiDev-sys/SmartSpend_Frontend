import { Card } from "@/components/ui/card";
import React, { ReactNode } from "react";

type AmountType = {
  amount?: number | string;
  svg?: ReactNode;
  h1?: string;
  h2?: string;
};

const CardComponent = ({ amount, svg, h1, h2 }: AmountType) => {
  return (
    <Card className='p-5 '>
      <div className='flex justify-center items-center gap-5'>
        <>{svg}</>
        <div className='space-y-1'>
          <p className='text-xs'>{h1}</p>
          <h2 className='text-lg lg:text-xl font-bold'>
            {amount?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h2>
        </div>
      </div>
      <p className='text-center text-xs'>{h2}</p>
    </Card>
  );
};

export default CardComponent;
