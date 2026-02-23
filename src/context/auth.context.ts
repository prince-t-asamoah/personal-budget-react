import { createContext, useContext } from "react";
import type { ActionDispatch } from "react";
import type { AuthState, AuthStateActions } from "../models/auth.model";


export const AuthContext = createContext<{
    state: AuthState;
    dispatch: ActionDispatch<[action: AuthStateActions]>;
} | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};