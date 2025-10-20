import { CatalogSearch } from '../CatalogSearch/CatalogSearch';
import { SaveToChatButton } from '../SaveToChatButton/SaveToChatButton';
import { SortButtons } from '../SortButtons/SortButtons';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import { CatalogControlsProps } from '@/interfaces';


export const CatalogControls: React.FC<CatalogControlsProps> = ({
  searchTerm,
  onSearchChange,
  selectedIndexes,
  onToggleIndex,
  sortValue,
  onSortChange,
  onSaveToChat,
}) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-[15px] mb-5 md:mb-[56px]'>
      <div className='flex flex-col md:flex-row items-stretch sm:items-center gap-3 sm:gap-[15px] w-full md:w-auto'>
        <CatalogSearch value={searchTerm} onChange={onSearchChange} />
        <SaveToChatButton onClick={onSaveToChat} />
      </div>

      <div className='flex items-center gap-3 flex-col md:flex-row md:gap-[15px] w-full md:w-auto'>
        <div className='flex'>
          <SortButtons
            selectedIndexes={selectedIndexes}
            onToggleIndex={onToggleIndex}
          />
        </div>
        <div className='flex-1 w-full md:flex-none md:w-auto'>
          <SortDropdown value={sortValue} onChange={onSortChange} />
        </div>
      </div>
    </div>
  );
};
