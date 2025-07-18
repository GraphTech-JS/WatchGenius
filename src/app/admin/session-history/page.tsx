import { AdminLayout } from "@/app/layout/AdminLayout/AdminLayout";
import styles from "../admin.module.css";
import { ProductsTable } from "@/app/components/ProductsTable/ProductsTable";

export default function AdminPrompts() {
  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <ProductsTable
            type="session-history"
            products={[
              {
                id: "235",
                userName: "user",
                session: "7 пошуків",
                sessionDate: "30.06.2025",
                sessionDuration: "30 хвилин",
              },
              {
                id: "2356",
                userName: "user",
                session: "7 пошуків",
                sessionDate: "30.06.2025",
                sessionDuration: "30 хвилин",
              },
              {
                id: "2357",
                userName: "user",
                session: "7 пошуків",
                sessionDate: "30.06.2025",
                sessionDuration: "30 хвилин",
              },
              {
                id: "2358",
                userName: "user",
                session: "7 пошуків",
                sessionDate: "30.06.2025",
                sessionDuration: "30 хвилин",
              },
            ]}
            onEdit={() => {}}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
