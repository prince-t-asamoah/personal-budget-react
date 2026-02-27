import toastBase, { type Toast } from "react-hot-toast";
import type { ToastNotificationType } from "../../models/toastNotification.model";
import "./ToastNotification.css";
import type { ReactNode } from "react";

// Toast Icon SVG
function ToastSuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function ToastErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function ToastWarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ToastInfoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// Actions Button
type ToastActionButtonProps = {
  type: "primary" | "secondary";
  label: string;
  action: () => void;
};

export function ToastActionButton({
  type = "primary",
  label = "Button",
  action,
}: ToastActionButtonProps) {
  return (
    <button className={`toast-action-btn ${type}`} onClick={action}>
      {label}
    </button>
  );
}

type ToastNotifiactionProps = {
  id: string;
  type: ToastNotificationType;
  title: string;
  message: string;
  actions?: ReactNode;
  toast: Toast;
};

export default function ToastNotification({
  id,
  type,
  title,
  message,
  actions,
  toast,
}: Readonly<ToastNotifiactionProps>) {
  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">
        {type === "success" && <ToastSuccessIcon />}
        {type === "error" && <ToastErrorIcon />}
        {type === "warning" && <ToastWarningIcon />}
        {type === "info" && <ToastInfoIcon />}
      </div>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
        <div className="toast-actions">{actions}</div>
      </div>
      <button className="toast-close" onClick={() => toastBase.dismiss(id)}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="toast-progress">
        <div
          className="toast-progress-bar"
          style={{
            animationDuration: `${toast.duration}ms`,
            animationPlayState: toast.visible ? "running" : "paused",
          }}
        ></div>
      </div>
    </div>
  );
}
