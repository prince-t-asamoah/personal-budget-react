import { APP_ROUTES } from "../../../constants/routes.constants";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

export default function EnvelopesAnalyticsContent() {
  useDocumentTitle(APP_ROUTES.ANALYTICS.NAME);

  return (
    <>
      <h2 className="page-heading">{APP_ROUTES.ANALYTICS.NAME}</h2>
    </>
  );
}
