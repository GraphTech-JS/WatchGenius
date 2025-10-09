
export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchTitle: string;
}

export type FeedbackModalState = 'form' | 'success';
