import type { EnvelopeStateActions, EnvelopeState } from "../models/envelopes.model";

export const envelopesState: EnvelopeState = {
    envelopes: [],
    currentEnvelope: null,
    totalAllocated: 0,
    totalSpent: 0,
    totalBalance: 0,
    isAddingEnvelope: false,
    isDistributingFunds: false,
    isTransferringFunds: false,
    isTransacting: false,
    loading: false,
};

export const envelopesReducer = (state: EnvelopeState, action: EnvelopeStateActions) => {
    switch (action.type) {
        case 'SET_ENVELOPES': {
            return {
                ...state,
                envelopes: action.payload
            } as EnvelopeState
        }
        case 'SET_CURRENT_ENVELOPE': {
            return {
                ...state,
                currentEnvelope: action.payload
            } as EnvelopeState
        }
        case 'DELETE_ENVELOPE': {
            const newEnvelopes = state.envelopes.filter(envelope => envelope.id !== action.payload);
            return {
                ...state,
                envelopes: newEnvelopes
            } as EnvelopeState
        }
        case 'SET_NEW_ENVELOPE_MODAL': {
            return {
                ...state,
                isAddingEnvelope: action.payload
            } as EnvelopeState
        }
        case 'SET_IS_TRANSFERING_FUNDS': {
            return {
                ...state,
                isTransferringFunds: action.payload
            } as EnvelopeState
        }
        case 'SET_IS_DELETING_FUNDS': {
            return {
                ...state,
                isDeletingEnvelope: action.payload
            } as EnvelopeState
        }
        case 'SET_IS_DISTRIBUTING_FUNDS': {
            return {
                ...state,
                isDistributingFunds: action.payload
            } as EnvelopeState
        }
        case 'SET_IS_TRANSACTING': {
            return {
                ...state,
                isTransacting: action.payload
            } as EnvelopeState
        }
        default:
            return state;
    }
}