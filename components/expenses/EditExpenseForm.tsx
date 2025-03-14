import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExpenseType } from "@/src/schemas";
import editExpense from "@/actions/edit-expense-action";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [expense, setexpense] = useState<DraftExpenseType>();
  const { id: budgetId } = useParams();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("editExpenseId");

  const editExpensewithBudgetId = editExpense.bind(null, {
    budgetId: Number(budgetId),
    expenseId: Number(expenseId),
  });
  const [state, dispatch] = useActionState(editExpensewithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;

    (async () => {
      const response = await fetch(url);
      const jsonExpense = await response.json();
      setexpense(jsonExpense);
    })();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      {state.errors.length > 0 &&
        state.errors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Save Changes"
        />
      </form>
    </>
  );
}
