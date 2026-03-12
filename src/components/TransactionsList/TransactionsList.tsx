import "./TransactionsList.css";
import {
  TransactionType,
  type Transaction,
} from "../../models/transactions.model";
import {
  formatDate,
  formatTime,
  getTransactionType,
} from "../../utils/ui.utils";

type TransactionListProps = {
  transactions: Transaction[];
  showEnvelopeName?: boolean;
};

export default function TransactionsList({
  transactions,
  showEnvelopeName = true,
}: Readonly<TransactionListProps>) {
  
  const getAmountStyle = (transactionStatus: TransactionType): string => {
    switch (transactionStatus.valueOf()) {
      case TransactionType.FUNDING:
      case TransactionType.TRANSFER_IN:
      case TransactionType.DISTRIBUTION:
      case TransactionType.INITIAL_ALLOCATION:
        return "positive";
      case TransactionType.EXPENSE:
      case TransactionType.TRANSFER_OUT:
        return "negative";
      default:
        return "";
    }
  };

  const getAmmountSign = (transactionStatus: TransactionType): string => {
    switch (transactionStatus.valueOf()) {
      case TransactionType.FUNDING:
      case TransactionType.TRANSFER_IN:
      case TransactionType.DISTRIBUTION:
      case TransactionType.INITIAL_ALLOCATION:
        return "+";
      case TransactionType.EXPENSE:
      case TransactionType.TRANSFER_OUT:
        return "-";
      default:
        return "";
    }
  };

  return (
    <div className="transaction-table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            {showEnvelopeName && <th>Envelope Name</th>}
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const transactionInfo = getTransactionType(transaction.type);
            return (
              <tr key={transaction.id}>
                <td>
                  <div className="transaction-date">
                    {formatDate(transaction.createdAt)}
                  </div>
                  <span className="transaction-time">
                    {formatTime(transaction.createdAt)}
                  </span>
                </td>
                {showEnvelopeName && <td>{transaction.envelopeName}</td>}
                <td>{transaction.description}</td>
                <td>
                  <span className={`transaction-type ${transactionInfo.type}`}>
                    {transactionInfo.name}
                  </span>
                </td>
                <td
                  className={`transaction-amount ${getAmountStyle(transaction.type)}`}
                >
                  {getAmmountSign(transaction.type)} {transaction.currency}{" "}
                  {transaction.amount}
                </td>
                <td className="transaction-balance">
                  {transaction.currency} {transaction.balanceAfter}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
