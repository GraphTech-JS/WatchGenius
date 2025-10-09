import { useState, useCallback } from 'react';
import { FeedbackFormData, FeedbackModalState } from '@/types/feedback';

export const useFeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [watchTitle, setWatchTitle] = useState('');
  const [modalState, setModalState] = useState<FeedbackModalState>('form');
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: '',
    email: '',
    message: ''
  });

  const openModal = useCallback((title: string) => {
    setWatchTitle(title);
    setIsOpen(true);
    setModalState('form');
    setFormData({ name: '', email: '', message: '' });
  }, []);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalState('form');
    setFormData({ name: '', email: '', message: '' });
  }, []);

  const updateFormData = useCallback((field: keyof FeedbackFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const submitForm = useCallback(async () => {
    try {
      console.log('Відправка форми:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModalState('success');
    } catch (error) {
      console.error('Помилка відправки форми:', error);
    }
  }, [formData]);

  return {
    isOpen,
    watchTitle,
    modalState,
    formData,
    openModal,
    closeModal,
    updateFormData,
    submitForm
  };
};
