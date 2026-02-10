import type { BudgetEnvelopeActions, BudgetEnvelopeInitialState } from "../models/budget-envelope.model";

export const initialStateBudgetEnvelope: BudgetEnvelopeInitialState = {
    envelopes: [],
    totalAllocated: 0,
    totalSpent: 0,
    totalBalance: 0,
    isAddingEnvelope: false,
    isDistributing: false,
    isTransferringFunds: false,
    loading: false,
    spendingFromId: "",
    pendingFromId: ""
};

export const budgetReducer = (state: BudgetEnvelopeInitialState, action: BudgetEnvelopeActions) => {
    switch (action.type) {
        case 'ADD_ENVELOPES': {
            if (action.payload instanceof Array) {
                return {
                    ...state,
                    envelopes: action.payload
                } as BudgetEnvelopeInitialState
            } else {
                return {
                    ...state,
                    envelopes: [
                        ...state.envelopes,
                        action.payload
                    ]
                } as BudgetEnvelopeInitialState
            }
        }
        case 'SET_NEW_ENVELOPE_MODAL': {
            return {
                ...state,
                isAddingEnvelope: action.payload
            } as BudgetEnvelopeInitialState
        }
        case 'SET_IS_TRANSFERING_FUNDS' : {
            return {
                ...state,
                isTransferringFunds: action.payload
            } as BudgetEnvelopeInitialState
        }   
        default:
            return state;
    }
}