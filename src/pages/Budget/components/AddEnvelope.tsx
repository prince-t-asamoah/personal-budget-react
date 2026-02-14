import { useState } from "react";
import { Plus } from "lucide-react";
import { useBudgetContext } from "../../../context/budget.context";
import type { BudgetEnvelope } from "../../../models/budget-envelope.model";
import { createEnvelope } from "../../../services/budget-envelope-api.service";

export default function AddEnvelope() {
  const { dispatch } = useBudgetContext();

  const [newEnvelope, setNewEnvelope] = useState({
    name: "",
    allocatedAmount: 0,
    currency: "GHS",
    spentAmount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createNewEnvelope = () => {
    setIsSubmitting(true);
    createEnvelope(newEnvelope)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((response: BudgetEnvelope) => {
        if (!response) {
          throw Error("Invalid response from server.");
        }
        dispatch({ type: "ADD_ENVELOPES", payload: response });
        closeModal();
      })
      .catch((error) => console.log("Error creating a new envelope: ", error))
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const closeModal = () =>
    dispatch({ type: "SET_NEW_ENVELOPE_MODAL", payload: false });

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Envelope</h3>
        <div className="form-group">
          <label htmlFor="envelope-name">Envelope Name</label>
          <input
            id="envelope-name"
            type="text"
            value={newEnvelope.name}
            onChange={(e) =>
              setNewEnvelope({ ...newEnvelope, name: e.target.value })
            }
            placeholder="e.g., Groceries, Rent, Entertainment"
          />
        </div>
        <div className="form-group">
          <label htmlFor="envelope-amount">Allocated Amount</label>
          <input
            id="envelope-amount"
            type="number"
            value={newEnvelope.allocatedAmount}
            onChange={(e) =>
              setNewEnvelope({
                ...newEnvelope,
                allocatedAmount: Number(e.target.value),
              })
            }
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="envelope-currency">Currency</label>
          <select
            id="envelope-currency"
            value={newEnvelope.currency}
            onChange={(e) =>
              setNewEnvelope({ ...newEnvelope, currency: e.target.value })
            }
          >
            <option value="GHS">GHS (Ghanaian Cedi)</option>
            <option value="USD">USD (US Dollar)</option>
            <option value="EUR">EUR (Euro)</option>
            <option value="GBP">GBP (British Pound)</option>
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={closeModal}>Cancel</button>
          <button
            className="btn-primary"
            onClick={createNewEnvelope}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner small"></span>
                Creating...
              </>
            ) : (
              <>
                <Plus size={20} />
                Create Envelope
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
