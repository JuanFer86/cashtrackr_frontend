import { FC, ReactNode } from "react";

export const SuccessMessage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="text-center my-4 bg-green-300 text-white font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
};
