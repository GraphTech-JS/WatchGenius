import styles from "../admin.module.css";
import React from "react";
import { AdminLayout } from "@/components/Main/AdminLayout/AdminLayout";
import { Button } from "@/components/Button/Button";

const Settings = () => {
  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <div className={styles.dashboardTitleSection}>
           
            <h2 className={styles.dashboardTitle}>Налаштування</h2>
          </div>
          <div className={styles.dashboardButtons}>
            <Button variant="outline" classNames={styles.dashboardButton}>
              Аналітика
            </Button>
            <Button variant="outline" classNames={styles.dashboardButton}>
              Замовлення
            </Button>
            <Button variant="outline" classNames={styles.dashboardButton}>
              АІ агент
            </Button>
            <Button variant="outline" classNames={styles.dashboardButton}>
              Товари
            </Button>
            <Button variant="outline" classNames={styles.dashboardButton}>
              Клієнти
            </Button>
            <Button variant="outline" classNames={styles.dashboardButton}>
              Права доступу
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
