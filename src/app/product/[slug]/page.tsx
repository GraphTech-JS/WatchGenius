"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import MockWatch from "../../../../public/catalog-section/mock.jpg";
import { ArrowLeftDark } from "../../../../public/icons";
import { Button } from "@/app/components/Button/Button";
import Link from "next/link";
import PieChart from "@/app/components/Chart/PieChart/PieChart";
import { CustomAreaChart } from "@/app/components/Chart/AreaChart/AreaChart";
import { ChatButton } from "@/app/components/Chat/components/ChatButton/ChatButton";
import { ChatMenu } from "@/app/components/Chat/ChatMenu";
import { MainContext } from "@/app/context";

const Product = () => {
  const { back } = useRouter();
  const { menuOpened, setMenuOpened } = useContext(MainContext);
  const handleOpening = () => {
    setMenuOpened(true);
  };
  return (
    <>
      <div className={styles.product}>
        <div className={styles.productContainer}>
          <div className={styles.productBreadcrumbs} onClick={back}>
            <img src={ArrowLeftDark.src} alt="back to page" />
            Назад
          </div>
          <div className={styles.productContent}>
            <div className={styles.productLeft}>
              <img
                src={MockWatch.src}
                alt="mock watch"
                className={styles.productImg}
              />
            </div>
            <div className={styles.productRight}>
              <div className={styles.productText}>
                <h2 className={styles.productTitle}>
                  Rolex Submariner Oyster Perpetual Date 41mm 126610LV-0002
                </h2>
                <div className={styles.productDescContent}>
                  <p className={styles.productDesc}>
                    Корпус: Нержавіюча сталь Oystersteel (сплав 904L)
                  </p>
                  <p className={styles.productDesc}>
                    Скло: Сапфірове з циклоп-лінзою над датою
                  </p>
                  <p className={styles.productDesc}>
                    Категорія: Дайверський годинник
                  </p>
                  <p className={styles.productDesc}>Діаметр: 41 мм</p>
                </div>
              </div>
              <div className={styles.productPrice}>
                <Button variant="solid" classNames={styles.productPriceBtn}>
                  Купити
                </Button>
                <span className={styles.productPriceText}>19 500 грн</span>
              </div>
            </div>
          </div>
          <div className={styles.productGraph}>
            <div className={styles.productGraphContent}>
              <div className={styles.productGraphText}>
                <h3 className={styles.productGraphTitle}>Графік цін</h3>
              </div>
              <div className={styles.productGraphSection}>
                <div className={styles.productGraphLeft}>
                  <div className={styles.productGraphChart}>
                    <CustomAreaChart
                      containerClassName={styles.productChartContainer}
                      controls={true}
                    />
                    <div className={styles.productGraphButtons}>
                      <Button
                        variant="solid"
                        classNames={styles.productGraphSwitchBtn}
                      >
                        1 рік
                      </Button>
                      <Button
                        variant="solid"
                        classNames={styles.productGraphSwitchBtn}
                      >
                        3 міс.
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="text"
                    color="#000"
                    classNames={styles.productPDFBtn}
                  >
                    <Link href="#">Завантажити PDF-гайд</Link>
                  </Button>
                </div>
                <div className={styles.productGraphRight}>
                  <p className={styles.productGraphSubtext}>
                    Продуктивність моделі: 80%
                  </p>
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className={styles.aiAgent}>
          <div className={styles.aiAgentContainer}>
            <h3 className={styles.aiAgentTitle}>АІ агент</h3>
            <p className={styles.aiAgentDesc}>
              Швидко, точно та без нав’язливих порад. Просто запитайте.
            </p>
            <Link href="/chat" prefetch={false} className={styles.aiAgentLink}>
              <Button
                variant="solid"
                color="#000"
                bgColor="#fff"
                classNames={styles.aiAgentBtn}
              >
                Перейти в чат
              </Button>
            </Link>
          </div>
        </section>
      </div>
      {menuOpened ? null : <ChatButton onClick={handleOpening} />}
      {menuOpened && <ChatMenu />}
    </>
  );
};

export default Product;
