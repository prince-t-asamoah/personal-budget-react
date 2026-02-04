const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function apiService(url: string, options: RequestInit) {
    return fetch(`${API_BASE_URL}${url}`, options);
}