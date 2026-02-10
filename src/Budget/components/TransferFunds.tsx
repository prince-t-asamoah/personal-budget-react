import { ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../../utils/ui.utils";
import { useBudgetContext } from "../../context/budget.context";
import { transferEnvelopeFunds } from "../../services/budget-envelope-api.service";

export default function TransferFunds() {
  const [transferData, setTransferData] = useState<{
    fromId: string;
    toId: string;
    amount: number;
  }>({
    fromId: "",
    toId: "",
    amount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state, dispatch } = useBudgetContext();

  const closeModal = () =>
    dispatch({ type: "SET_IS_TRANSFERING_FUNDS", payload: false });
  const transferFunds = () => {
    if (!transferData.fromId || !transferData.toId || transferData.amount === 0) return;

    setIsSubmitting(true);
    transferEnvelopeFunds(transferData)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        if (!response) {
          throw new Error("Invalid response from server.");
        }
        const fromEnvelopeIndex = state.envelopes.findIndex(
          (envelope) => envelope.id === transferData.fromId,
        );
        if (fromEnvelopeIndex === -1) {
          throw new Error("Transfer from envelope does not exist.");
        }
        const toEnvelopeIndex = state.envelopes.findIndex(
          (envelope) => envelope.id === transferData.toId,
        );

        if (toEnvelopeIndex === -1) {
          throw new Error("Transfer to envelope does not exist.");
        }

        const updatedFromEnvelope = {
          ...state.envelopes[fromEnvelopeIndex],
          allocatedAmount:
            state.envelopes[fromEnvelopeIndex].allocatedAmount -
            transferData.amount,
          balance:
            (state.envelopes[fromEnvelopeIndex].allocatedAmount -
              transferData.amount) -
            state.envelopes[fromEnvelopeIndex].spentAmount,
        };

        const updatedToEnvelope = {
          ...state.envelopes[toEnvelopeIndex],
          allocatedAmount:
            state.envelopes[toEnvelopeIndex].allocatedAmount +
            transferData.amount,
          balance:
            (state.envelopes[toEnvelopeIndex].allocatedAmount +
              transferData.amount) -
            state.envelopes[toEnvelopeIndex].spentAmount,
        };

        const currentEnvelopes = state.envelopes.map((envelope, index) => {
          if (index === fromEnvelopeIndex) return updatedFromEnvelope;
          if (index === toEnvelopeIndex) return updatedToEnvelope;
          return envelope;
        });

        dispatch({ type: "SET_IS_TRANSFERING_FUNDS", payload: false });
        dispatch({ type: "ADD_ENVELOPES", payload: currentEnvelopes });
        closeModal();
      })
      .catch((error) =>
        console.error("Error transfering envelope funds: ", error),
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Transfer Funds</h3>
        <div className="form-group">
          <label htmlFor="transfer-from">From Envelope</label>
          <select
            id="transfer-from"
            value={transferData.fromId}
            onChange={(e) =>
              setTransferData((prev) => ({ ...prev, fromId: e.target.value }))
            }
          >
            {state.envelopes.length > 0 ? (
              <option value="">Select source envelope</option>
            ) : (
              <option value="">No envelopes available</option>
            )}
            {state.envelopes.map((envelope) => (
              <option key={'from-' + envelope.id} value={envelope.id}>
                {envelope.name} -{" "}
                {formatCurrency(envelope.balance, envelope.currency)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="transfer-to">To Envelope</label>
          <select
            id="transfer-to"
            value={transferData.toId}
            onChange={(e) =>
              setTransferData((prev) => ({ ...prev, toId: e.target.value }))
            }
          >
            {state.envelopes.length > 0 ? (
              <option value="">Select source envelope</option>
            ) : (
              <option value="">No envelopes available</option>
            )}
            {state.envelopes
              .filter((env) => env.id !== transferData.fromId)
              .map((envelope) => (
                <option key={'to-'+ envelope.id} value={envelope.id}>
                  {envelope.name} -{" "}
                  {formatCurrency(envelope.balance, envelope.currency)}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="transfer-amount">Amount to Transfer</label>
          <input
            id="transfer-amount"
            type="number"
            value={transferData.amount}
            onChange={(e) =>
              setTransferData({
                ...transferData,
                amount: Number(e.target.value),
              })
            }
            placeholder="0.00"
            step="0.01"
            min="0.01"
            max={
              transferData.fromId
                ? state.envelopes.find((e) => e.id === transferData.fromId)
                    ?.balance
                : undefined
            }
          />
        </div>
        {transferData.fromId && transferData.toId && transferData.amount && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "var(--cream)",
              borderRadius: "8px",
              fontSize: "0.875rem",
            }}
          >
            <p
              style={{
                marginBottom: "0.5rem",
                color: "var(--dark-sage)",
              }}
            >
              <strong>Transfer Summary:</strong>
            </p>
            <p style={{ color: "var(--charcoal)" }}>
              From:{" "}
              <strong>
                {
                  state.envelopes.find((e) => e.id === transferData.fromId)
                    ?.name
                }
              </strong>
              <br />
              To:{" "}
              <strong>
                {state.envelopes.find((e) => e.id === transferData.toId)?.name}
              </strong>
              <br />
              Amount:{" "}
              <strong style={{ color: "var(--sage)" }}>
                {formatCurrency(transferData.amount)}
              </strong>
            </p>
          </div>
        )}
        <div className="modal-actions">
          <button onClick={closeModal}>Cancel</button>
          <button className="btn-primary" onClick={transferFunds}>
            {isSubmitting ? (
              <>
                <span className="spinner small"></span>
                Tranfering...
              </>
            ) : (
              <>
                <ArrowRightLeft size={20} />
                Transfer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
