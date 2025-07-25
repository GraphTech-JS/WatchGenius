import { Card } from "@/features/home/Catalog/components/Card/Card";
import { Watch } from "@/types";
import styles from "./SearchResults.module.css";

export const SearchResults = ({ items = [] }: { items: Watch[] }) => {
  return (
    <div className={styles.searchResults}>
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};
