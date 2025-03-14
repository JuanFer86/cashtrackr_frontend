"use server";

import { BudgetType, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { ExpenseType, DraftExpenseSchema } from "../src/schemas/index";
import getToken from "@/src/auth/token";

type budgetIdAndExpenseIdType = {
  budgetId: BudgetType["id"];
  expenseId: ExpenseType["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function editExpense(
  { budgetId, expenseId }: budgetIdAndExpenseIdType,
  prevState: ActionStateType,
  formData: FormData
) {
  const expenseData = {
    name: formData.get("name") as string,
    amount: Number(formData.get("amount")),
  };

  const expense = DraftExpenseSchema.safeParse(expenseData);

  if (!expense.success) {
    return {
      errors: expense.error.errors.map((issue) => issue.message),
      success: "",
    };
  }

  // update expense

  const token = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense.data),
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

  return {
    errors: [],
    success: success,
  };
}
