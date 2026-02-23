import { createContext, useContext } from "react";
import type { ActionDispatch } from "react";
import type { EnvelopeState } from "../models/envelopes.model";
import type { EnvelopeStateActions } from "../models/envelopes.model";


export const BudgetContext = createContext<{
  state: EnvelopeState;
  dispatch: ActionDispatch<[action: EnvelopeStateActions]>;
} | null>(null);

export const useBudgetContext = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgetContext must be used within BudgetProvider');
  }
  return context;
};