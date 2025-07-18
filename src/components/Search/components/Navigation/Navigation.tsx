import { useState } from "react";
import { ArrowLeftGrey, ArrowRightGrey } from "../../../../../public/icons";
import styles from "./Navigation.module.css";

interface NavigationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  totalPages,
  initialPage = 1,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageNumber} ${
            i === currentPage ? styles.active : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className={styles.navigation}>
      <button
        className={`${styles.arrow} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <img src={ArrowLeftGrey.src} alt="previous page" />
      </button>

      <div className={styles.pageNumbers}>{renderPageNumbers()}</div>

      <button
        className={`${styles.arrow} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <img src={ArrowRightGrey.src} alt="next page" />
      </button>
    </nav>
  );
};

export default Navigation;
