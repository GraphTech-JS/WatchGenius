'use client';

import React from 'react';
import styles from './Table.module.css';

interface TableProps {
  columns: string[];
  /** Каждая строка обязана иметь id:string */
  data: Array<{ [key: string]: React.ReactNode; id: string }>;
  /** Коллбэк нажатия «Редагувати» */
  onEdit?: (id: string) => void;
  /** Коллбэк нажатия «Завантажити» */
  onDownload?: (id: string) => void;
  /** Коллбэк нажатия «Видалити» */
  onDelete?: (id: string) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  onEdit,
  onDownload,
  onDelete,
}) => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className={styles.tableHeader}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const rowKey = row.id;
          return (
            <tr key={rowKey} className={styles.tableRow}>
              {columns.map((col) => {
                const cellKey = `${rowKey}-${col}`;
                const value = row[col];

                if (
                  col === 'Кількість' ||
                  col === 'Опис' ||
                  col === 'Останнє використання'
                ) {
                  return (
                    <td key={cellKey} className={styles.tableCell}>
                      <div className={styles.quantityCell}>
                        {value}
                        <div className={styles.actionButtons}>
                          {onEdit && (
                            <button
                              onClick={() => onEdit(rowKey)}
                              className={styles.editButton}
                              title='Редагувати'
                            ></button>
                          )}
                          {onDownload && (
                            <button
                              onClick={() => onDownload(rowKey)}
                              className={styles.downloadButton}
                              title='Завантажити'
                            ></button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(rowKey)}
                              className={styles.deleteButton}
                              title='Видалити'
                            ></button>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                }

                if (col === 'Тривалість') {
                  return (
                    <td key={cellKey} className={styles.tableCell}>
                      <div className={styles.durationCell}>
                        {value}
                        <div className={styles.actionButtons}>
                          {onDownload && (
                            <button
                              onClick={() => onDownload(rowKey)}
                              className={styles.downloadButton}
                              title='Завантажити'
                            ></button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(rowKey)}
                              className={styles.deleteButton}
                              title='Видалити'
                            ></button>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                }

                return (
                  <td key={cellKey} className={styles.tableCell}>
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
