"use server";

import getToken from "@/src/auth/token";
import {
  ErrorResponseSchema,
  SuccessSchema,
  UpdateUserSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const updateUser = async (
  prevState: ActionStateType,
  formData: FormData
) => {
  const userData = UpdateUserSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
  });

  if (!userData.success) {
    return {
      errors: userData.error.errors.map((error) => error.message),
      success: "",
    };
  }

  // update user

  const token = await getToken();
  const url = `${process.env.API_URL}/auth/user`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: userData.data.name,
      email: userData.data.email,
    }),
  });

  const json = (await response.json()) as { message: string };

  if (!response.ok) {
    const { message } = ErrorResponseSchema.parse(json);
    return {
      errors: [message],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json.message);
  revalidatePath("/admin/profile");

  return {
    errors: [],
    success: success,
  };
};
