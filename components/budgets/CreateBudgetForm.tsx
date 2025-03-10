"use client";

import { createBudget } from "@/actions/create-budget-action";
import { useActionState, useEffect } from "react";
import { ErrorMessage } from "../ui/ErrorMessage";
import { SuccessMessage } from "../ui/SuccessMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BudgetForm from "./BudgetForm";

export default function CreateBudgetForm() {
  const router = useRouter();

  const [state, dispatch] = useActionState(createBudget, {
    errors: [],
    success: "",
    name: "",
    amount: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/admin");
        },
        onClick: () => {
          router.push("/admin");
        },
      });
    }
  }, [state]);

  return (
    <form className="mt-10 space-y-3" noValidate action={dispatch}>
      {state.errors.length > 0 &&
        state.errors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}

      <BudgetForm state={state} />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Create Budget"
      />
    </form>
  );
}
