import { createContext, useContext } from "react";
import type { ActionDispatch } from "react";
import type { BudgetEnvelopeInitialState } from "../models/envelopes.model";
import type { BudgetEnvelopeActions } from "../models/envelopes.model";


export const BudgetContext = createContext<{
  state: BudgetEnvelopeInitialState;
  dispatch: ActionDispatch<[action: BudgetEnvelopeActions]>;
} | null>(null);

export const useBudgetContext = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgetContext must be used within BudgetProvider');
  }
  return context;
};