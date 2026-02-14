import { ENVELOPES_ROUTES } from "../../constants/routes.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function EnvelopesSettingsContent() {
  useDocumentTitle(ENVELOPES_ROUTES.SETTINGS.NAME);

  return (
    <>
      <h2 className="page-heading">{ENVELOPES_ROUTES.SETTINGS.NAME}</h2>
    </>
  );
}
