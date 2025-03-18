"use server";

import {
  BudgetType,
  ErrorResponseSchema,
  ExpenseType,
  SuccessSchema,
} from "@/src/schemas";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseIdType = {
  budgetId: BudgetType["id"];
  expenseId: ExpenseType["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseIdType,
  prevState: ActionStateType
) {
  const token = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);

    return {
      errors: [message],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json.message);
  revalidatePath(`/admin/budgets/${budgetId}`);

  return {
    errors: [],
    success: success,
  };
}
