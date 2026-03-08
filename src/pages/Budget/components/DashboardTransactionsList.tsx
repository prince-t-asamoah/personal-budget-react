import TransactionsList from "../../../components/TransactionsList/TransactionsList";
import type { Transaction } from "../../../models/transactions.model";

type DashboardTransactionsListProps = {
  transactions: Transaction[];
};

export default function DashboardTransactionsList({
  transactions,
}: DashboardTransactionsListProps) {
  return (
    <div className="transactions">
      {transactions.length === 0 ? (
        <div className="empty-state">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            className="empty-state-icon"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <h3 className="empty-state-title">No Transactions Yet</h3>
          <p className="empty-state-description">
            Start tracking your spending by adding envelopes
          </p>
        </div>
      ) : (
        <div className="transactions-list">
          <div className="header">
            <h3 className="subtitle">Latest Transactions</h3>
          </div>
          <TransactionsList transactions={transactions} />
        </div>
      )}
    </div>
  );
}
