"use client";

import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ConfirmAccountForm = () => {
  const router = useRouter();

  const [isComplete, setIsComplete] = useState(false);
  const [token, setToken] = useState("");
  const confirmAccountWithToken = confirmAccount.bind(null, token);
  const [state, dispatch] = useActionState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete]);

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
      });
    }
  }, [state]);

  const handleChange = (value: string) => {
    setIsComplete(false);
    setToken(value);
  };

  const handleComplete = (value: string) => {
    setIsComplete(true);
  };

  return (
    <>
      <div className="flex justify-center gap-5 my-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
          <PinInputField className="h-10 w-10 border border-gray-300 placeholder-white shadow rounded-lg text-center" />
        </PinInput>
      </div>
    </>
  );
};

export default ConfirmAccountForm;
