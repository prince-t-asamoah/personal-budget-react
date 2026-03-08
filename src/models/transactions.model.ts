

export const TransactionType = {
    INITIAL_ALLOCATION: 'initial_allocation',
    FUNDING: 'funding',
    EXPENSE: 'expense',
    TRANSFER_IN: 'transfer_in',
    TRANSFER_OUT: 'transfer_out',
    DISTRIBUTION: 'distribution',
    ADJUSTMENT: 'adjustment'
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export type Transaction = {
    id: string;
    type: TransactionType;
    amount: number;
    currency: string;
    balanceAfter: number;
    envelopeName?: string;
    description: string;
    notes: string;
    referenceId: string;
    createdAt: string;
};

export type TransactionsState = {
    transactions: Transaction[]
    isLoading: boolean;
}

export type TransactionsActions = { type: 'SET_TRANSACTIONS', payload: Transaction[] } |
{ type: 'SET_IS_LOADING', payload: boolean }