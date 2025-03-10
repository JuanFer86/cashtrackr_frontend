// Data acces later
import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserSchema } from "../schemas";
import { cache } from "react";

export const VerifySession = cache(async () => {
  const token = (await cookies()).get("CASHTRACKR_TOKEN")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.API_URL}/auth/user`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await response.json();
  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
