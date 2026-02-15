import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useBudgetContext } from "../../../context/budget.context";
import type { BudgetEnvelope } from "../../../models/budget-envelope.model";
import { deleteEnvelope } from "../../../services/budget-envelope-api.service";

export default function DeleteEnvelope({
  envelope,
  closeModal
}: {
  envelope: BudgetEnvelope,
  closeModal: () => void;
}) {
  const { dispatch } = useBudgetContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteEnvelopeById = () => {
    setIsSubmitting(true);
    deleteEnvelope(envelope.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        dispatch({ type: "DELETE_ENVELOPE", payload: envelope.id });
        closeModal();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Envelope</h3>
        <div>
          <p>
            You're about to delete <strong>{envelope.name}</strong> envelope.
            <br />
            Click cancel to stop and confirm to delete.
          </p>
        </div>
        <div className="modal-actions">
          <button onClick={closeModal}>Cancel</button>
          <button
            className="btn-danger"
            onClick={deleteEnvelopeById}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner small"></span>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={20} />
                Confirm
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
