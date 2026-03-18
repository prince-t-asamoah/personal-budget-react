import type { AuthState, AuthStateActions } from "../models/auth.model";

export const authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    hasAuthenticationError: false
};

export const authReducer = (state: AuthState, action: AuthStateActions): AuthState => {
    switch (action.type) {
        case 'SET_IS_AUTHENTICATED': {
            return {
                ...state,
                isAuthenticated: action.payload
            }
        }
        case 'SET_USER': {
            return {
                ...state,
                user: action.payload
            }
        }
        case 'SET_IS_AUTHENTICATING': {
            return {
                ...state,
                isAuthenticating: action.payload
            }
        }
        case 'SET_HAS_AUTHENTICATED_ERROR': {
            return {
                ...state,
                hasAuthenticationError: action.payload
            }
        }
        default:
            return state;
    }
}