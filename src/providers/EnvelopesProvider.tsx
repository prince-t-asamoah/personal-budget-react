import { type ReactNode } from "react";
import { envelopesReducer, envelopesState } from "../store/envelopes.store";

import { EnvelopesContext } from "../context/envelopes.context";
import usePersistentReducer from "../hooks/usePersistentReducer";
import {
  type EnvelopeState,
  type EnvelopeStateActions,
} from "../models/envelopes.model";

type EnvelopesProviderProps = {
  children: ReactNode;
};

export default function EnvelopesProvider({
  children,
}: EnvelopesProviderProps) {
  const [state, dispatch] = usePersistentReducer<
    EnvelopeState,
    EnvelopeStateActions
  >({
    key: "envelopes",
    reducer: envelopesReducer,
    initialState: envelopesState,
  });

  return (
    <EnvelopesContext.Provider value={{ state, dispatch }}>
      {children}
    </EnvelopesContext.Provider>
  );
}
