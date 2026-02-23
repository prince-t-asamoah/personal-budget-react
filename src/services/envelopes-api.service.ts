import type { Envelope } from "../models/envelopes.model";
import httpClientService from "./httpClient.service";

const BASE_ROUTE = '/envelopes';

export const fetchEnvelopes = () => httpClientService(BASE_ROUTE, { method: 'GET' });

export const createEnvelope = (envelope: Pick<Envelope, 'name' | 'allocatedAmount' | 'currency' | 'spentAmount'>) => httpClientService(BASE_ROUTE, {
    method: 'POST', body: JSON.stringify(envelope), headers: {
        'Content-Type': 'application/json'
    }
});

export const transferEnvelopeFunds = ({ fromId, toId, amount }: { fromId: string, toId: string, amount: number }) => httpClientService(`${BASE_ROUTE}/transfer/${fromId}/${toId}`, {
    method: 'POST', body: JSON.stringify({ amount }), headers: {
        'Content-Type': 'application/json'
    }
});

export const updateEnvelopeFunds = (id: string, data: Partial<Envelope>) => httpClientService(`${BASE_ROUTE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data), headers: {
        'Content-Type': 'application/json'
    }
});

export const deleteEnvelope = (id: string) => httpClientService(`${BASE_ROUTE}/${id}`, {
    method: 'DELETE',
});

export const distributeFunds = (data: { amount: number, envelopesId: string[] }) => httpClientService(`${BASE_ROUTE}/distribute`, {
    method: 'POST',
    body: JSON.stringify(data), headers: {
        'Content-Type': 'application/json'
    }
})