import type { TransactionType } from "./transactions.model";

export const EnvelopeCategories = {
  GROCERIES: 'groceries',
  RENT_HOUSING: 'rent_housing',
  UTILITIES: 'utilities',
  TRANSPORTATION: 'transportation',
  DINING_OUT: 'dining_out',
  ENTERTAINMENT: 'entertainment',
  HEALTHCARE: 'healthcare',
  PERSONAL_CARE: 'personal_care',
  SAVINGS: 'savings',
  EMERGENCY_FUND: 'emergency_fund'
} as const;

export type EnvelopeCategories = typeof EnvelopeCategories[keyof typeof EnvelopeCategories];

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
  category?: EnvelopeCategories;
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
  isDeleting: boolean;
  isEditing: boolean;
  isLoading: boolean;
  hasLoadingError: boolean;
}

export type EnvelopeStateActions = 
{ type : 'SET_IS_LOADING_ENVELOPES', payload: boolean } |
{ type : 'SET_HAS_LOADING_ERROR', payload: boolean } |
{ type: 'SET_ENVELOPES', payload: Envelope | Envelope[] } |
{ type: 'UPDATE_ENVELOPE', payload: Envelope } |
{ type: 'SET_NEW_ENVELOPE_MODAL', payload: boolean } |
{ type: 'SET_IS_TRANSFERING_FUNDS', payload: boolean } |
{ type: 'SET_IS_DELETING_FUNDS', payload: boolean } |
{ type: 'DELETE_ENVELOPE', payload: string } |
{ type: 'SET_IS_DISTRIBUTING_FUNDS', payload: boolean } |
{ type: 'SET_CURRENT_ENVELOPE', payload: Envelope | null } |
{ type: 'SET_IS_TRANSACTING', payload: boolean } |
{ type: 'OPEN_TRANSACTING_MODAL', payload: Envelope | null } |
{ type: 'CLOSE_TRANSACTING_MODAL' } |
{ type: 'OPEN_DELETE_MODAL', payload: Envelope | null } |
{ type: 'CLOSE_DELETE_MODAL' } |
{ type: 'OPEN_EDITING_MODAL', payload: Envelope | null } |
{ type: 'CLOSE_EDITING_MODAL' };

// Forms Data
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


export type AddExpenseFundsFormData = {
  transactionType?: TransactionType
  amount: number;
  description: string;
  notes?: string;
}