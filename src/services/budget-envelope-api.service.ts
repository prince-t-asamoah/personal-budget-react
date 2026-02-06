import type { BudgetEnvelope } from "../models/budget-envelope.model";
import apiService from "./api.service";

export const fetchEnvelopes = () => apiService('/envelopes', { method: 'GET' });

export const createEnvelope = (envelope: Pick<BudgetEnvelope, 'name' | 'allocatedAmount' | 'currency' | 'spentAmount'>) => apiService('/envelopes', {
    method: 'POST', body: JSON.stringify(envelope), headers: {
        'Content-Type': 'application/json'
    }
})