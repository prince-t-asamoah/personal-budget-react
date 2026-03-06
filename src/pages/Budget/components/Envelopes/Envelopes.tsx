import "./Envelopes.css";
import AddEnvelope from "../AddEnvelope";
import { useEnvelopesContext } from "../../../../context/envelopes.context";
import { Outlet } from "react-router-dom";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import { APP_ROUTES } from "../../../../constants/routes.constants";
import { AddTransaction } from "../AddTransaction";

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

      {/* Add Transaction */}
      <AddTransaction />
    </>
  );
}
