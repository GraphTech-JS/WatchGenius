import React, { useEffect, useCallback, useState } from "react";
import { FeedbackModalProps, FeedbackFormData } from "@/types/feedback";
import { FeedbackForm } from "@/components/FeedbackForm/FeedbackForm";
import { t } from "@/i18n";
import { formKeys } from "@/i18n/keys/common";
import { modalsKeys } from "@/i18n/keys/modals";
import styles from "./FeedbackModal.module.css";

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  watchTitle,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [consentError, setConsentError] = useState("");

  const validateName = (value: string): boolean => {
    if (!value.trim()) {
      setNameError(t(modalsKeys.feedback.errors.nameRequired));
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError(t(modalsKeys.feedback.errors.emailRequired));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(t(modalsKeys.feedback.errors.emailInvalid));
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateMessage = (value: string): boolean => {
    if (!value.trim()) {
      setMessageError(t(modalsKeys.feedback.errors.messageRequired));
      return false;
    }
    setMessageError("");
    return true;
  };

  const validateConsent = (value: boolean): boolean => {
    if (!value) {
      setConsentError(t(formKeys.consent.error));
      return false;
    }
    setConsentError("");
    return true;
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", message: "", consent: false });
      setNameError("");
      setEmailError("");
      setMessageError("");
      setConsentError("");
      setShowSuccessModal(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  const handleUpdateFormData = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isMessageValid = validateMessage(formData.message);
    const isConsentValid = validateConsent(formData.consent || false);

    if (!isNameValid || !isEmailValid || !isMessageValid || !isConsentValid) {
      return;
    }

    try {
      console.log("Відправка форми:", formData);

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        handleClose();
        setFormData({ name: "", email: "", message: "", consent: false });
        setNameError("");
        setEmailError("");
        setMessageError("");
        setConsentError("");
      }, 3000);
    } catch (error) {
      console.error("Помилка відправки форми:", error);
    }
  };

  const handleClearError = (field: keyof FeedbackFormData | "consent") => {
    if (field === "name") setNameError("");
    if (field === "email") setEmailError("");
    if (field === "message") setMessageError("");
    if (field === "consent") setConsentError("");
  };

  const handleBlur = (field: keyof FeedbackFormData) => {
    if (field === "name") validateName(formData.name);
    if (field === "email") validateEmail(formData.email);
    if (field === "message") validateMessage(formData.message);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          ×
        </button>

        <FeedbackForm
          watchTitle={watchTitle}
          formData={formData}
          onUpdateFormData={handleUpdateFormData}
          onSubmit={handleSubmit}
          errors={{
            name: nameError,
            email: emailError,
            message: messageError,
            consent: consentError,
          }}
          onClearError={handleClearError}
          onBlur={handleBlur}
        />

        {showSuccessModal && (
          <div className={styles.successModalOverlay}>
            <div className={styles.successModal}>
              <span className={styles.successModalText}>
                {t(modalsKeys.feedback.success)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
