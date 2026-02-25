import type { LoginFormData } from "../../models/auth.model";
import httpClientService from "../httpClient.service";

const BASE_ROUTES = '/auth';

export const loginUser = (data: LoginFormData) => httpClientService(`${BASE_ROUTES}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',

    },
    credentials: 'include'
})