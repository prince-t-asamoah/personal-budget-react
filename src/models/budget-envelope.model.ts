export interface BudgetEnvelope {
  id: string;
  name: string;
  currency: string;
  allocatedAmount: number;
  spentAmount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetEnvelopeInitialState {
  envelopes: BudgetEnvelope[],
  totalAllocated: number,
  totalSpent: number,
  totalBalance: number,
  isAddingEnvelope: boolean,
  isDistributing: boolean,
  isTransferringFunds: boolean,
  loading: boolean,
  editingId: string,
  spendingFromId: string,
  pendingFromId: string
}

export type BudgetEnvelopeActions = { type: 'ADD_ENVELOPES', payload: BudgetEnvelope | BudgetEnvelope[] } | { type: 'SET_NEW_ENVELOPE_MODAL', payload: boolean } | { type: 'SET_IS_TRANSFERING_FUNDS', payload: boolean };