import { ENVELOPES_ROUTES } from "../../constants/routes.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function EnvelopesAnalyticsContent() {
  useDocumentTitle(ENVELOPES_ROUTES.ANALYTICS.NAME);

  return (
    <>
      <h2 className="page-heading">{ENVELOPES_ROUTES.ANALYTICS.NAME}</h2>
    </>
  );
}
