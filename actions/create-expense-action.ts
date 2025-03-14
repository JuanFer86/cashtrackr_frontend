"use server";

import getToken from "@/src/auth/token";
import {
  BudgetType,
  DraftExpenseSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function createExpense(
  budgetId: BudgetType["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const expenseData = {
    name: formData.get("name") as string,
    amount: formData.get("amount") as string,
  };

  const expense = DraftExpenseSchema.safeParse(expenseData);

  if (!expense.success) {
    return {
      errors: expense.error.errors.map((error) => error.message),
      success: "",
    };
  }

  // generate Expense
  const token = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense.data),
  });

  const json = await response.json();

  console.log(json);

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
