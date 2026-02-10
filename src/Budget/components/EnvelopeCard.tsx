import { useRef, useState } from "react";
import { Edit2, MinusCircle, Trash2, Check, X } from "lucide-react";
import {
  formatCurrency,
  getProgressColor,
  getProgressPercentage,
} from "../../utils/ui.utils";
import type { BudgetEnvelope } from "../../models/budget-envelope.model";
import { updateEnvelopeFunds } from "../../services/budget-envelope-api.service";
import { useBudgetContext } from "../../context/budget.context";

interface EnvelopeCardProps {
  envelope: BudgetEnvelope;
}

export default function EnvelopeCard({
  envelope,
}: Readonly<EnvelopeCardProps>) {
  const { state, dispatch } = useBudgetContext();
  const [isEditingAllocation, setIsEditingAllocation] = useState(false);
  const [isEditingSpending, setIsEditingSpending] = useState(false);
  const editAllocationInputRef = useRef<HTMLInputElement | null>(null);
  const editSpendingInputRef = useRef<HTMLInputElement | null>(null);

  const progressPercentage = getProgressPercentage(
    envelope.spentAmount,
    envelope.allocatedAmount,
  );
  const progressColor = getProgressColor(progressPercentage);

  const editAllocation = () => setIsEditingAllocation(true);
  const resetEditAllocation = () => {
    setIsEditingAllocation(false);
    if (editAllocationInputRef.current) {
      editAllocationInputRef.current.value = "";
    }
  };
  const editSpending = () => setIsEditingSpending(true);
  const cancelEditSpeding = () => setIsEditingSpending(false);

  const resetEditState = () => {
    setIsEditingAllocation(false);
    setIsEditingSpending(false);
    if (editAllocationInputRef.current) {
      editAllocationInputRef.current.value = "";
    }
    if (editSpendingInputRef.current) {
      editSpendingInputRef.current.value = "";
    }
  };

  const updateEnvelopeById = (data: Partial<BudgetEnvelope>) => {
    updateEnvelopeFunds(envelope.id, data)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: BudgetEnvelope) => {
        if (!data) {
          throw new Error("Response data is invalid.");
        }
        const updatedEnvelopeIndex = state.envelopes.findIndex(
          (envelope) => envelope.id === data.id,
        );
        if (updatedEnvelopeIndex === -1) {
          throw new Error(`Envelope with id: ${data.id} not found.`);
        }
        state.envelopes[updatedEnvelopeIndex] = data;
        dispatch({
          type: "ADD_ENVELOPES",
          payload: [...state.envelopes],
        });
        resetEditState();
      })
      .catch((error) => {
        console.error("Error updating envelope: ", error.message);
      });
  };

  const updateAllocation = () => {
    if (!editAllocationInputRef.current?.value) return;
    updateEnvelopeById({
      allocatedAmount: Number(editAllocationInputRef.current?.value),
    });
  };

  const updateSpending = () => {
    if (!editSpendingInputRef.current?.value) return;
    updateEnvelopeById({
      spentAmount: Number(editSpendingInputRef.current?.value),
    });
  };

  return (
    <div className="envelope-card">
      <div className="envelope-header">
        <div className="envelope-title">{envelope.name}</div>
        <div className="envelope-actions">
          {/* Actions */}
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

      {/* Edit Allocation UI*/}
      {isEditingAllocation && (
        <div className="envelope-edit">
          <input
            type="number"
            placeholder="New allocation"
            step="0.01"
            min="0"
            aria-label="New allocation amount"
            ref={editAllocationInputRef}
          />
          <button
            className="btn-icon btn-success"
            aria-label="Save changes"
            onClick={updateAllocation}
          >
            <Check size={16} />
          </button>
          <button
            className="btn-icon"
            aria-label="Cancel editing"
            onClick={resetEditAllocation}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Edit Spending UI */}
      {isEditingSpending && (
        <div className="envelope-spend">
          <input
            type="number"
            placeholder="Amount to spend"
            step="0.01"
            min="0.01"
            max={envelope.balance}
            aria-label="Spending amount"
            ref={editSpendingInputRef}
          />
          <button
            className="btn-icon btn-success"
            aria-label="Confirm spending"
            onClick={updateSpending}
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

      {/* Envelope UI */}
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
