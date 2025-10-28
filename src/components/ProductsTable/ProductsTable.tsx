// src/components/ProductsTable/ProductsTable.tsx

'use client';
import React from 'react';
import { Table } from '../Table/Table';
import styles from './ProductsTable.module.css';
// import {
//   BoxDarkIcon,
//   DocDark,
//   DocsDark,
//   SessionDark,
// } from "../../../public/icons";
import { Button } from '../Button/Button';
import { Plus } from 'lucide-react';
import { IProduct } from '@/types/product';

interface ProductsTableProps {
  products: IProduct[];
  type: 'products' | 'knowledge-base' | 'prompts' | 'session-history';
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  type,
  onAdd,
  onEdit,
  onDownload,
  onDelete,
}) => {
  const showAdd = ['products', 'knowledge-base', 'prompts'].includes(type);

  // Определяем колонки
  const ordersCols = ['Назва', 'Категорія', 'Ціна', 'Кількість'];
  const kbCols = ['Назва', 'Категорія', 'Ціна', 'Опис'];
  const promptCols = ['Назва', 'Категорія', 'Ціна', 'Останнє використання'];
  const sessCols = ['Дата/час', 'Користувач', 'Сесія', 'Тривалість'];

  // Мапим данные, обязательно передаём id:string
  const ordersData = products.map((p) => ({
    id: p.id!,
    Назва: p.name,
    Категорія: p.category,
    Ціна: p.price,
    Кількість: p.quantity,
  }));
  const kbData = products.map((p) => ({
    id: p.id!,
    Назва: p.name,
    Категорія: p.category,
    Ціна: p.price,
    Опис: p.description,
  }));
  const promptData = products.map((p) => ({
    id: p.id!,
    Назва: p.name,
    Категорія: p.category,
    Ціна: p.price,
    'Останнє використання': p.lastUsage,
  }));
  const sessData = products.map((p) => ({
    id: p.id!,
    'Дата/час': p.sessionDate,
    Користувач: p.userName,
    Сесія: p.session,
    Тривалість: p.sessionDuration,
  }));

  return (
    <div className={styles.container}>
      <div className='flex justify-between items-center mb-2'>
        <div className={styles.titleSection}>
          {/* {type === "products" && (
            <img src={BoxDarkIcon.src} alt="" className={styles.icon} />
          )}
          {type === "knowledge-base" && (
            <img src={DocDark.src} alt="" className={styles.icon} />
          )}
          {type === "prompts" && (
            <img src={DocsDark.src} alt="" className={styles.icon} />
          )}
          {type === "session-history" && (
            <img src={SessionDark.src} alt="" className={styles.icon} />
          )} */}
          <h2 className={styles.title}>
            {type === 'products' && 'Товари'}
            {type === 'knowledge-base' && 'База знань'}
            {type === 'prompts' && 'Промпти'}
            {type === 'session-history' && 'Історія сесій'}
          </h2>
        </div>

        {showAdd && onAdd && (
          <Button onClick={onAdd}>
            <Plus size={16} />
          </Button>
        )}
      </div>

      <div className={styles.tableContainer}>
        {type === 'products' && (
          <Table
            columns={ordersCols}
            data={ordersData}
            onEdit={onEdit}
            onDownload={onDownload}
          />
        )}
        {type === 'knowledge-base' && (
          <Table
            columns={kbCols}
            data={kbData}
            onEdit={onEdit}
            onDownload={onDownload}
          />
        )}
        {type === 'prompts' && (
          <Table
            columns={promptCols}
            data={promptData}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {type === 'session-history' && (
          <Table columns={sessCols} data={sessData} onDownload={onDownload} />
        )}
      </div>
    </div>
  );
};
