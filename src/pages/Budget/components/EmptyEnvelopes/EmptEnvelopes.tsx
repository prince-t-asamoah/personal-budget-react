import { Wallet } from "lucide-react";
import "./EmptyEnvelopes.css";

type EmptyEnvelopesProps = {
  openAddModal: () => void;
};

export default function EmptyEnvelopes({
  openAddModal,
}: Readonly<EmptyEnvelopesProps>) {
  return (
    <div className="empty-envelopes">
      <Wallet size={64} className="empty-envelopes-icon" />
      <h3 className="empty-envelopes-title">No Envelopes Yet</h3>
      <p className="empty-envelopes-text">
        Create your first envelope to start budgeting
      </p>
      <button
        className="btn btn-primary empty-envelopes-button"
        onClick={openAddModal}
      >
        Create Envelope
      </button>
    </div>
  );
}
