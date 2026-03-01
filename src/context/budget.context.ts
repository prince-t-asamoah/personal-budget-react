import { createContext, useContext } from "react";
import type { ActionDispatch } from "react";
import type { EnvelopeState } from "../models/envelopes.model";
import type { EnvelopeStateActions } from "../models/envelopes.model";


export const EnvelopesContext = createContext<{
  state: EnvelopeState;
  dispatch: ActionDispatch<[action: EnvelopeStateActions]>;
} | null>(null);

export const useEnvelopesContext = () => {
  const context = useContext(EnvelopesContext);
  if (!context) {
    throw new Error('useEnvelopesContext must be used within EnvelopesProvider');
  }
  return context;
};