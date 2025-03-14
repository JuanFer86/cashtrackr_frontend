import { DraftExpenseType } from "@/src/schemas";

export default function ExpenseForm({
  expense,
}: {
  expense?: DraftExpenseType;
}) {
  return (
    <>
      <div className="mb-5">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Expense Name
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100  bg-white"
          type="text"
          placeholder="Expense Name"
          name="name"
          defaultValue={expense?.name}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Expense Quantity
        </label>
        <input
          id="amount"
          className="w-full p-3  border border-gray-100 bg-white"
          type="number"
          placeholder="Expense Quantity"
          name="amount"
          defaultValue={expense?.amount}
        />
      </div>
    </>
  );
}
