import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
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
import { validatePositiveAmount } from "../../../utils/validation.utils";
import {
  envelopeCategoriesOptions,
  envelopeCurrencyOptions,
} from "../../../data/envelope-forms.data";

const ADD_ENVELOPE_NOTIFICATION_TITLE = "Create Envelope";

export default function AddEnvelope() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<AddEnvelopeFormData>({
    defaultValues: {
      name: "",
      allocatedAmount: 0,
      spentAmount: 0,
      balance: 0,
      currency: "GHS",
      category: "groceries",
      notes: "",
    },
  });
  const { state, dispatch } = useEnvelopesContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notification = useNotification();

  const closeModal = () =>
    dispatch({ type: "SET_NEW_ENVELOPE_MODAL", payload: false });

  const allocatedAmount = useWatch({
    control,
    name: "allocatedAmount",
  });

  useEffect(() => {
    setValue("balance", allocatedAmount);
  }, [allocatedAmount, setValue]);

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
            {/* Envelope Name */}
            <Input
              id="envelopeName"
              label="Name"
              placeholder="e.g., Groceries, Rent, Entertainment"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />
            {/* Allocated Amount */}
            <Input
              id="envelopeAllocatedAmount"
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
            {/* Balance */}
            <Input
              id="envelopeBalance"
              label="Balance"
              type="number"
              disabled={true}
              placeholder="0.00"
              min="0"
              readOnly
              {...register("balance", {
                valueAsNumber: true,
              })}
            />

            {/* Currency */}
            <Select
              id="envelopeCurrency"
              label="Currency"
              options={envelopeCurrencyOptions}
              {...register("currency", {
                required: "Currency is required",
              })}
              error={errors.currency?.message}
            />

            {/* Category */}
            <Select
              id="envelopeCategory"
              label="Categories"
              options={envelopeCategoriesOptions}
              defaultOption={{ name: "Select envelope category", value: "" }}
              {...register("category", {
                required: "Category is required",
              })}
              error={errors?.category?.message}
            />

            {/* Notes */}
            <Textarea
              id="envelopesNotes"
              label="Notes (Optional)"
              placeholder="Add any notes about this envelope"
              {...register("notes")}
            />
            <div className="modal-actions">
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn-primary"
                type="submit"
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
