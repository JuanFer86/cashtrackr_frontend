import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";

const ConfirmAccountPage = () => {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Confirm your account
      </h1>
      <p className="test-3xl font-bold">
        add the code that you received{" "}
        <span className="text-amber-500">by email</span>
      </p>

      <ConfirmAccountForm />
    </>
  );
};

export default ConfirmAccountPage;
