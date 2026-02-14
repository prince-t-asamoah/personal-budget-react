import { APP_ROUTES } from "../../constants/routes.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function EnvelopesSettingsContent() {
  useDocumentTitle(APP_ROUTES.SETTINGS.NAME);

  return (
    <>
      <h2 className="page-heading">{APP_ROUTES.SETTINGS.NAME}</h2>
    </>
  );
}
