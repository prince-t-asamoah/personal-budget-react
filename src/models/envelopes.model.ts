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
  envelopes: Envelope[];
  currentEnvelope: Envelope | null;
  totalAllocated: number;
  totalSpent: number;
  totalBalance: number;
  isAddingEnvelope: boolean;
  isDistributingFunds: boolean;
  isTransferringFunds: boolean;
  isTransacting: boolean;
  loading: boolean;

}

export type EnvelopeStateActions = { type: 'SET_ENVELOPES', payload: Envelope | Envelope[] } |
{ type: 'UPDATE_ALL_ENVELOPES', payload: Envelope | Envelope[] } |
{ type: 'SET_NEW_ENVELOPE_MODAL', payload: boolean } |
{ type: 'SET_IS_TRANSFERING_FUNDS', payload: boolean } |
{ type: 'SET_IS_DELETING_FUNDS', payload: boolean } |
{ type: 'DELETE_ENVELOPE', payload: string } |
{ type: 'SET_IS_DISTRIBUTING_FUNDS', payload: boolean } |
{ type: 'SET_CURRENT_ENVELOPE', payload: Envelope | null } |
{ type: 'SET_IS_TRANSACTING', payload: boolean } |
{ type: 'OPEN_TRANSACTING_MODAL', payload: Envelope | null } |
{ type: 'CLOSE_TRANSACTING_MODAL' }

export type AddEnvelopeFormData = Omit<Envelope, 'id' | 'createdAt' | 'updatedAt'>;

export type EditEnvelopeFormData = Omit<Envelope, 'id' | 'createdAt' | 'updatedAt'>;

export type DistributeFundsFormData = {
  amount: number;
  envelopesId: string[];
}

export type TransferFundsFormData = {
  toId: string;
  fromId: string;
  amount: number;
};