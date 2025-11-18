'use client';
import React, { useState } from 'react';
import { AdminLayout } from '@/components/Main/AdminLayout/AdminLayout';
import { ProductsTable } from '@/components/ProductsTable/ProductsTable';
import { ProductForm } from '@/features/admin/ProductForm';
import type { IProduct } from '@/types/product';
import styles from '../admin.module.css';
import Modal from '@/components/Modal';

export default function AdminPrompts() {
  const [items, setItems] = useState<IProduct[]>([
    {
      id: '235',
      name: 'Найменування',
      category: 'Годинник',
      price: '1 204 грн',
      lastUsage: '30.06.2025',
    },
    {
      id: '2354',
      name: 'Найменування',
      category: 'Годинник',
      price: '1 204 грн',
      lastUsage: '30.06.2025',
    },
    {
      id: '2356',
      name: 'Найменування',
      category: 'Годинник',
      price: '1 204 грн',
      lastUsage: '30.06.2025',
    },
    {
      id: '2357',
      name: 'Найменування',
      category: 'Годинник',
      price: '1 204 грн',
      lastUsage: '30.06.2025',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [currentItem, setCurrent] = useState<IProduct | null>(null);

  const handleAdd = () => {
    setFormMode('add');
    setCurrent(null);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const found = items.find((i) => i.id === id) || null;
    setFormMode('edit');
    setCurrent(found);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  const handleFormSubmit = (data: IProduct) => {
    if (formMode === 'add') {
      setItems((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    } else {
      setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <ProductsTable
            type='prompts'
            products={items}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <Modal
          isOpen={modalOpen}
          title={formMode === 'add' ? 'Додати промпт' : 'Редагувати промпт'}
          onClose={handleClose}
        >
          <ProductForm
            type='prompts'
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
