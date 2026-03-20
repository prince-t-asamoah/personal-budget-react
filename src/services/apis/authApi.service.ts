import type { LoginFormData, SignupFormData } from "../../models/auth.model";
import httpClientService from "../httpClient.service";

const BASE_ROUTES = '/auth';

export const loginUser = (data: LoginFormData) => httpClientService(`${BASE_ROUTES}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
});

export const logoutUser = () => httpClientService(`${BASE_ROUTES}/logout`, {
    method: 'POST',
    credentials: 'include'
});

export const signupUser = (data: SignupFormData) => httpClientService(`${BASE_ROUTES}/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
})

export const verifyEmail = (token: string) => httpClientService(`${BASE_ROUTES}/verify-email?token=${token}`, {
    method: 'GET',
    credentials: 'include'
});


export const getAuthenticatedUser = () => httpClientService(`${BASE_ROUTES}/me`, {
    method: 'GET',
    credentials: 'include'
});

export const forgotPassword = (email: string) => httpClientService(`${BASE_ROUTES}/forgot-password`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
});

export const googleAuth = () => {
    globalThis.location.href = `${import.meta.env.VITE_API_BASE_URL}${BASE_ROUTES}/google`
};