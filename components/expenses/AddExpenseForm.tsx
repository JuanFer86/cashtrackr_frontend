import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState, useEffect } from "react";
import createExpense from "@/actions/create-expense-action";
import { useParams } from "next/navigation";
import { ErrorMessage } from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function AddExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  // params aren't allowed in client components, so we need to use useParams hook
  const { id } = useParams();

  const createExpenseWithBudgetId = createExpense.bind(null, Number(id));
  const [state, dispatch] = useActionState(createExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          closeModal();
        },
      });
    }
  }, [state]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Add Expense
      </DialogTitle>

      <p className="text-xl font-bold">
        Fill out the form and create an {""}
        <span className="text-amber-500">Expense</span>
      </p>

      {state.errors.length > 0 &&
        state.errors.map((error) => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10"
        noValidate
        action={dispatch}
      >
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Register Expense"
        />
      </form>
    </>
  );
}
