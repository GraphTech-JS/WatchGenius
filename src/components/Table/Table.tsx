import React from "react";
import styles from "./Table.module.css";
import { DownloadIcon, EditIcon } from "../../../public/icons";

interface TableProps {
  columns: string[];
  data: Array<{ [key: string]: React.ReactNode }>;
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
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
          {data.map((row, index) => (
            <tr key={index} className={styles.tableRow}>
              {columns.map((col) => (
                <>
                  {col === "Кількість" ||
                  col === "Опис" ||
                  col === "Останнє використання" ? (
                    <>
                      <td key={col + index} className={styles.tableCell}>
                        <div className={styles.quantityCell}>
                          {row[col]}
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.editButton}
                              // onClick={() => onEdit(product.id)}
                              title="Редагувати"
                            >
                              <img src={EditIcon.src} alt="edit icon" />
                            </button>
                            <button
                              className={styles.downloadButton}
                              title="Завантажити"
                            >
                              <img src={DownloadIcon.src} alt="download icon" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <td key={col} className={styles.tableCell}>
                      {col === "Тривалість" ? (
                        <div className={styles.durationCell}>
                          {row[col]}
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.downloadButton}
                              title="Завантажити"
                            >
                              <img src={DownloadIcon.src} alt="download icon" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <> {row[col]}</>
                      )}
                    </td>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
