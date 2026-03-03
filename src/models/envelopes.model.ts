export interface Envelope {
  id: string;
  name: string;
  currency: string;
  allocatedAmount: number;
  spentAmount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  category?: string;
}

export interface EnvelopeState {
  envelopes: Envelope[],
  totalAllocated: number,
  totalSpent: number,
  totalBalance: number,
  isAddingEnvelope: boolean,
  isDistributingFunds: boolean,
  isTransferringFunds: boolean,
  loading: boolean,
}

export type EnvelopeStateActions = { type: 'ADD_ENVELOPES', payload: Envelope | Envelope[] } | { type: 'SET_NEW_ENVELOPE_MODAL', payload: boolean } | { type: 'SET_IS_TRANSFERING_FUNDS', payload: boolean } | { type: 'SET_IS_DELETING_FUNDS', payload: boolean } | { type: 'DELETE_ENVELOPE', payload: string } | { type: 'SET_IS_DISTRIBUTING_FUNDS', payload: boolean };

export type AddEnvelopeFormData = Omit<Envelope, 'id' | 'createdAt' | 'updatedAt'>;

export type EditEnvelopeFormData = Omit<Envelope, 'id' | 'createdAt' | 'updatedAt'>;