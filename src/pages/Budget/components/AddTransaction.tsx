import { useForm, type SubmitHandler } from "react-hook-form";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import Input from "../../../components/Forms/Input";
import Textarea from "../../../components/Forms/Textarea";
import Select from "../../../components/Forms/Select";
import {
  type AddExpenseFundsFormData,
  type Envelope,
} from "../../../models/envelopes.model";
import { expenseEnvelope } from "../../../services/apis/envelopesApi.service";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";
import { validatePositiveAmount } from "../../../utils/validation.utils";
import useNotification from "../../../hooks/useNotification";
import { TransactionType } from "../../../models/transactions.model";

export default function AddTransaction() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddExpenseFundsFormData>();
  const { state, dispatch } = useEnvelopesContext();
  const notification = useNotification();

  const closeModal = () => dispatch({ type: "CLOSE_TRANSACTING_MODAL" });

  const onSubmit: SubmitHandler<AddExpenseFundsFormData> = async ({
    transactionType,
    amount,
    description,
    notes,
  }) => {
    let requestApi: Promise<Response> | undefined;

    try {
      switch (transactionType) {
        case TransactionType.EXPENSE:
          requestApi = expenseEnvelope(state.currentEnvelope?.id ?? "", {
            amount,
            description,
            notes,
          });
          break;
      }

      if (!requestApi) return;

      const response = await requestApi;

      if (!response.ok)
        throw new Error(((await response.json()) as ErrorApiResponse).message);

      const responseJson =
        (await response.json()) as SuccessApiResponse<Envelope>;

      dispatch({ type: "UPDATE_ENVELOPE", payload: responseJson.data! });
      notification.success({
        title: "Add Transaction",
        message: `${transactionType} transaction successful`,
      });
      closeModal();
    } catch (error: unknown) {
      console.error("Add Transaction Error: ", error);
      notification.error({
        title: "Add Transaction",
        message: `${transactionType} transaction failed`,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* <!-- Modal Header --> */}
        <div className="modal-header">
          <h3 className="modal-title">Add Transaction</h3>
          <button className="modal-close" onClick={closeModal}>
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
          {/* <!-- Current Balance Info --> */}
          <div className="info-alert">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div className="info-alert-text">
              Current balance in <strong>{state.currentEnvelope?.name}</strong>{" "}
              envelope:{" "}
              <strong>
                {state.currentEnvelope?.currency}{" "}
                {state.currentEnvelope?.balance}
              </strong>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <!-- Transaction Type --> */}
            <Select
              id="transactionType"
              label="Transaction Type *"
              defaultOption={{
                name: "Select transaction type",
                value: "",
              }}
              options={[
                { name: "Expense (Spending)", value: TransactionType.EXPENSE },
                { name: "Funding (Deposit)", value: TransactionType.FUNDING },
              ]}
              {...register("transactionType", {
                required: "Select a transaction type",
              })}
              error={errors.transactionType?.message}
            />

            {/* <!-- Amount --> */}
            <Input
              type="number"
              label="Amount *"
              id="transactionAmount"
              placeholder="0.00"
              step="0.01"
              min="0"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
                validate: (value) =>
                  validatePositiveAmount(value, "Transaction amount"),
              })}
              error={errors.amount?.message}
            />

            {/* <!-- Description --> */}
            <Input
              type="text"
              label="Description *"
              id="transactionDescription"
              placeholder="e.g., Whole Foods Market, Monthly Salary"
              {...register("description", {
                required: "Description is required",
              })}
              error={errors.description?.message}
            />

            {/* <!-- Notes --> */}
            <Textarea
              label="Notes (Optional)"
              id="transactionNotes"
              placeholder="Add any additional notes about this transaction"
              rows={3}
              {...register("notes")}
              error={errors.notes?.message}
            />

            {/* <!-- Modal Actions --> */}
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
