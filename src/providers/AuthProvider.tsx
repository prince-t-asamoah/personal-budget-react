import { useReducer, type ReactNode } from "react";
import { AuthContext } from "../context/auth.context";
import { authReducer, authState } from "../store/auth.store";

type AuthProviderProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProviderProps) {
  const [state, dispatch] = useReducer(authReducer, authState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
