
export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
  consent?: boolean;
}

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchTitle: string;
}

export type FeedbackModalState = 'form' | 'success';
