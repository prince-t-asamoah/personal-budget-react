import { ArrowRightLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import { transferEnvelopeFunds } from "../../../services/apis/envelopesApi.service";
import { formatCurrency } from "../../../utils/ui.utils";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import Select from "../../../components/Forms/Select";
import Input from "../../../components/Forms/Input";
import type { TransferFundsFormData } from "../../../models/envelopes.model";
import { validatePositiveAmount } from "../../../utils/validation.utils";

export default function TransferFunds() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TransferFundsFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, dispatch } = useEnvelopesContext();

  const selectOptions = useMemo(
    () =>
      state.envelopes.map((envelope) => ({
        name: `${envelope.name} -${" "} ${formatCurrency(envelope.balance, envelope.currency)}`,
        value: envelope.id,
      })),
    [state.envelopes],
  );

  const transferData = useWatch({
    control,
  });

  const closeModal = () =>
    dispatch({ type: "SET_IS_TRANSFERING_FUNDS", payload: false });

  const onSubmit: SubmitHandler<TransferFundsFormData> = (data) => {
    setIsSubmitting(true);
    transferEnvelopeFunds(data)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        if (!response) {
          throw new Error("Invalid response from server.");
        }
        const fromEnvelopeIndex = state.envelopes.findIndex(
          (envelope) => envelope.id === transferData.fromId,
        );
        if (fromEnvelopeIndex === -1) {
          throw new Error("Transfer from envelope does not exist.");
        }
        const toEnvelopeIndex = state.envelopes.findIndex(
          (envelope) => envelope.id === transferData.toId,
        );

        if (toEnvelopeIndex === -1) {
          throw new Error("Transfer to envelope does not exist.");
        }

        const updatedFromEnvelope = {
          ...state.envelopes[fromEnvelopeIndex],
          allocatedAmount:
            state.envelopes[fromEnvelopeIndex].allocatedAmount -
            (transferData?.amount ?? 0),
          balance:
            state.envelopes[fromEnvelopeIndex].allocatedAmount -
            (transferData?.amount ?? 0) -
            state.envelopes[fromEnvelopeIndex].spentAmount,
        };

        const updatedToEnvelope = {
          ...state.envelopes[toEnvelopeIndex],
          allocatedAmount:
            state.envelopes[toEnvelopeIndex].allocatedAmount +
            (transferData?.amount ?? 0),
          balance:
            state.envelopes[toEnvelopeIndex].allocatedAmount +
            (transferData?.amount ?? 0) -
            state.envelopes[toEnvelopeIndex].spentAmount,
        };

        const currentEnvelopes = state.envelopes.map((envelope, index) => {
          if (index === fromEnvelopeIndex) return updatedFromEnvelope;
          if (index === toEnvelopeIndex) return updatedToEnvelope;
          return envelope;
        });

        dispatch({ type: "SET_IS_TRANSFERING_FUNDS", payload: false });
        dispatch({ type: "SET_ENVELOPES", payload: currentEnvelopes });
        closeModal();
      })
      .catch((error) =>
        console.error("Error transfering envelope funds: ", error),
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Transfer Funds</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            id="transferFrom"
            label="From Envelope"
            options={selectOptions}
            defaultOption={{
              name: "Select envelope to transfer from",
              value: "",
            }}
            {...register("fromId", {
              required: "Select an envelope to transfer from",
            })}
            error={errors?.fromId?.message}
          />
          <Select
            id="transferTo"
            label="To Envelope"
            options={selectOptions}
            defaultOption={{
              name: "Select envelope to transfer to",
              value: "",
            }}
            {...register("toId", {
              required: "Select an envelope to transfer to",
            })}
            error={errors?.toId?.message}
          />
          <Input
            id="transfer-amount"
            type="number"
            label="Amount to Transfer"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            max={
              transferData.fromId
                ? state.envelopes.find((e) => e.id === transferData.fromId)
                    ?.balance
                : undefined
            }
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              validate: (value) => validatePositiveAmount(value),
            })}
            error={errors?.amount?.message}
          />
          {transferData.fromId && transferData.toId && transferData.amount && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                background: "var(--cream)",
                borderRadius: "8px",
                fontSize: "0.875rem",
              }}
            >
              <p
                style={{
                  marginBottom: "0.5rem",
                  color: "var(--dark-sage)",
                }}
              >
                <strong>Transfer Summary:</strong>
              </p>
              <p style={{ color: "var(--charcoal)" }}>
                From:{" "}
                <strong>
                  {
                    state.envelopes.find((e) => e.id === transferData.fromId)
                      ?.name
                  }
                </strong>
                <br />
                To:{" "}
                <strong>
                  {
                    state.envelopes.find((e) => e.id === transferData.toId)
                      ?.name
                  }
                </strong>
                <br />
                Amount:{" "}
                <strong style={{ color: "var(--sage)" }}>
                  {formatCurrency(transferData.amount)}
                </strong>
              </p>
            </div>
          )}
          <div className="modal-actions">
            <button onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn-primary">
              {isSubmitting ? (
                <>
                  <span className="spinner small"></span>
                  Tranfering...
                </>
              ) : (
                <>
                  <ArrowRightLeft size={20} />
                  Transfer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
