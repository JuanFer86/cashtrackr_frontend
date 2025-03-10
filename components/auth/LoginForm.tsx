"use client";

import { authenticate } from "@/actions/authenticate-user-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [state, dispatch] = useActionState(authenticate, {
    errors: [],
    success: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    }

    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <>
      <form className="mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
            defaultValue={state.email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
            defaultValue={state.password}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
