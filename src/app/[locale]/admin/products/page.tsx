"use client";
import React, { useState } from "react";
import { AdminLayout } from "@/components/Main/AdminLayout/AdminLayout";
import { ProductsTable } from "@/components/ProductsTable/ProductsTable";
import styles from "../admin.module.css";
import Modal from "@/components/Modal";
import { ProductForm } from "@/features/admin/ProductForm";
import { IProduct } from "@/types/product";

export default function AdminProducts() {
  const [products, setProducts] = useState<IProduct[]>([
    {
      id: "235",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      quantity: 30,
    },
    {
      id: "2354",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      quantity: 30,
    },
    {
      id: "2356",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      quantity: 30,
    },
    {
      id: "2357",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      quantity: 30,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  const handleAdd = () => {
    setFormMode("add");
    setCurrentProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const prod = products.find((p) => p.id === id) || null;
    setFormMode("edit");
    setCurrentProduct(prod);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (data: IProduct) => {
    if (formMode === "add") {
      setProducts((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === data.id ? { ...p, ...data } : p))
      );
    }
    setModalOpen(false);
  };

  const handleDownload = (id: string) => {
    console.log("Скачать товар с id =", id);
  };

  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <ProductsTable
            type="products"
            products={products}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDownload={handleDownload}
          />
        </div>

        <Modal
          isOpen={modalOpen}
          title={formMode === "add" ? "Додати товар" : "Редагувати товар"}
          onClose={handleClose}
        >
          <ProductForm
            type="products"
            mode={formMode}
            initial={
              formMode === "edit" && currentProduct ? currentProduct : undefined
            }
            onSubmit={handleFormSubmit}
            onCancel={handleClose}
          />
        </Modal>
      </div>
    </AdminLayout>
  );
}
