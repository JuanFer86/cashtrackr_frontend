"use server";

import getToken from "@/src/auth/token";
import {
  ErrorResponseSchema,
  SuccessSchema,
  UpdatePasswordSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updatePassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formData.get("current_password") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  });

  if (!userPassword.success) {
    return {
      errors: userPassword.error.errors.map((error) => error.message),
      success: "",
    };
  }

  const token = await getToken();
  const url = `${process.env.API_URL}/auth/update-password`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: userPassword.data.current_password,
      password: userPassword.data.password,
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

  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success: "success",
  };
}
