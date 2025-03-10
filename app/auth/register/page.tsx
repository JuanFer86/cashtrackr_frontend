import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Register",
  description: "CashTrackr - Register for a new account",
  keywords: "Next.js, TypeScript, Tailwind CSS, CashTrackr, Register",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Create an Account</h1>
      <p className="test-3xl font-bold">
        and control your <span className="text-amber-500">finance</span>
      </p>

      <RegisterForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/login" className="text-center text-gray-500">
          already you have an account?
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          Did you forget your password? Recovery
        </Link>
      </nav>
    </>
  );
}
