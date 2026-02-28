import React, { createContext, useContext } from "react";

/**
 * ToastContext exposes the existing App-level showToast(type, message) function
 * so components/pages can trigger toasts without prop-drilling.
 */
const ToastContext = createContext(() => {});

export function ToastProvider({ showToast, children }) {
  return (
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
