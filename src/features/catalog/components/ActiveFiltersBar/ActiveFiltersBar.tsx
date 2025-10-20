type ActiveFiltersBarProps = {
  chips: { id: string; label: string }[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
};

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
export const ActiveFiltersBar = React.forwardRef<
  HTMLDivElement,
  ActiveFiltersBarProps
>(({ chips, onRemove, onClearAll }, ref) => {
  if (chips.length === 0) return null;


  return (
    <div
      ref={ref}
      className='max-md:hidden absolute left-0 right-0 z-[5] flex flex-wrap gap-2 items-center pointer-events-none'
      style={{ top: -10, transform: 'translateY(-100%)' }}
    >
      <button
        type='button'
        onClick={onClearAll}
        className='px-3  h-[32px] rounded-full border text-[14px] hover:bg-[#04694f] hover:text-white transition-all duration-300 cursor-pointer pointer-events-auto'
        style={{ borderColor: '#04694f' }}
      >
        Очистити всі
      </button>

      {chips.map(({ id, label }) => (
        <div
          key={id}
          className='flex items-center justify-center gap-2 px-3 py-3  h-[32px] cursor-pointer rounded-full border max-w-[240px] bg-white pointer-events-auto'
          style={{ borderColor: '#04694f' }}
          title={label}
        >
          <span className='truncate'>{label}</span>
          <button
            aria-label='Видалити фільтр'
            onClick={() => onRemove(id)}
            className='text-[#8b8b8b] hover:text-[#04694f]  cursor-pointer '
          >
            <AiOutlineClose className='w-5 h-5' />
          </button>
        </div>
      ))}
    </div>
  );
});
ActiveFiltersBar.displayName = 'ActiveFiltersBar';
