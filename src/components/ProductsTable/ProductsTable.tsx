import React from "react";
import { Table } from "../Table/Table";
import styles from "./ProductsTable.module.css";
import {
  BoxDarkIcon,
  DocDark,
  DocsDark,
  SessionDark,
} from "../../../public/icons";

interface Product {
  id: string;
  name?: string;
  category?: string;
  price?: string;
  quantity?: number;
  description?: string;
  lastUsage?: string;
  session?: string;
  sessionDate?: string;
  sessionDuration?: string;
  userName?: string;
}

interface ProductsTableProps {
  products: Product[];
  type: "products" | "knowledge-base" | "prompts" | "session-history";
  onEdit: (id: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  type,
}) => {
  const ordersColumns = ["Назва", "Категорія", "Ціна", "Кількість"];
  const knowledgeBaseColumns = ["Назва", "Категорія", "Ціна", "Опис"];
  const promptsColumns = ["Назва", "Категорія", "Ціна", "Останнє використання"];
  const sessionHistoryColumns = [
    "Дата/час",
    "Користувач",
    "Сесія",
    "Тривалість",
  ];

  const ordersData = products.map((product) => ({
    Назва: product.name,
    Категорія: product.category,
    Ціна: product.price,
    Кількість: product.quantity,
  }));

  const knowledgeBaseData = products.map((product) => ({
    Назва: product.name,
    Категорія: product.category,
    Ціна: product.price,
    Опис: product.description,
  }));
  const promptsData = products.map((product) => ({
    Назва: product.name,
    Категорія: product.category,
    Ціна: product.price,
    "Останнє використання": product.lastUsage,
  }));

  const sessionHistoryData = products.map((product) => ({
    "Дата/час": product.sessionDate,
    Користувач: product.userName,
    Сесія: product.session,
    Тривалість: product.sessionDuration,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        {type === "products" && (
          <img src={BoxDarkIcon.src} alt="box icon" width={38} height={38} />
        )}
        {type === "knowledge-base" && (
          <img src={DocDark.src} alt="doc icon" width={38} height={38} />
        )}
        {type === "prompts" && (
          <img src={DocsDark.src} alt="docs icon" width={38} height={38} />
        )}
        {type === "session-history" && (
          <img
            src={SessionDark.src}
            alt="session icon"
            width={38}
            height={38}
          />
        )}
        <h2 className={styles.title}>
          {type === "products" && "Товари"}
          {type === "knowledge-base" && "База знань"}
          {type === "prompts" && "Промпти"}
          {type === "session-history" && "Історія сесій"}
        </h2>
      </div>
      {type === "products" && (
        <Table columns={ordersColumns} data={ordersData} />
      )}
      {type === "knowledge-base" && (
        <Table columns={knowledgeBaseColumns} data={knowledgeBaseData} />
      )}
      {type === "prompts" && (
        <Table columns={promptsColumns} data={promptsData} />
      )}
      {type === "session-history" && (
        <Table columns={sessionHistoryColumns} data={sessionHistoryData} />
      )}
    </div>
  );
};
