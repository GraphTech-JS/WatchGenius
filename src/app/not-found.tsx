'use client';
import React from 'react';
import Image from 'next/image';
import styles from './not-found.module.css';
import { WatchBg } from '../../public/not-found';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button/Button';

const NotFound = () => {
  const { back } = useRouter();

  const goBack = () => {
    back();
  };
  return (
    <body>
      <main>
        <section className={styles.notFound}>
          <div className={styles.notFoundContainer}>
            <div className={styles.notFoundContent}>
              <div className={styles.notFoundText}>
                <h1 className={styles.notFoundTitle}>404</h1>
                <p className={styles.notFoundDescription}>
                  Сторінку, яку ви шукаєте, не знайдено. Можливо, вона вже
                  зникла, змінила адресу або ніколи не існувала.
                </p>
                <Button
                  variant='solid'
                  bgColor='#04694f'
                  color='#fff'
                  classNames={styles.notFoundBtn}
                  onClick={goBack}
                >
                  Назад
                </Button>
              </div>

              <Image
                src={WatchBg}
                alt='watch background'
                className={styles.notFoundWatchIcon}
                fill
                priority
              />
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default NotFound;
