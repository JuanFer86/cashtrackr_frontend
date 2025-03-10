"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";
import { error } from "console";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function validateToken(token: string, prevState: ActionStateType) {
  const resetPasswordToken = TokenSchema.safeParse(token);

  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.errors.map((error) => error.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/validate-token`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: resetPasswordToken.data }),
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

  return {
    errors: [],
    success: success,
  };
}
