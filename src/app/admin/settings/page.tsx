import styles from "../admin.module.css";
import React from "react";
import { SettingsDark } from "../../../../public/icons";
import { AdminLayout } from "@/components/Main/AdminLayout/AdminLayout";
import { Button } from "@/components/Button/Button";

const Settings = () => {
  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardTitleSection}>
            <img
              src={SettingsDark.src}
              alt="settings icon"
              width={38}
              height={38}
            />
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
