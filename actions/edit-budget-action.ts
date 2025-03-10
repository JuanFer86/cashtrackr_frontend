"use server";

import getToken from "@/src/auth/token";
import {
  BudgetType,
  DraftBudgetSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";
import { ActionStateCreateBudgetType } from "./create-budget-action";
import { revalidatePath, revalidateTag } from "next/cache";

export async function editBudget(
  budgetId: BudgetType["id"],
  prevState: ActionStateCreateBudgetType,
  formData: FormData
) {
  const budgetData = {
    name: formData.get("name") as string,
    amount: formData.get("amount") as string,
  };

  const budget = DraftBudgetSchema.safeParse({
    name: budgetData.name,
    amount: budgetData.amount,
  });

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
      name: budgetData.name,
      amount: budgetData.amount,
    };
  }

  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/budgets/${budgetId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budget.data),
  });

  const json = await response.json();

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);
    return {
      errors: [message],
      success: "",
      name: budgetData.name,
      amount: budgetData.amount,
    };
  }

  // use when the cache is not updated, for all the urls that need to be revalidated
  //   revalidatePath("/admin");

  // or use the revalidateTag to revalidate an specific tag for example, is called in route admin for bring all the budgets
  revalidateTag("all-budgets");

  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success: success,
    name: budgetData.name,
    amount: budgetData.amount,
  };
}
