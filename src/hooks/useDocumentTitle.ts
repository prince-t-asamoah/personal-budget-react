import { useEffect } from "react";

const DEFAULT_APP_TITLE = "Personal Budget";

function capitalizeFirst(value?: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function useDocumentTitle(title?: string, suffix = DEFAULT_APP_TITLE) {
  useEffect(() => {
    if (!title) {
      document.title = suffix;
      return;
    }

    const safeTitle = capitalizeFirst(title);
    document.title = `${safeTitle} — ${suffix}`;
  }, [title, suffix]);
}
