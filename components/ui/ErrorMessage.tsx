import { FC, ReactNode } from "react";

export const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">
      {children}
    </div>
  );
};
