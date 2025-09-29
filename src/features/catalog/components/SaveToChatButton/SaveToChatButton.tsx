'use client';
import React from 'react';
import { FaRegStar } from 'react-icons/fa';

interface SaveToChatButtonProps {
  onClick: () => void;
}

export const SaveToChatButton: React.FC<SaveToChatButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='w-[250px] h-[51px] 
                 border border-[var(--zeleniy)] 
                 rounded-[15px] 
                 px-[21px] py-[16px] pr-[19px]
                 bg-white 
                 flex items-center gap-[8px]
                 font-[var(--font-inter)] font-medium text-[16px] text-[#04694f]
                 hover:bg-[#f8f8f8] transition-colors
                 focus:outline-none focus:ring-2 focus:ring-[#04694f] focus:ring-opacity-20'
    >
      <FaRegStar className='w-4 h-4 text-[#04694f]' />
      Зберегти пошук в чат
    </button>
  );
};
