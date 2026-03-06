import { Outlet } from "react-router-dom";
import "./Envelopes.css";

import AddEnvelope from "../AddEnvelope";
import { APP_ROUTES } from "../../../../constants/routes.constants";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import { useEnvelopesContext } from "../../../../context/envelopes.context";
import DeleteEnvelope from "../DeleteEnvelope";

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

      {/* Delete Envelope */}
      {state.isDeleting && <DeleteEnvelope />}
    </>
  );
}
