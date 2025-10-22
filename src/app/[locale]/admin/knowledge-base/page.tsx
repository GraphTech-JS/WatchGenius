// src/pages/admin/knowledge-base.tsx
"use client";
import React, { useState } from "react";
import { AdminLayout } from "@/components/Main/AdminLayout/AdminLayout";
import { ProductsTable } from "@/components/ProductsTable/ProductsTable";
import { ProductForm } from "@/features/admin/ProductForm";
import type { IProduct } from "@/types/product";
import styles from "../admin.module.css";
import Modal from "@/components/Modal";

export default function AdminKnowledgeBase() {
  // 1. стейт записей
  const [items, setItems] = useState<IProduct[]>([
    {
      id: "235",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      description: "Класичний годинник з...",
    },
    {
      id: "2354",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      description: "Класичний годинник з...",
    },
    {
      id: "2356",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      description: "Класичний годинник з...",
    },
    {
      id: "2357",
      name: "Найменування",
      category: "Годинник",
      price: "1 204 грн",
      description: "Класичний годинник з...",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [currentItem, setCurrent] = useState<IProduct | null>(null);

  // 2. добавить
  const handleAdd = () => {
    setFormMode("add");
    setCurrent(null);
    setModalOpen(true);
  };

  // 3. редактировать
  const handleEdit = (id: string) => {
    const found = items.find((i) => i.id === id) || null;
    setFormMode("edit");
    setCurrent(found);
    setModalOpen(true);
  };

  // закрыть модалку
  const handleClose = () => setModalOpen(false);

  // сабмит формы
  const handleFormSubmit = (data: IProduct) => {
    if (formMode === "add") {
      setItems((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    } else {
      setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
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
            type="knowledge-base"
            products={items}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDownload={handleDownload}
          />
        </div>

        <Modal
          isOpen={modalOpen}
          title={formMode === "add" ? "Додати запис" : "Редагувати запис"}
          onClose={handleClose}
        >
          <ProductForm
            type="knowledge-base"
            mode={formMode}
            initial={currentItem || undefined}
            onSubmit={handleFormSubmit}
            onCancel={handleClose}
          />
        </Modal>
      </div>
    </AdminLayout>
  );
}
