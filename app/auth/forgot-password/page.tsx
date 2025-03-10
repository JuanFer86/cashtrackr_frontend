import ForgotPasswordForm from "@/components/auth/ForgoPasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Forgot my password",
  description: "CashTrackr - Forgot my password",
  keywords: "Next.js, TypeScript, Tailwind CSS, CashTrackr, Register",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        ¿Forgot your Password?
      </h1>
      <p className="test-3xl font-bold">
        Here you can <span className="text-amber-500">recovery</span>
      </p>

      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/register" className="text-center text-gray-500">
          {"Don't you have an account? Register"}
        </Link>
        <Link href="/auth/login" className="text-center text-gray-500">
          already you have an account?
        </Link>
      </nav>
    </>
  );
}
