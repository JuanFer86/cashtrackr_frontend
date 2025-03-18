import { z } from "zod";
import { updatePassword } from "@/actions/update-password-action";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    name: z.string().min(1, { message: "Name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    {
      message: "Passwords are not equal",
      path: ["password_confirmation"],
    }
  );

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirmation;
    },
    {
      message: "Passwords are not equal",
      path: ["password_confirmation"],
    }
  );

export const SuccessSchema = z.string().min(1, { message: "Value not valid" });

export const ErrorResponseSchema = z.object({
  message: z.string(),
});

export const TokenSchema = z
  .string({ message: "Invalid token" })
  .length(6, { message: "invalid token" });

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
});

export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema),
});

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "Password Invalid" });

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "Expense name is required" }),
  amount: z.coerce.number().min(1, { message: "Expense amount is invalid" }),
});

export const BudgetsAPIResponseSchema = z.array(
  BudgetAPIResponseSchema.omit({ expenses: true })
);

export const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
});

export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, { message: "Password is required" }),
    password: z
      .string()
      .min(8, { message: "Password should at least 8 characters" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords are not equal",
    path: ["password_confirmation"],
  });

export type UserType = z.infer<typeof UserSchema>;
export type BudgetType = z.infer<typeof BudgetAPIResponseSchema>;
export type DraftExpenseType = z.infer<typeof DraftExpenseSchema>;
export type ExpenseType = z.infer<typeof ExpenseAPIResponseSchema>;
