import { type ReactNode } from "react";

import AuthProvider from "./AuthProvider";
import BudgetStateProvider from "./EnvelopesProvider";

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: Readonly<AppProviderProps>) {
  return (
    <AuthProvider>
      <BudgetStateProvider>{children}</BudgetStateProvider>
    </AuthProvider>
  );
}
