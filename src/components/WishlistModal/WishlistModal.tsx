'use client';

import React from 'react';
import { useWishlistContext } from '@/context/WishlistContext';
import { WatchCard } from '@/features/catalog/components/CatalogGrid/WatchCard/WatchCard';
import { Modal } from '@/components/Modal';
import styles from './WishlistModal.module.css';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { wishlistItems, removeFromWishlist, isInWishlist } =
    useWishlistContext();

  const handleToggleLike = (id: string) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Список бажань'
      className={styles.wishlistModal}
    >
      <div className={styles.wishlistContent}>
        {wishlistItems.length === 0 ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyStateTitle}>Список бажань порожній</h3>
            <p className={styles.emptyStateDescription}>
              Додайте товари до списку бажань
            </p>
          </div>
        ) : (
          <div className='grid max-[375px]:gap-y-[17px] max-[375px]:gap-[17px] gap-[17px] gap-y-[25px] grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
            {wishlistItems.map((watch) => (
              <WatchCard
                key={watch.id}
                item={watch}
                liked={isInWishlist(watch.id)}
                onToggleLike={handleToggleLike}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
