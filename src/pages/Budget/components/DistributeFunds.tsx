import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import { distributeFunds } from "../../../services/apis/envelopesApi.service";
import { formatCurrency } from "../../../utils/ui.utils";
import type {
  DistributeFundsFormData,
  Envelope,
} from "../../../models/envelopes.model";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";
import useNotification from "../../../hooks/useNotification";
import Input from "../../../components/Forms/Input";
import { validatePositiveAmount } from "../../../utils/validation.utils";

const TOAST_NOTIFICATION_TITLE = "Distribute Funds";

export default function DistributeFunds() {
  const { state, dispatch } = useEnvelopesContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DistributeFundsFormData>({
    defaultValues: {
      amount: 0,
      envelopesId: [],
    },
  });

  const distributionAmount = useWatch({
    control,
    name: "amount",
  });

  const envelopesId = useWatch({
    control,
    name: "envelopesId",
  });

  const closeModal = () => {
    dispatch({ type: "SET_IS_DISTRIBUTING_FUNDS", payload: false });
  };

  const onSubmit: SubmitHandler<DistributeFundsFormData> = (data) => {
    setIsSubmitting(true);

    distributeFunds(data)
      .then(async (response) => {
        if (!response.ok) {
          const errorResponse = (await response.json()) as ErrorApiResponse;
          throw new Error(errorResponse.message);
        }
        const successReponse = (await response.json()) as SuccessApiResponse<
          Envelope[]
        >;

        if (!successReponse.data) {
          throw new Error("Distribute Funds: Invalid data reponse from server");
        }

        const updatedEnvelopes = new Map(
          successReponse.data.map((env) => [env.id, env]),
        );

        dispatch({
          type: "SET_ENVELOPES",
          payload: state.envelopes.map(
            (env) => updatedEnvelopes.get(env.id) ?? env,
          ),
        });
        notification.success({
          title: TOAST_NOTIFICATION_TITLE,
          message: "Funds distributed successfully",
        });
        closeModal();
      })
      .catch((error) => {
        console.error(error.message);
        notification.error({
          title: TOAST_NOTIFICATION_TITLE,
          message: "Funds distribution failed",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Distribute Funds</h3>
          <Input
            id="distributionAmount"
            label="Amount to Distribute"
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            {...register("amount", {
              required: "Distribution amount is required",
              valueAsNumber: true,
              validate: (value) =>
                validatePositiveAmount(value, "Distribution amount"),
            })}
            error={errors.amount?.message}
          />

          <div className={`form-group ${errors.envelopesId?.message ? "error" : ""}`}>
            <label>Select Envelopes</label>
            <div className="checkbox-list">
              {state.envelopes.map((envelope) => (
                <label key={envelope.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={envelope.id}
                    {...register("envelopesId", {
                      required: "Select an envelope to distribute amount",
                    })}
                  />
                  <span className="checkbox-label">{envelope.name}</span>
                  <span className="checkbox-amount">
                    {formatCurrency(envelope.balance, envelope.currency)}
                  </span>
                </label>
              ))}
            </div>
            <p
              className={`error-message ${errors.envelopesId?.message ? "show" : ""} `}
            >
              {errors.envelopesId?.message}
            </p>
          </div>
          {distributionAmount > 0 && envelopesId.length > 0 && (
            <p
              style={{
                marginTop: "1rem",
                color: "var(--sage)",
                fontWeight: 600,
              }}
            >
              Each envelope will receive:{" "}
              {formatCurrency(distributionAmount / envelopesId.length)}
            </p>
          )}
          <div className="modal-actions">
            <button onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner small"></span>
                  Distributing...
                </>
              ) : (
                <>
                  <TrendingUp size={20} />
                  Distribute
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
