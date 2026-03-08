import TransactionsList from "../../../components/TransactionsList/TransactionsList";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import type { Envelope } from "../../../models/envelopes.model";
import type { Transaction } from "../../../models/transactions.model";

type EnvelopesDetailsTransactionsListProps = {
  transactions: Transaction[];
  envelope: Envelope;
};

export default function EnvelopesDetailsTransactionsList({
  transactions,
  envelope,
}: EnvelopesDetailsTransactionsListProps) {
  const { dispatch } = useEnvelopesContext();

  const openAddTransactionModal = () =>
    dispatch({ type: "OPEN_TRANSACTING_MODAL", payload: envelope });

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
            Start tracking your spending by adding your first transaction to
            this envelope.
          </p>
          <button
            className="btn btn-primary empty-state-button"
            style={{ marginTop: "var(--space-4)" }}
            onClick={openAddTransactionModal}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add First Transaction
          </button>
        </div>
      ) : (
        <TransactionsList
          transactions={transactions}
          showEnvelopeName={false}
        />
      )}
    </div>
  );
}
