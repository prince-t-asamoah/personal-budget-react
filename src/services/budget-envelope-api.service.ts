import apiService from "./api.service";

export const fetchEnvelopes = () => apiService('/envelopes', { method: 'GET' });
