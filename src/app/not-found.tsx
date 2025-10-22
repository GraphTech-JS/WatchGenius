"use client";
import React from "react";
import styles from "./not-found.module.css";
import { WatchBg } from "../../public/not-found";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";

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
                </p>{" "}
                <Button
                  variant="solid"
                  bgColor="#fff"
                  color="#000"
                  classNames={`${styles.notFoundBtn} ${styles.notFoundBtnBack}`}
                  onClick={goBack}
                >
                  Назад
                </Button>
                {/* <Button
              variant="text"
              classNames={`${styles.notFoundBtn} ${styles.notFoundBtnChat}`}
            >
              <Link href="/chat"> Відкрити чат з AI агентом</Link>
            </Button> */}
              </div>

              <img
                src={WatchBg.src}
                alt="watch background"
                className={styles.notFoundWatchIcon}
              />
            </div>
          </div>
        </section>
      </main>
    </body>
  );
};

export default NotFound;
