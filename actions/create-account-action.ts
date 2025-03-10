"use server";

import {
  ErrorResponseSchema,
  RegisterSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

export async function register(prevState: ActionStateType, formData: FormData) {
  const registerData = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };

  // validate
  const register = RegisterSchema.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message);
    return {
      errors,
      success: "",
      email: registerData.email,
      name: registerData.name,
      password: registerData.password,
      password_confirmation: registerData.password_confirmation,
    };
  }

  // register user

  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: register.data.name,
      email: register.data.email,
      password: register.data.password,
    }),
  });

  const json = (await req.json()) as { message: string };

  if (req.status === 409) {
    const error = ErrorResponseSchema.parse(json);
    return {
      errors: [error.message],
      success: "",
      email: prevState.email,
      name: prevState.name,
      password: prevState.password,
      password_confirmation: prevState.password_confirmation,
    };
  }

  const success = SuccessSchema.parse(json.message);

  return {
    errors: [],
    success: success,
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  };
}
