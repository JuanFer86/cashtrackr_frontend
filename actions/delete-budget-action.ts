"use server";

import getToken from "@/src/auth/token";
import {
  BudgetType,
  ErrorResponseSchema,
  PasswordValidationSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidateTag } from "next/cache";

type ActionStateDeleteBudget = {
  errors: string[];
  success: string;
  password: string;
};

export async function deleteBudget(
  budgetId: BudgetType["id"],
  prevState: ActionStateDeleteBudget,
  formData: FormData
) {
  const password = formData.get("password") as string;

  const currentPassword = PasswordValidationSchema.safeParse(password);

  if (!currentPassword.success) {
    return {
      ...prevState,
      errors: currentPassword.error.errors.map((error) => error.message),
      success: "",
      password: password,
    };
  }

  const token = await getToken();

  // check password
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`;
  const responseCheckPassword = await fetch(checkPasswordUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  const checkPasswordJson = await responseCheckPassword.json();

  if (!responseCheckPassword.ok) {
    const { message } = ErrorResponseSchema.parse(checkPasswordJson);

    return {
      errors: [message],
      success: "",
      password: password,
    };
  }

  // delete budget

  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);

    return {
      errors: [message],
      success: "",
      password: password,
    };
  }

  revalidateTag("all-budgets");

  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success: success,
    password: "",
  };
}
