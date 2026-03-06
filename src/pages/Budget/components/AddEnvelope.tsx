import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import type {
  AddEnvelopeFormData,
  Envelope,
} from "../../../models/envelopes.model";
import { createEnvelope } from "../../../services/apis/envelopesApi.service";
import useNotification from "../../../hooks/useNotification";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";
import Input from "../../../components/Forms/Input";
import Select from "../../../components/Forms/Select";
import Textarea from "../../../components/Forms/Textarea";
import { FORM_CURRENCY_DATA } from "../../../constants/ui.constants";
import { validatePositiveAmount } from "../../../utils/validation.utils";

const ADD_ENVELOPE_NOTIFICATION_TITLE = "Create Envelope";

export default function AddEnvelope() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddEnvelopeFormData>();
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
        dispatch({
          type: "SET_ENVELOPES",
          payload: [...state.envelopes, response?.data],
        });
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
            <Input
              id="name"
              label="Name"
              placeholder="e.g., Groceries, Rent, Entertainment"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />
            <Input
              id="allocatedAmount"
              label="Allocated amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              min="0"
              {...register("allocatedAmount", {
                required: "Allocated amount is required",
                valueAsNumber: true,
                validate: (value) =>
                  validatePositiveAmount(value, "Allocated amount"),
              })}
              error={errors.allocatedAmount?.message}
            />
            <Select
              id="envelopeCurrency"
              label="Currency"
              options={FORM_CURRENCY_DATA}
              {...register("currency", {
                required: "Currency is required",
              })}
            />
            <Textarea
              id="envelopesNotes"
              label="Notes (Optional)"
              placeholder="Add any notes about this envelope"
              disabled={true}
              {...register("notes")}
            />
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
