import { AdminLayout } from "@/app/layout/AdminLayout/AdminLayout";
import styles from "../admin.module.css";
import { ProductsTable } from "@/app/components/ProductsTable/ProductsTable";

export default function AdminKnowledgeBase() {
  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <ProductsTable
            type="knowledge-base"
            products={[
              {
                id: "235",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                description: "Класичний го...",
              },
              {
                id: "2354",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                description: "Класичний го...",
              },
              {
                id: "2356",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                description: "Класичний го...",
              },
              {
                id: "2357",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                description: "Класичний го...",
              },
            ]}
            onEdit={() => {}}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
