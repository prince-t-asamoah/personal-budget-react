import "./Envelopes.css";
import AddEnvelope from "../AddEnvelope";
import { useEnvelopesContext } from "../../../../context/envelopes.context";
import { Outlet } from "react-router-dom";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import { APP_ROUTES } from "../../../../constants/routes.constants";
import DistributeFunds from "../DistributeFunds";
import TransferFunds from "../TransferFunds";

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

      {/* Transfer Funds */}
      {state.isTransferringFunds && <TransferFunds />}

      {/* Distribute Funds */}
      {state.isDistributingFunds && <DistributeFunds />}
    </>
  );
}
