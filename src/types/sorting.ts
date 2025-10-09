export enum SortOption {
  DEFAULT = 'За замовчуванням',
  TREND_90_DAYS = 'По тренду (90 днів)',
  PRICE_ASC = 'По ціні (зростання)',
  PRICE_DESC = 'По ціні (спадання)',
  NEWEST = 'По новизні',
  NAME = 'По назві',
  INDEX_ASC = 'За індексом (зростання)',
  INDEX_DESC = 'За індексом (спадання)',
}

export type SortFunction<T> = (a: T, b: T) => number;
