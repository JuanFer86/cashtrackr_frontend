"use server";

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type AuthenticateStateType = {
  errors: string[];
  success: string;
  email: string;
  password: string;
};

export async function authenticate(
  prevState: AuthenticateStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const auth = LoginSchema.safeParse(loginCredentials);

  if (!auth.success) {
    return {
      errors: auth.error.errors.map((error) => error.message),
      success: "",
      email: loginCredentials.email,
      password: loginCredentials.password,
    };
  }

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...auth.data,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);

    return {
      errors: [message],
      success: "",
      email: loginCredentials.email,
      password: loginCredentials.password,
    };
  }

  // set cookie

  (await cookies()).set({
    name: "CASHTRACKR_TOKEN",
    value: json.token,
    httpOnly: true,
    path: "/",
  });

  redirect("/admin");
}
