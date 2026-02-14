import { APP_ROUTES } from "../../constants/routes.constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function EnvelopesHelpSupportContent() {
  useDocumentTitle(APP_ROUTES.HELP_SUPPORT.NAME);

  return (
    <>
      <h2 className="page-heading">{APP_ROUTES.HELP_SUPPORT.NAME}</h2>
    </>
  );
}
