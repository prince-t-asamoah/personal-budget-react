import toast from "react-hot-toast";
import type { ToastNotificationType } from "../models/toastNotification.model";
import ToastNotification from "../components/ToastNotification/ToastNotification";

type ToastNotificationOptions = {
  title: string;
  message?: string;
  duration?: number;
};

export default function useNotification() {
  const notify = (
    type: ToastNotificationType,
    { title, message, duration }: ToastNotificationOptions,
  ) => {
    toast.custom(
      (t) => (
        <ToastNotification
          id={t.id}
          toast={t}
          title={title}
          message={message ?? ""}
          type={type}
        />
      ),
      { duration },
    );
  };

  return {
    success: (options: ToastNotificationOptions) => notify("success", options),
    error: (options: ToastNotificationOptions) => notify("error", options),
    info: (options: ToastNotificationOptions) => notify("info", options),
    warning: (options: ToastNotificationOptions) => notify("warning", options),
  };
}
