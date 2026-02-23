import type { AuthState, AuthStateActions } from "../models/auth.model";

export const authState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const authReducer = (state: AuthState, action: AuthStateActions) => {
    switch (action.type) {
        case 'SET_IS_AUTHENTICATED': {
            return {
                ...state,
                isAuthenticated: action.payload
            } as AuthState
        }
        case 'SET_USER': {
            return {
                ...state,
                user: action.payload
            } as AuthState
        }
        default:
            return state;
    }
}