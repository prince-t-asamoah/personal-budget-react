import { type ReactNode } from "react";
import { envelopesReducer, envelopesState } from "../store/envelopes.store";

import { BudgetContext } from "../context/budget.context";
import usePersistentReducer from "../hooks/usePersistentReducer";
import {
  type EnvelopeState,
  type EnvelopeStateActions,
} from "../models/envelopes.model";

type BudgetStateProviderProps = {
  children: ReactNode;
};

export default function BudgetStateProvider({
  children,
}: BudgetStateProviderProps) {
  const [state, dispatch] = usePersistentReducer<
    EnvelopeState,
    EnvelopeStateActions
  >({
    key: "envelopes",
    reducer: envelopesReducer,
    initialState: envelopesState,
  });

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
}
