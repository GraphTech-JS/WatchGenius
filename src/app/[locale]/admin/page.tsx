"use client";

import React from "react";

import styles from "./admin.module.css";
import { AdminLayout } from "@/components/Main/AdminLayout/AdminLayout";
import { ProductsTable } from "@/components/ProductsTable/ProductsTable";

export default function AdminProducts() {
  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <ProductsTable
            type="products"
            products={[
              {
                id: "235",
                name: "Найменування",
                category: "Категорія",
                price: "1 204 грн",
                quantity: 30,
              },
              {
                id: "2354",
                name: "Найменування",
                category: "Категорія",
                price: "1 204 грн",
                quantity: 30,
              },
              {
                id: "2356",
                name: "Найменування",
                category: "Категорія",
                price: "1 204 грн",
                quantity: 30,
              },
              {
                id: "2357",
                name: "Найменування",
                category: "Категорія",
                price: "1 204 грн",
                quantity: 30,
              },
            ]}
            onEdit={() => {}}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
