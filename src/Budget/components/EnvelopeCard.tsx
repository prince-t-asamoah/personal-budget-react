import { Edit2, MinusCircle, Trash2, Check, X } from "lucide-react";
import {
  formatCurrency,
  getProgressColor,
  getProgressPercentage,
} from "../../utils/ui.utils";
import type { BudgetEnvelope } from "../../models/budget-envelope.model";
import { useReducer, useState } from "react";
import {
  budgetReducer,
  initialStateBudgetEnvelope,
} from "../../store/budget-envelope.store";

interface EnvelopeCardProps {
  envelope: BudgetEnvelope;
}

export default function EnvelopeCard({
  envelope,
}: Readonly<EnvelopeCardProps>) {
  const [state] = useReducer(budgetReducer, initialStateBudgetEnvelope);
  const [isEditingAllocation, setIsEditingAllocation] = useState(false);
  const [isEditingSpending, setIsEditingSpending] = useState(false);
  const progressPercentage = getProgressPercentage(
    envelope.spentAmount,
    envelope.allocatedAmount,
  );
  const progressColor = getProgressColor(progressPercentage);

  const editAllocation = () => setIsEditingAllocation(true);
  const cancelEditAllocation = () => setIsEditingAllocation(false);
  const editSpending = () => setIsEditingSpending(true);
  const cancelEditSpeding = () => setIsEditingSpending(false);

  return (
    <div className="envelope-card">
      <div className="envelope-header">
        <div className="envelope-title">{envelope.name}</div>
        <div className="envelope-actions">
          {!(isEditingAllocation || isEditingSpending) && (
            <>
              <button
                className="btn-icon btn-success"
                aria-label="Edit allocation"
                title="Edit allocation"
                onClick={editAllocation}
              >
                <Edit2 size={16} />
              </button>
              <button
                className="btn-icon"
                aria-label="Record spending"
                title="Record spending"
                onClick={editSpending}
                style={{
                  background: "var(--gold)",
                  color: "white",
                }}
              >
                <MinusCircle size={16} />
              </button>
              <button
                className="btn-icon btn-danger"
                aria-label="Delete envelope"
                title="Delete envelope"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {isEditingAllocation && (
        <div className="envelope-edit">
          <input
            type="number"
            placeholder="New allocation"
            step="0.01"
            min="0"
            aria-label="New allocation amount"
          />
          <button className="btn-icon btn-success" aria-label="Save changes">
            <Check size={16} />
          </button>
          <button
            className="btn-icon"
            aria-label="Cancel editing"
            onClick={cancelEditAllocation}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {isEditingSpending && (
        <div className="envelope-spend">
          <input
            type="number"
            placeholder="Amount to spend"
            step="0.01"
            min="0.01"
            max={envelope.balance}
            aria-label="Spending amount"
          />
          <button
            className="btn-icon btn-success"
            aria-label="Confirm spending"
          >
            <Check size={16} />
          </button>
          <button
            className="btn-icon"
            aria-label="Cancel spending"
            onClick={cancelEditSpeding}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {!(isEditingAllocation || isEditingSpending) && (
        <div className="envelope-amounts">
          <div className="amount-row">
            <span className="amount-label">Allocated</span>
            <span className="amount-value">
              {formatCurrency(envelope.allocatedAmount, envelope.currency)}
            </span>
          </div>
          <div className="amount-row">
            <span className="amount-label">Spent</span>
            <span className="amount-value spent">
              {formatCurrency(envelope.spentAmount, envelope.currency)}
            </span>
          </div>
          <div className="amount-row">
            <span className="amount-label">Balance</span>
            <span className="amount-value balance">
              {formatCurrency(envelope.balance, envelope.currency)}
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progressPercentage}%`,
                background: progressColor,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
