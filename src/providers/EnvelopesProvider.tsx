import { useReducer, type ReactNode } from "react";
import { envelopesReducer, envelopesState } from "../store/envelopes.store";

import { EnvelopesContext } from "../context/envelopes.context";

type EnvelopesProviderProps = {
  children: ReactNode;
};

export default function EnvelopesProvider({
  children,
}: EnvelopesProviderProps) {

  const [state, dispatch] = useReducer(envelopesReducer, envelopesState);

  return (
    <EnvelopesContext.Provider value={{ state, dispatch }}>
      {children}
    </EnvelopesContext.Provider>
  );
}
