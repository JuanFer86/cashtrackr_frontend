"use server";

import { ErrorResponseSchema, ForgotPasswordSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.errors.map((error) => error.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: forgotPassword.data.email,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);
    return {
      errors: [message],
      success: "",
    };
  }

  return {
    errors: [],
    success: "Instructions sent to your email",
  };
}
