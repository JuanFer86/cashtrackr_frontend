import { formatCurrency } from "@/src/utils";
import { FC } from "react";

type AmountPropsTypes = {
  label: string;
  amount: number;
};

const Amount: FC<AmountPropsTypes> = ({ label, amount }) => {
  return (
    <p className="text-2xl font-bold">
      {label}: <span className="text-amber-500">{formatCurrency(amount)}</span>
    </p>
  );
};

export default Amount;
