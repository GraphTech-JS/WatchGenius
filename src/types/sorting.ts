import { t } from "@/i18n";
import { catalogKeys } from "@/i18n/keys/catalog";

export const SortOption = {
  DEFAULT: t(catalogKeys.sort.default),
  TREND_90_DAYS: t(catalogKeys.sort.treand90days),
  PRICE_ASC: t(catalogKeys.sort.priceASC),
  PRICE_DESC: t(catalogKeys.sort.priceDESC),
  NEWEST: t(catalogKeys.sort.newest),
  NAME: t(catalogKeys.sort.name),
  INDEX_ASC: t(catalogKeys.sort.indexASC),
  INDEX_DESC: t(catalogKeys.sort.indexDESC),
} as const;

export type SortOption = (typeof SortOption)[keyof typeof SortOption];
