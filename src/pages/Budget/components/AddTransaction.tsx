import { useEnvelopesContext } from "../../../context/envelopes.context";

export function AddTransaction() {
  const { state, dispatch } = useEnvelopesContext();

  const closeModal = () => dispatch({ type: "CLOSE_TRANSACTING_MODAL" });

  return (
    <>
      {state.isTransacting && (
        <div className="modal-overlay">
          <div className="modal">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h3 className="modal-title">Add Transaction</h3>
              <button className="modal-close" onClick={closeModal}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* <!-- Modal Body --> */}
            <div className="modal-body">
              {/* <!-- Current Balance Info --> */}
              <div className="info-alert">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div className="info-alert-text">
                  Current balance in{" "}
                  <strong>{state.currentEnvelope?.name}</strong> envelope:{" "}
                  <strong>
                    {state.currentEnvelope?.currency}{" "}
                    {state.currentEnvelope?.balance}
                  </strong>
                </div>
              </div>
              <form>
                {/* <!-- Transaction Type --> */}
                <div className="form-group">
                  <label className="form-label" htmlFor="transactionType">
                    Transaction Type *
                  </label>
                  <select className="form-input" id="transactionType" required>
                    <option value="">Select transaction type</option>
                    <option value="expense" selected>
                      Expense (Spending)
                    </option>
                    <option value="income">Income (Deposit)</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                {/* <!-- Amount --> */}
                <div className="form-group">
                  <label className="form-label" htmlFor="transactionAmount">
                    Amount *
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    id="transactionAmount"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* <!-- Description --> */}
                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="transactionDescription"
                  >
                    Description *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="transactionDescription"
                    placeholder="e.g., Whole Foods Market, Monthly Salary"
                    required
                  />
                </div>

                {/* <!-- Notes --> */}
                <div className="form-group">
                  <label className="form-label" htmlFor="transactionNotes">
                    Notes (Optional)
                  </label>
                  <textarea
                    className="form-input"
                    id="transactionNotes"
                    placeholder="Add any additional notes about this transaction"
                    rows={3}
                  ></textarea>
                </div>

                {/* <!-- Modal Actions --> */}
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary">
                    Add Transaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
