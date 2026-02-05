import { Plus } from "lucide-react";
import { useState } from "react";

type AddEnvelopeProps = {
  onClose: () => void;
};

export default function AddEnvelope({ onClose }: AddEnvelopeProps) {

  const [newEnvelope, setNewEnvelope] = useState({
    name: "",
    allocatedAmount: "",
    currency: "GHS",
  });

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
                allocatedAmount: e.target.value,
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
          <button onClick={onClose}>Cancel</button>
          <button className="btn-primary">
            <Plus size={20} />
            Create Envelope
          </button>
        </div>
      </div>
    </div>
  );
}
