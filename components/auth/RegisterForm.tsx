"use client";

import { register } from "@/actions/create-account-action";
import { useActionState, useEffect } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { SuccessMessage } from "../ui/SuccessMessage";

export default function RegisterForm() {
  const [state, dispatch] = useActionState(register, {
    errors: [],
    success: "",
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  return (
    <form className="mt-14 space-y-5" noValidate action={dispatch}>
      {state.errors.map((error) => (
        <ErrorMessage key="error">{error}</ErrorMessage>
      ))}

      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email of Register"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
          defaultValue={state.email}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Nombre</label>
        <input
          id="name"
          type="name"
          placeholder="Name of Register"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="name"
          defaultValue={state.name}
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

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repeat password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
          defaultValue={state.password_confirmation}
        />
      </div>

      <input
        type="submit"
        value="Register me"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
}
