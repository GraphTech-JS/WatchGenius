"use client";

import React, { useEffect } from "react";
import styles from "./ComparisonModal.module.css";
import { t } from "@/i18n";
import { modalsKeys } from "@/i18n/keys/modals";

interface ComparisonModalProps {
  isVisible: boolean;
  onClose: () => void;
  isAdded: boolean;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isVisible,
  onClose,
  isAdded,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <span className={styles.modalText}>
          {isAdded
            ? t(modalsKeys.comparison.added)
            : t(modalsKeys.comparison.removed)}
        </span>
      </div>
    </div>
  );
};

export default ComparisonModal;
