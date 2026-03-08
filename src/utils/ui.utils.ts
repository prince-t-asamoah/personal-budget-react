import { TransactionType } from "../models/transactions.model";

export const formatCurrency = (amount: number, currency = "GHS") => {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getProgressPercentage = (spent: number, allocated: number) => {
  if (allocated === 0) return 0;
  return Math.min((spent / allocated) * 100, 100);
};

export const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "#C76D6D";
  if (percentage >= 70) return "#D4A574";
  return "var(--sage)";
};

/**
* Formats an ISO date string into a readable date.
* Example: 2026-03-02T22:47:04.900Z → Mar 2, 2026
*/
export const formatDate = (isoString: string, locale = "en-US"): string => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}


/**
 * Formats an ISO date string into a readable time.
 * Example: 2026-03-02T22:47:04.900Z → 10:47 PM
 */
export const formatTime = (isoString: string, locale = "en-US"): string => {
  if (!isoString) return "";

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // set to false for 24hr format
  }).format(date);
}

/**
 *  Creates a transaction details such as type and name from transaction type
 */
export const getTransactionType = (type: TransactionType): { type: string, name: string } => {
  switch (type.toLowerCase()) {
    case TransactionType.EXPENSE:
      return { type: 'expense', name: 'Expense' };
    case TransactionType.FUNDING:
      return { type: 'funding', name: 'Funding' };
    case TransactionType.TRANSFER_IN:
      return { type: 'transfer', name: 'Transfer In' };
    case TransactionType.TRANSFER_OUT:
      return { type: 'transfer', name: 'Transfer Out' };
    case TransactionType.DISTRIBUTION:
      return { type: 'distribution', name: 'Distribution' };
    case TransactionType.ADJUSTMENT:
      return { type: 'adjustment', name: 'Adjustment' };
    default:
      return { type: 'transaction', name: 'Transaction' };
  }
}