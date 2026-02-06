import { type ReactNode, useReducer } from "react";
import { budgetReducer, initialStateBudgetEnvelope } from "../store/budget-envelope.store";

import { BudgetContext } from "../context/budget.context";

type BudgetStateProviderProps = {
  children: ReactNode;
};

export default function BudgetStateProvider({ children }: BudgetStateProviderProps) {
  const [state, dispatch] = useReducer(
    budgetReducer,
    initialStateBudgetEnvelope,
  );

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}