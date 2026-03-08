import type { TransactionsActions, TransactionsState } from "../models/transactions.model";

export const transactionsState: TransactionsState = {
    transactions: [],
    isLoading: false
};

export const transactionsReducer = (state: TransactionsState, action: TransactionsActions): TransactionsState => {
    switch (action.type) {
        case 'SET_TRANSACTIONS': {
            return {
                ...state,
                transactions: action.payload
            };
        }
        case 'SET_IS_LOADING': {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default:
            return state;
    }
}