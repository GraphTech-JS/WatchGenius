'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './CatalogSearch.module.css';
import Image from 'next/image';
import { CatalogSearchIcon } from '../../../../../public/catalogPage';
import { t } from '@/i18n';
import { catalogKeys } from '@/i18n/keys/catalog';
import { a11yKeys } from '@/i18n/keys/accessibility';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CatalogSearch: React.FC<CatalogSearchProps> = ({
  value,
  onChange,
  placeholder = t(catalogKeys.controls.searchPlaceholder),
}) => {
  const { suggestions, loading } = useSearchSuggestions(value, {
    minLength: 2,
    debounceMs: 150,
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowSuggestions(suggestions.length > 0 && value.trim().length >= 2);
    setFocusedIndex(-1);
  }, [suggestions, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestionValue: string) => {
    onChange(suggestionValue);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[focusedIndex].value);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.type]) {
      acc[suggestion.type] = [];
    }
    acc[suggestion.type].push(suggestion);
    return acc;
  }, {} as Record<string, typeof suggestions>);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'brand':
        return 'Бренди';
      case 'model':
        return 'Моделі';
      case 'watch':
        return 'Годинники';
      default:
        return type;
    }
  };

  return (
    <div ref={containerRef} className='relative w-full'>
      <label htmlFor='catalog-search' className='sr-only'>
        {t(a11yKeys.catalog.search)}
      </label>
      <input
        ref={inputRef}
        id='catalog-search'
        type='search'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0 && value.trim().length >= 2) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder}
        className={`${styles.catalogSearch} w-full`}
        aria-label={t(a11yKeys.catalog.search)}
        aria-autocomplete='list'
        aria-expanded={showSuggestions}
        aria-controls={showSuggestions ? 'search-suggestions' : undefined}
        role='combobox'
      />
      <div className={styles.iconWrapper} aria-hidden='true'>
        <Image
          src={CatalogSearchIcon}
          alt='CatalogSearchIcon'
          width={20}
          height={20}
          className={styles.icon}
        />
      </div>

      {showSuggestions && (
        <div
          id='search-suggestions'
          className={styles.suggestionsDropdown}
          role='listbox'
        >
          {loading && (
            <div className={styles.suggestionItem}>Завантаження...</div>
          )}
          {!loading && Object.keys(groupedSuggestions).length === 0 && (
            <div className={styles.suggestionItem}>Нічого не знайдено</div>
          )}
          {!loading &&
            Object.entries(groupedSuggestions).map(([type, items]) => (
              <div key={type}>
                <div className={styles.suggestionGroupLabel}>
                  {getTypeLabel(type)}
                </div>
                {items.map((suggestion, index) => {
                  const globalIndex = suggestions.indexOf(suggestion);
                  return (
                    <button
                      key={`${type}-${index}`}
                      type='button'
                      onClick={() => handleSuggestionClick(suggestion.value)}
                      className={`${styles.suggestionItem} ${
                        focusedIndex === globalIndex
                          ? styles.suggestionItemFocused
                          : ''
                      }`}
                      onMouseEnter={() => setFocusedIndex(globalIndex)}
                    >
                      {suggestion.value}
                    </button>
                  );
                })}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
