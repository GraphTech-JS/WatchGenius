"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useClickOutside } from "@/utils/useClickOutside";

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
  className = "",
  showCloseButton = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref as React.RefObject<HTMLDivElement>, onClose);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="flex fixed inset-0 z-50 justify-center items-center bg-black/70"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={ref}
        className={`overflow-y-auto w-full max-w-lg bg-white rounded-lg shadow-xl max-h-[90vh] ${className}`}
      >
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            {title && (
              <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-black hover:text-gray-600 focus:outline-none"
                aria-label="Закрыть модалку"
              >
                {/* крестик */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
