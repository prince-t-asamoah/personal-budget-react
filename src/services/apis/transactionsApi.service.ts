import httpClientService from "../httpClient.service";

const BASE_ROUTE = "/transactions";

const transactionsAPiService = (url: string, options: RequestInit) =>
    httpClientService(`${BASE_ROUTE}${url}`, { ...options, credentials: "include" });

export const getEnvelopeTransactions = (id: string) => transactionsAPiService(`/${id}`, { method: 'GET' });

export const getAllTransactions = () => transactionsAPiService('/', { method: 'GET' });
