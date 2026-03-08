import { EnvelopeCategories } from '../models/envelopes.model';

export const envelopeCategoriesOptions = [
    { name: 'Groceries 🛒', value: EnvelopeCategories.GROCERIES },
    { name: 'Rent/Housing 🏠', value: EnvelopeCategories.RENT_HOUSING },
    { name: 'Utilities 💡', value: EnvelopeCategories.UTILITIES },
    { name: 'Transportation 🚗', value: EnvelopeCategories.TRANSPORTATION },
    { name: 'Dining Out 🍽️', value: EnvelopeCategories.DINING_OUT },
    { name: 'Entertainment 🎬', value: EnvelopeCategories.ENTERTAINMENT },
    { name: 'Healthcare 💊', value: EnvelopeCategories.HEALTHCARE },
    { name: 'Personal Care 💇', value: EnvelopeCategories.PERSONAL_CARE },
    { name: 'Savings 💰', value: EnvelopeCategories.SAVINGS },
    { name: 'Emergency Fund 🆘', value: EnvelopeCategories.EMERGENCY_FUND }
];