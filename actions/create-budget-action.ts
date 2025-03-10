"use server";

import getToken from "@/src/auth/token";
import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas";

export type ActionStateCreateBudgetType = {
  errors: string[];
  success: string;
  name: string;
  amount: string;
};

export async function createBudget(
  prevState: ActionStateCreateBudgetType,
  formData: FormData
) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name") as string,
    amount: formData.get("amount") as string,
  });
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
      name: formData.get("name") as string,
      amount: formData.get("amount") as string,
    };
  }

  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budget.data),
  });

  const json = await response.json();

  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success: success,
    name: "",
    amount: "",
  };
}
