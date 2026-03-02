import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  EditEnvelopeFormData,
  Envelope,
} from "../../../models/envelopes.model";

type EditEnvelopeProps = {
  envelope: Envelope;
  closeModal: () => void;
};

export default function EditEnvelope({
  envelope,
  closeModal,
}: Readonly<EditEnvelopeProps>) {
  const { register, handleSubmit } = useForm<EditEnvelopeFormData>({
    defaultValues: {
      name: envelope.name,
      allocatedAmount: envelope.allocatedAmount,
      currency: envelope.currency,
      balance: envelope.allocatedAmount - envelope.spentAmount,
    },
  });

  const onSubmit: SubmitHandler<EditEnvelopeFormData> = (data) => {
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
              stroke-width="2"
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
            <div className="form-group">
              <label className="form-label" htmlFor="envelopeName">
                Envelope Name *
              </label>
              <input
                type="text"
                className="form-input"
                id="envelopeName"
                placeholder="e.g., Groceries, Rent, Entertainment"
                {...register("name")}
              />
            </div>

            {/* <!-- Alloacated Amount --> */}
            <div className="form-group">
              <label className="form-label" htmlFor="envelopeAmount">
                Allocated Amount *
              </label>
              <input
                type="number"
                className="form-input"
                id="envelopeAmount"
                placeholder="0.00"
                step="0.01"
                min="0"
                {...register("allocatedAmount")}
              />
            </div>

            {/* <!-- Currency --> */}
            <div className="form-group">
              <label className="form-label" htmlFor="envelopeCurrency">
                Currency
              </label>
              <select
                className="form-input"
                id="envelopeCurrency"
                {...register("currency")}
              >
                <option value="GHS" selected>
                  GHS (₵)
                </option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* <!-- Notes --> */}
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

            {/* Balance */}
            <div className="form-group">
              <label className="form-label" htmlFor="envelopeBalance">
                Balance
              </label>
              <output
                className="form-input"
                id="envelopeBalance"
                min="0"
                {...register("balance")}
              />
            </div>
          </form>
        </div>

        {/* <!-- Modal Footer --> */}
        <div className="modal-actions">
          <button className="btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
