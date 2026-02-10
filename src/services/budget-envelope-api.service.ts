import type { BudgetEnvelope } from "../models/budget-envelope.model";
import apiService from "./api.service";

const BASE_ROUTE = '/envelopes';

export const fetchEnvelopes = () => apiService(BASE_ROUTE, { method: 'GET' });

export const createEnvelope = (envelope: Pick<BudgetEnvelope, 'name' | 'allocatedAmount' | 'currency' | 'spentAmount'>) => apiService(BASE_ROUTE, {
    method: 'POST', body: JSON.stringify(envelope), headers: {
        'Content-Type': 'application/json'
    }
});

export const transferEnvelopeFunds = ({ fromId, toId, amount }: { fromId: string, toId: string, amount: number }) => apiService(`${BASE_ROUTE}/transfer/${fromId}/${toId}`, {
    method: 'POST', body: JSON.stringify({ amount }), headers: {
        'Content-Type': 'application/json'
    }
});

export const updateEnvelopeFunds = (id: string, data: Partial<BudgetEnvelope>) => apiService(`${BASE_ROUTE}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data), headers: {
        'Content-Type': 'application/json'
    }
})