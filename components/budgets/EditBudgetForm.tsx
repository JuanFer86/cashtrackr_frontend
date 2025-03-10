"use client";

import { useActionState, useEffect } from "react";
import BudgetForm from "./BudgetForm";
import { editBudget } from "@/actions/edit-budget-action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BudgetType } from "@/src/schemas";
import { stat } from "fs";
import { ErrorMessage } from "../ui/ErrorMessage";

const EditBudgetForm = ({ budget }: { budget: BudgetType }) => {
  const router = useRouter();

  const editBudgetWithId = editBudget.bind(null, budget?.id);
  const [state, dispatch] = useActionState(editBudgetWithId, {
    errors: [],
    success: "",
    name: budget.name,
    amount: budget.amount,
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
        value="Save Changes"
      />
    </form>
  );
};

export default EditBudgetForm;
