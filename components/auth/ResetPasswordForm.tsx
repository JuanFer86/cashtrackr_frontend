import { resetPassword } from "@/actions/reset-password-action";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const resetPasswordInput = resetPassword.bind(null, token);
  const [state, dispatch] = useActionState(resetPasswordInput, {
    errors: [],
    success: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }

    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login");
        },
        onClick: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state]);

  return (
    <form className=" mt-14 space-y-5" noValidate action={dispatch}>
      <div className="flex flex-col gap-5">
        <label className="font-bold text-2xl">Password</label>

        <input
          type="password"
          placeholder="Register Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
          defaultValue={state.password}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-bold text-2xl">Repeat Password</label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repeat Register Password"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
          defaultValue={state.password_confirmation}
        />
      </div>

      <input
        type="submit"
        value="Save Password"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
}
