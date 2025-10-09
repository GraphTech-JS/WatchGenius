import React from 'react';
import styles from './FeedbackForm.module.css';
import { FeedbackFormData } from '@/types/feedback';

interface FeedbackFormProps {
  watchTitle: string;
  formData: FeedbackFormData;
  onUpdateFormData: (field: keyof FeedbackFormData, value: string) => void;
  onSubmit: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  watchTitle,
  formData,
  onUpdateFormData,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleInputChange =
    (field: keyof FeedbackFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdateFormData(field, e.target.value);
    };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Форма зворотнього зв&apos;язку</h2>

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
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange('email')}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <textarea
            placeholder='Повідомлення'
            value={formData.message}
            onChange={handleInputChange('message')}
            className={styles.textarea}
            rows={4}
            required
          />
        </div>

        <button type='submit' className={styles.submitButton}>
          Відправити
        </button>
      </form>
    </div>
  );
};
