import { Card } from "@/features/home/Catalog/components/Card/Card";
import { IWatch } from "@/interfaces";
import { mockData } from "@/mock/watch";
import styles from "./SearchResults.module.css";

export const SearchResults = ({ items = mockData }: { items: IWatch[] }) => {
  return (
    <div className={styles.searchResults}>
      {items.map((item: IWatch) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};
