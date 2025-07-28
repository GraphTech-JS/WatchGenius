import { Card } from "@/features/home/Catalog/components/Card/Card";
import { Watch } from "@/types";
import styles from "./SearchResults.module.css";
import { useExchangeRate } from "@/hooks/useExchangeRate";

export const SearchResults = ({ items = [] }: { items: Watch[] }) => {
  const { rate: usdToUah } = useExchangeRate("USD");
  if (usdToUah === null) {
    return <p>Завантаження</p>;
  }
  return (
    <div className={styles.searchResults}>
      {items.map((item) => (
        <Card key={item.id} item={item} exchangeRate={usdToUah} />
      ))}
    </div>
  );
};
