"use server";

import {
  ErrorResponseSchema,
  ResetPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  password: string;
  password_confirmation: string;
};

export async function resetPassword(
  token: string,
  prevState: ActionStateType,
  formdata: FormData
) {
  const passwordData = {
    password: formdata.get("password") as string,
    password_confirmation: formdata.get("password_confirmation") as string,
  };

  // validate
  const password = ResetPasswordSchema.safeParse(passwordData);

  if (!password.success) {
    return {
      errors: password.error.errors.map((error) => error.message),
      success: "",
      password: passwordData.password,
      password_confirmation: passwordData.password_confirmation,
    };
  }

  const response = await fetch(
    `${process.env.API_URL}/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password.data.password,
      }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);
    return {
      errors: [message],
      success: "",
      password: passwordData.password,
      password_confirmation: passwordData.password_confirmation,
    };
  }

  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success: success,
    password: "",
    password_confirmation: "",
  };
}
