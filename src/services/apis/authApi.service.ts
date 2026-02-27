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