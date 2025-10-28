import { t } from "@/i18n";
import { catalogKeys } from "@/i18n/keys/catalog";
import { SortOption } from "@/types/sorting";

export const sortLabels = {
  [SortOption.DEFAULT]: t(catalogKeys.sort.default),
  [SortOption.TREND_90_DAYS]: t(catalogKeys.sort.treand90days),
  [SortOption.PRICE_ASC]: t(catalogKeys.sort.priceASC),
  [SortOption.PRICE_DESC]: t(catalogKeys.sort.priceDESC),
  [SortOption.NEWEST]: t(catalogKeys.sort.newest),
  [SortOption.NAME]: t(catalogKeys.sort.name),
  [SortOption.INDEX_ASC]: t(catalogKeys.sort.indexASC),
  [SortOption.INDEX_DESC]: t(catalogKeys.sort.indexDESC),
} as const;
