import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useEnvelopesContext } from "../../../context/envelopes.context";
import type { Envelope } from "../../../models/envelopes.model";
import { deleteEnvelope } from "../../../services/apis/envelopesApi.service";
import useNotification from "../../../hooks/useNotification";
import type {
  ErrorApiResponse,
  SuccessApiResponse,
} from "../../../models/api.model";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routes.constants";

const TOAST_NOTIFICATION_TITLE = "Delete Envelope";

export default function DeleteEnvelope() {
  const { state, dispatch } = useEnvelopesContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notification = useNotification();
  const navigate = useNavigate();

  const closeModal = () => dispatch({ type: "CLOSE_DELETE_MODAL" });

  const deleteEnvelopeById = () => {
    setIsSubmitting(true);
    deleteEnvelope(state.currentEnvelope?.id ?? "")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.json());
        }
        const jsonResponse =
          (await response.json()) as unknown as SuccessApiResponse<Envelope>;
        dispatch({
          type: "DELETE_ENVELOPE",
          payload: state.currentEnvelope?.id ?? "",
        });
        notification.success({
          title: TOAST_NOTIFICATION_TITLE,
          message: jsonResponse.message,
        });
        closeModal();
        navigate(APP_ROUTES.ENVELOPES.URL);
      })
      .catch((error: unknown) => {
        console.error(error);
        const apiError = error as ErrorApiResponse;
        notification.error({
          title: TOAST_NOTIFICATION_TITLE,
          message: apiError.message,
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Envelope</h3>
        <div>
          <p>
            You're about to delete{" "}
            <strong>{state.currentEnvelope?.name}</strong> envelope.
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
