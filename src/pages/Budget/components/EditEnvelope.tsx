import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  EditEnvelopeFormData,
  Envelope,
} from "../../../models/envelopes.model";
import { updateEnvelopeFunds } from "../../../services/apis/envelopesApi.service";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";
import useNotification from "../../../hooks/useNotification";
import { FORM_CURRENCY_DATA } from "../../../constants/ui.constants";
import Input from "../../../components/Forms/Input";
import Select from "../../../components/Forms/Select";
import Textarea from "../../../components/Forms/Textarea";

const EDIT_ENVELOPE_NOTIFICATION_TITLE = "Edit Envelope";

type EditEnvelopeProps = {
  envelope: Envelope;
  closeModal: () => void;
};

export default function EditEnvelope({
  envelope,
  closeModal,
}: Readonly<EditEnvelopeProps>) {
  const { state, dispatch } = useEnvelopesContext();
  const notification = useNotification();
  const [issSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditEnvelopeFormData>({
    defaultValues: {
      name: envelope.name,
      allocatedAmount: envelope.allocatedAmount,
      spentAmount: envelope.spentAmount,
      currency: envelope.currency,
      balance: envelope.allocatedAmount - envelope.spentAmount || 0.0,
    },
  });

  const onSubmit: SubmitHandler<EditEnvelopeFormData> = (data) => {
    setIsSubmitting(true);
    updateEnvelopeFunds(envelope.id, data)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.json());
        }
        return await response.json();
      })
      .then((response: SuccessApiResponse<Envelope>) => {
        if (!response.data) {
          throw new Error("Response data is invalid.");
        }

        const updatedEnvelopeIndex = state.envelopes.findIndex(
          (envelope) => envelope.id === response.data?.id,
        );
        if (updatedEnvelopeIndex === -1) {
          throw new Error(`Envelope with id: ${response.data?.id} not found.`);
        }

        state.envelopes[updatedEnvelopeIndex] = {
          ...state.envelopes[updatedEnvelopeIndex],
          ...response.data,
        };
        dispatch({
          type: "SET_ENVELOPES",
          payload: [...state.envelopes],
        });

        notification.success({
          title: EDIT_ENVELOPE_NOTIFICATION_TITLE,
          message: "Evelope updated successfully",
        });
        closeModal();
      })
      .catch((error: unknown) => {
        console.log(error);
        console.error("Error updating envelope: ", error);
        notification.error({
          title: EDIT_ENVELOPE_NOTIFICATION_TITLE,
          message:
            (error as ErrorApiResponse).message || "Updating envelope failed",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    console.log(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* <!-- Modal Header --> */}
        <div className="modal-header">
          <h3 className="modal-title">Edit Envelope</h3>
          <button className="modal-close">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <!-- Envelope Name --> */}
            <Input
              {...register("name", {
                required: "Envelope name is required",
              })}
              id="envelopeName"
              label="Envelope Name *"
              placeholder="e.g., Groceries, Rent, Entertainment"
              disabled={issSubmitting}
              error={errors.name?.message}
            />
            
            {/* <!-- Alloacated Amount --> */}
            <Input
              {...register("allocatedAmount", {
                required: "Allocated amount is required",
              })}
              type="number"
              id="allocatedAmount"
              label="Allocated Amount *"
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={issSubmitting}
              error={errors.allocatedAmount?.message}
            />

            {/* Spent Amount */}
            <Input
              {...register("spentAmount")}
              type="number"
              id="spentAmount"
              label="Spent Amount"
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={true}
            />

            {/* <!-- Currency --> */}
            <Select
              {...register("currency", {
                required: "Currency must be selected",
              })}
              id="envelopeCurrency"
              label="Currency"
              options={FORM_CURRENCY_DATA}
              disabled={issSubmitting}
              error={errors.currency?.message}
            />

            {/* <!-- Notes --> */}
            <Textarea
              id="envelopeNotes"
              label="Notes (Optional)"
              placeholder="Add any notes about this envelope"
              rows={5}
              disabled={true}
            />

            {/* Current Balance */}
            <Input
              {...register("balance")}
              id="envelopeBalance"
              label="Spent Amount"
              placeholder="0.00"
              step="0.01"
              min="0"
              disabled={true}
              readOnly
            />

            {/* <!-- Modal Footer --> */}
            <div className="modal-actions">
              <button
                className="btn"
                onClick={closeModal}
                disabled={issSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={issSubmitting}
              >
                {issSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
