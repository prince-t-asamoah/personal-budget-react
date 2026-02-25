import { type ReactNode } from "react";
import { AuthContext } from "../context/auth.context";
import { authReducer, authState } from "../store/auth.store";
import type { AuthState, AuthStateActions } from "../models/auth.model";
import usePersistentReducer from "../hooks/usePersistentReducer";

type AuthProviderProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProviderProps) {
  
const [state, dispatch] = usePersistentReducer<AuthState, AuthStateActions>({
  key: 'auth',
  reducer: authReducer,
  initialState: authState
})
;
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
