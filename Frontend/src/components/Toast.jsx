import {
  X,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle
} from "lucide-react";
import "./Toast.css";

export default function Toast({
  type = "info",
  message,
  onClose,
  loading = false
}) {
  const Icon =
    type === "success"
      ? CheckCircle
      : type === "error"
      ? XCircle
      : type === "warning"
      ? AlertTriangle
      : Info;

  const title =
    type === "success"
      ? "Success"
      : type === "error"
      ? "Error"
      : type === "warning"
      ? "Warning"
      : "Info";

  return (
    <div
      className={`toast toast-${type} ${loading ? "toast-loading" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon-wrap">
        <Icon size={18} />
      </div>

      <div className="toast-text">
        <strong>{title}</strong>
        <span>{message}</span>
      </div>

      <button
        className="toast-close"
        onClick={onClose}
        disabled={loading}
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
}
