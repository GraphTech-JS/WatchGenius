export const SortOption = {
  DEFAULT: "DEFAULT",
  TREND_90_DAYS: "TREND_90_DAYS",
  PRICE_ASC: "PRICE_ASC",
  PRICE_DESC: "PRICE_DESC",
  NEWEST: "NEWEST",
  NAME: "NAME",
  INDEX_ASC: "INDEX_ASC",
  INDEX_DESC: "INDEX_DESC",
} as const;

export type SortOption = (typeof SortOption)[keyof typeof SortOption];
export type SortFunction<T> = (a: T, b: T) => number;
