import type { DistributeFundsFormData, Envelope } from "../../models/envelopes.model";
import httpClientService from "../httpClient.service";

const BASE_ROUTE = "/envelopes";
const BODY_HEADERS = {
    "Content-Type": "application/json",
}

const envelopesApiService = (url: string, options: RequestInit) =>
    httpClientService(`${BASE_ROUTE}${url}`, { ...options, credentials: "include" });

export const fetchEnvelopes = () => envelopesApiService('/', { method: 'GET' });

export const createEnvelope = (
    envelope: Pick<
        Envelope,
        "name" | "allocatedAmount" | "currency" | "spentAmount"
    >,
) =>
    envelopesApiService('/', {
        method: "POST",
        body: JSON.stringify(envelope),
        headers: BODY_HEADERS
    });

export const transferEnvelopeFunds = ({
    fromId,
    toId,
    amount,
}: {
    fromId: string;
    toId: string;
    amount: number;
}) =>
    envelopesApiService(`/transfer/${fromId}/${toId}`, {
        method: "POST",
        body: JSON.stringify({ amount }),
        headers: BODY_HEADERS
    });

export const updateEnvelopeFunds = (id: string, data: Partial<Envelope>) =>
    envelopesApiService(`/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: BODY_HEADERS
    });

export const deleteEnvelope = (id: string) =>
    envelopesApiService(`/${id}`, {
        method: "DELETE",
    });

export const distributeFunds = (data: DistributeFundsFormData) =>
    envelopesApiService('/distribute', {
        method: "POST",
        body: JSON.stringify(data),
        headers: BODY_HEADERS
    });

export const getEnvelope = (id: string) => envelopesApiService(`/${id}`, {
    method: "GET"
});
