import { type ReactNode, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { authReducer, authState } from "../store/auth.store";
import type { AuthState, AuthStateActions, AuthUser } from "../models/auth.model";
import usePersistentReducer from "../hooks/usePersistentReducer";
import { getAuthenticatedUser } from "../services/apis/authApi.service";
import type { ErrorApiResponse, SuccessApiResponse } from "../models/api.model";

type AuthProviderProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Readonly<AuthProviderProviderProps>) {
  const [state, dispatch] = usePersistentReducer<AuthState, AuthStateActions>({
    key: 'auth',
    reducer: authReducer,
    initialState: authState
  });

  // Verify session on app mount (runs once)
  useEffect(() => {
    dispatch({ type: "SET_IS_AUTHENTICATING", payload: true });
    dispatch({ type: "SET_HAS_AUTHENTICATED_ERROR", payload: false });

    getAuthenticatedUser()
      .then(async (response) => {
        if (!response.ok) {
          const errorData = (await response.json()) as ErrorApiResponse;
          throw new Error(errorData.message);
        }

        const successResponse =
          (await response.json()) as SuccessApiResponse<AuthUser>;

        dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
        dispatch({ type: "SET_HAS_AUTHENTICATED_ERROR", payload: false });
        dispatch({ type: "SET_IS_AUTHENTICATING", payload: false });
        dispatch({ type: "SET_USER", payload: successResponse.data ?? null });
      })
      .catch((error: unknown) => {
        dispatch({ type: "SET_HAS_AUTHENTICATED_ERROR", payload: true });
        dispatch({ type: "SET_IS_AUTHENTICATING", payload: false });
        dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });

        console.error("Session verification failed: ", error);
      });
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
