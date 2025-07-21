import { AdminLayout } from "@/components/Main/AdminLayout/AdminLayout";
import styles from "../admin.module.css";
import { ProductsTable } from "@/components/ProductsTable/ProductsTable";

export default function AdminPrompts() {
  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <ProductsTable
            type="prompts"
            products={[
              {
                id: "235",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                lastUsage: "30.06.2025",
              },
              {
                id: "2354",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                lastUsage: "30.06.2025",
              },
              {
                id: "2356",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                lastUsage: "30.06.2025",
              },
              {
                id: "2357",
                name: "Найменування",
                category: "Годинник",
                price: "1 204 грн",
                quantity: 30,
                lastUsage: "30.06.2025",
              },
            ]}
            onEdit={() => {}}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
