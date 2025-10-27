import React from 'react';
import styles from './FeedbackForm.module.css';
import { FeedbackFormData } from '@/types/feedback';

interface FeedbackFormProps {
  watchTitle: string;
  formData: FeedbackFormData;
  onUpdateFormData: (field: keyof FeedbackFormData, value: string) => void;
  onSubmit: () => void;
  errors?: {
    name: string;
    email: string;
    message: string;
  };
  onClearError?: (field: keyof FeedbackFormData) => void;
  onBlur?: (field: keyof FeedbackFormData) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  watchTitle,
  formData,
  onUpdateFormData,
  onSubmit,
  errors = { name: '', email: '', message: '' },
  onClearError,
  onBlur,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleInputChange =
    (field: keyof FeedbackFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdateFormData(field, e.target.value);
      if (onClearError && errors[field]) {
        onClearError(field);
      }
    };

  const handleBlur = (field: keyof FeedbackFormData) => () => {
    if (onBlur) {
      onBlur(field);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        <span>Форма зворотнього</span>
        <br />
        <span style={{ marginLeft: '20px' }}>зв&apos;язку</span>
      </h2>

      <p className={styles.interestText}>
        Ви цікавитесь <span className={styles.watchName}>{watchTitle}</span>
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <input
              type='text'
              placeholder="Ваше ім'я"
              value={formData.name}
              onChange={handleInputChange('name')}
              onBlur={handleBlur('name')}
              className={`${styles.input} ${
                errors.name ? styles.inputError : ''
              }`}
            />
            {errors.name && (
              <div className={styles.errorMessage}>{errors.name}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange('email')}
              onBlur={handleBlur('email')}
              className={`${styles.input} ${
                errors.email ? styles.inputError : ''
              }`}
            />
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email}</div>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <textarea
            placeholder='Повідомлення'
            value={formData.message}
            onChange={handleInputChange('message')}
            onBlur={handleBlur('message')}
            className={`${styles.textarea} ${
              errors.message ? styles.inputError : ''
            }`}
            rows={4}
          />
          {errors.message && (
            <div className={styles.errorMessage}>{errors.message}</div>
          )}
        </div>

        <button type='submit' className={styles.submitButton}>
          Відправити
        </button>
      </form>
    </div>
  );
};
