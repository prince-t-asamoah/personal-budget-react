import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { useBudgetContext } from "../../../context/budget.context";
import { distributeFunds, fetchEnvelopes } from "../../../services/budget-envelope-api.service";
import { formatCurrency } from "../../../utils/ui.utils";

export default function DistributeFunds() {
  const { state, dispatch } = useBudgetContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [distributionAmount, setDistributionAmount] = useState(0);
  const [selectedEnvelopes, setSelectedEnvelopes] = useState<{
    [key: string]: boolean;
  }>({});

  const closeModal = () => {
    dispatch({ type: "SET_IS_DISTRIBUTING_FUNDS", payload: false });
    setSelectedEnvelopes({});
    setDistributionAmount(0);
  };

  const distributeAmount = () => {
    setIsSubmitting(true);

    distributeFunds({
      amount: distributionAmount,
      envelopesId: Object.keys(selectedEnvelopes),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const getEnvelopesResponse = await fetchEnvelopes();
        if (!getEnvelopesResponse.ok) {
          throw new Error(getEnvelopesResponse.statusText);
        }
        const updatedEnvelopes = await getEnvelopesResponse.json();
        dispatch({ type: "ADD_ENVELOPES", payload: updatedEnvelopes });
        closeModal();
      })
      .catch((error) => console.log(error.message))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Distribute Funds</h3>
        <div className="form-group">
          <label htmlFor="distribution-amount">Amount to Distribute</label>
          <input
            id="distribution-amount"
            type="number"
            value={distributionAmount}
            onChange={(e) => setDistributionAmount(Number(e.target.value))}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Select Envelopes</label>
          <div className="checkbox-list">
            {state.envelopes.map((envelope) => (
              <label key={envelope.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedEnvelopes[envelope.id] || false}
                  onChange={(e) =>
                    setSelectedEnvelopes({
                      ...selectedEnvelopes,
                      [envelope.id]: e.target.checked,
                    })
                  }
                />
                <span className="checkbox-label">{envelope.name}</span>
                <span className="checkbox-amount">
                  {formatCurrency(envelope.balance, envelope.currency)}
                </span>
              </label>
            ))}
          </div>
        </div>
        {distributionAmount &&
          Object.values(selectedEnvelopes).filter(Boolean).length > 0 && (
            <p
              style={{
                marginTop: "1rem",
                color: "var(--sage)",
                fontWeight: 600,
              }}
            >
              Each envelope will receive:{" "}
              {formatCurrency(
                distributionAmount /
                  Object.values(selectedEnvelopes).filter(Boolean).length,
              )}
            </p>
          )}
        <div className="modal-actions">
          <button onClick={closeModal} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={distributeAmount}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner small"></span>
                Distributing...
              </>
            ) : (
              <>
                <TrendingUp size={20} />
                Distribute
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
