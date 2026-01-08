import { X, CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import "./Toast.css";

const Toast = ({ type = "error", message, onClose }) => {
  const Icon =
    type === "success"
      ? CheckCircle
      : type === "error"
      ? XCircle
      : type === "info"
      ? Info
      : AlertTriangle;

  return (
    <div className="toast">
      {/* GARIS KIRI */}
      <div className={`toast-bar toast-bar-${type}`} />

      <div className="toast-box">
        <div className="toast-content">
          <div className="toast-head">
            <Icon size={18} className="toast-icon" />
            <strong>
              {type === "success" && "Success"}
              {type === "error" && "Error"}
              {type === "info" && "Info"}
              {type === "warning" && "Warning"}
            </strong>
          </div>

          <p>{message}</p>
        </div>

        <button className="toast-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
