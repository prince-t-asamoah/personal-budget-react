import { type ReactNode, useReducer } from "react";
import { envelopeReducer, envelopeState } from "../store/budget-envelope.store";

import { BudgetContext } from "../context/budget.context";

type BudgetStateProviderProps = {
  children: ReactNode;
};

export default function BudgetStateProvider({ children }: BudgetStateProviderProps) {
  const [state, dispatch] = useReducer(
    envelopeReducer,
    envelopeState,
  );

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}