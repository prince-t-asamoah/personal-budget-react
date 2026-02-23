import type { AuthState, AuthStateActions } from "../models/auth.model";

export const authState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const authReducer = (state: AuthState, actions: AuthStateActions) => {
    switch (actions.type) {
        default:
            return state;
    }
}