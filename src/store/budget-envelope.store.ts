import type { BudgetEnvelopeActions, BudgetEnvelopeInitialState } from "../models/budget-envelope.model";

export const initialStateBudgetEnvelope: BudgetEnvelopeInitialState = {
    envelopes: [],
    totalAllocated: 0,
    totalSpent: 0,
    totalBalance: 0,
    isAddingEnvelope: false,
    isDistributing: false,
    isTransferring: false,
    loading: false,
    editingId: "",
    spendingFromId: "",
    pendingFromId: ""
};

export const budgetReducer = (state: BudgetEnvelopeInitialState, action: BudgetEnvelopeActions) => {
    switch (action.type) {
        case 'ADD': {
            if (action.payload instanceof Array) {
                return {
                    ...state,
                    envelopes: action.payload
                }
            } else {
                return {
                    ...state,
                    envelopes: [
                        ...state.envelopes,
                        action.payload
                    ]
                }
            }
        }
        case 'SET_NEW_ENVELOPE_MODAL': {
            console.log('set new envelope', action.payload)
            return {
                ...state,
                isAddingEnvelope: action.payload
            }
        }
        default:
            return state;
    }
}