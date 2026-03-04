import { useState } from "react";
import { Plus } from "lucide-react";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import type {
  AddEnvelopeFormData,
  Envelope,
} from "../../../models/envelopes.model";
import { createEnvelope } from "../../../services/apis/envelopesApi.service";
import useNotification from "../../../hooks/useNotification";
import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";

const ADD_ENVELOPE_NOTIFICATION_TITLE = "Create Envelope";

export default function AddEnvelope() {
  const { register, handleSubmit } = useForm<AddEnvelopeFormData>();
  const { state, dispatch } = useEnvelopesContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notification = useNotification();

  const createNewEnvelope = () => {};

  const closeModal = () =>
    dispatch({ type: "SET_NEW_ENVELOPE_MODAL", payload: false });

  const onSubmit: SubmitHandler<AddEnvelopeFormData> = (data) => {
    setIsSubmitting(true);
    createEnvelope({ ...data, spentAmount: 0 })
      .then(async (response) => {
        if (!response.ok) {
          throw Error(await response.json());
        }
        return await response.json();
      })
      .then((response: SuccessApiResponse<Envelope>) => {
        if (!response.data) {
          throw Error("Invalid response from server.");
        }
        notification.success({
          title: ADD_ENVELOPE_NOTIFICATION_TITLE,
          message: "New envelope created successfully",
        });
        dispatch({ type: "SET_ENVELOPES", payload: [...state.envelopes, response?.data] });
        closeModal();
      })
      .catch((error: unknown) => {
        console.error("Error creating a new envelope: ", error);
        notification.error({
          title: ADD_ENVELOPE_NOTIFICATION_TITLE,
          message:
            (error as ErrorApiResponse).message ||
            "New envelope creation failed",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Create New Envelope</h3>
            <div className="form-group">
              <label htmlFor="envelope-name">Envelope Name</label>
              <input
                {...register("name")}
                id="envelope-name"
                type="text"
                placeholder="e.g., Groceries, Rent, Entertainment"
              />
            </div>
            <div className="form-group">
              <label htmlFor="allocatedAmount">Allocated Amount</label>
              <input
                {...register("allocatedAmount")}
                id="allocatedAmount"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="envelopeCurrency">Currency</label>
              <select id="envelopeCurrency" {...register("currency")}>
                <option value="GHS">GHS (Ghanaian Cedi)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (British Pound)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="envelopeNotes">
                Notes (Optional)
              </label>
              <textarea
                className="form-input"
                id="envelopeNotes"
                placeholder="Add any notes about this envelope"
                disabled={true}
              />
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
          </form>
        </div>
      </div>
    </div>
  );
}
