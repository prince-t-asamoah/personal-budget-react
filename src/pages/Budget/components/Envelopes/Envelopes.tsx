import { Outlet } from "react-router-dom";
import "./Envelopes.css";

import { APP_ROUTES } from "../../../../constants/routes.constants";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import { useEnvelopesContext } from "../../../../context/envelopes.context";
import AddEnvelope from "../AddEnvelope";
import DeleteEnvelope from "../DeleteEnvelope";
import AddTransaction from "../AddTransaction";
import EditEnvelope from "../EditEnvelope";

export default function Envelopes() {
  useDocumentTitle(APP_ROUTES.ENVELOPES.NAME);

  const { state } = useEnvelopesContext();

  return (
    <>
      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Add New Envelope */}
      {state.isAddingEnvelope && <AddEnvelope />}

      {/* Edit Envelope */}
      {state.isEditing && <EditEnvelope />}

      {/* Delete Envelope */}
      {state.isDeleting && <DeleteEnvelope />}

      {/* Edit Envelope */}
      {state.isTransacting && <AddTransaction />}
    </>
  );
}
