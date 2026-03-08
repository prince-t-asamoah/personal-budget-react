import "./TransactionsList.css";
import type { Transaction } from "../../models/transactions.model";
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
                <td className="transaction-amount negative">
                  -{transaction.currency} {transaction.amount}
                </td>
                <td className="transaction-balance">
                  {transaction.currency} {transaction.balanceAfter}
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <td>
              <div className="transaction-date">Mar 01, 2026</div>
              <span className="transaction-time">11:15 AM</span>
            </td>
            <td>Shoprite Groceries</td>
            <td>
              <span className="transaction-type expense">Expense</span>
            </td>
            <td className="transaction-amount negative">-₵65.00</td>
            <td className="transaction-balance">₵395.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 28, 2026</div>
              <span className="transaction-time">6:45 PM</span>
            </td>
            <td>Local Market</td>
            <td>
              <span className="transaction-type expense">Expense</span>
            </td>
            <td className="transaction-amount negative">-₵20.00</td>
            <td className="transaction-balance">₵460.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 25, 2026</div>
              <span className="transaction-time">3:00 PM</span>
            </td>
            <td>Monthly Fund Allocation</td>
            <td>
              <span className="transaction-type income">Income</span>
            </td>
            <td className="transaction-amount positive">+₵100.00</td>
            <td className="transaction-balance">₵480.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 22, 2026</div>
              <span className="transaction-time">10:30 AM</span>
            </td>
            <td>Supermarket Purchase</td>
            <td>
              <span className="transaction-type expense">Expense</span>
            </td>
            <td className="transaction-amount negative">-₵55.00</td>
            <td className="transaction-balance">₵380.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 18, 2026</div>
              <span className="transaction-time">4:20 PM</span>
            </td>
            <td>Weekend Shopping</td>
            <td>
              <span className="transaction-type expense">Expense</span>
            </td>
            <td className="transaction-amount negative">-₵85.00</td>
            <td className="transaction-balance">₵435.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 15, 2026</div>
              <span className="transaction-time">9:00 AM</span>
            </td>
            <td>Transfer from Entertainment</td>
            <td>
              <span className="transaction-type transfer">Transfer</span>
            </td>
            <td className="transaction-amount positive">+₵50.00</td>
            <td className="transaction-balance">₵520.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 10, 2026</div>
              <span className="transaction-time">1:15 PM</span>
            </td>
            <td>Fresh Produce Market</td>
            <td>
              <span className="transaction-type expense">Expense</span>
            </td>
            <td className="transaction-amount negative">-₵30.00</td>
            <td className="transaction-balance">₵470.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 05, 2026</div>
              <span className="transaction-time">5:45 PM</span>
            </td>
            <td>Monthly Restock</td>
            <td>
              <span className="transaction-type expense">Expense</span>
            </td>
            <td className="transaction-amount negative">-₵120.00</td>
            <td className="transaction-balance">₵500.00</td>
          </tr>
          <tr>
            <td>
              <div className="transaction-date">Feb 01, 2026</div>
              <span className="transaction-time">12:00 PM</span>
            </td>
            <td>Initial Allocation</td>
            <td>
              <span className="transaction-type income">Income</span>
            </td>
            <td className="transaction-amount positive">+₵500.00</td>
            <td className="transaction-balance">₵500.00</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
