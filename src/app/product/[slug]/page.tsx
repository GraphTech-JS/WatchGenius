"use client";
// import React, { useEffect, useState } from "react";
// import styles from "./page.module.css";
// import { useParams, useRouter } from "next/navigation";
// import MockWatch from "../../../../public/catalog-section/mock.png";
// import { Button } from "@/components/Button/Button";
// import { CustomAreaChart } from "@/components/Chart/AreaChart/AreaChart";
// import Link from "next/link";
// import { ArrowRight } from "../../../../public/icons";
// import { ThemedText } from "@/components/ThemedText/ThemedText";
// import { Indicators } from "@/features/home/Indicators/Indicators";
// import { Star } from "../../../../public/icons";
// import { threeMonthDataMock, yearDataMock } from "@/mock/data";
// import ProductDetails from "@/features/product/ProductDetails";
// import { FloatingButton } from "@/components/FloatingButton";
// // import { mockData } from "@/mock/watch";
// import { IWatch } from "@/interfaces";

const Product = () => {
  // const { back } = useRouter();
  // const params = useParams();
  // const [product, setProduct] = useState<IWatch | null>(null);
  // const productSlug = params.slug;
  // useEffect(() => {
  //   const foundProduct = mockData.find((item) => item.slug === productSlug);
  //   if (foundProduct) {
  //     setProduct(foundProduct);
  //   }
  // }, [productSlug]);
  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  // const priceChangePercent: number = product.changePercent;
  // const isPositive = priceChangePercent > 0;
  // const isNegative = priceChangePercent < 0;
  // const arrow = isPositive ? "↑" : isNegative ? "↓" : "";
  // const changeColor = isPositive
  //   ? "#00c853"
  //   : isNegative
  //   ? "#d32f2f"
  //   : "#9e9e9e";

  return (
    <>
      {/* <div className={styles.productContainer}>
        <div className={styles.productBreadcrumbs} onClick={back}>
          <img src={ArrowRight.src} alt="back to page" />
          Назад
        </div>
        <div className={styles.productContent}>
          <div className={styles.productLeft}>
            <picture>
              <source media="(max-width: 640px)" srcSet={MockWatch.src} />
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImg}
              />
            </picture>
          </div>
          <div className={styles.cardElement}>
            <img
              src={Star.src}
              alt="star icon"
              className={styles.cardElementStarIcon}
            />
            <span className={styles.cardElementText}>Надійний бренд</span>
          </div>
          <div className={styles.productRight}>
            <div className={styles.productText}>
              <ThemedText type="h2">{product.title}</ThemedText>
              <ProductDetails
                data={[
                  { label: "Матеріал", value: product.material },
                  { label: "Калібр", value: `${product.caliber}` },
                  { label: "Рік", value: product.releaseYear },
                  { label: "Діаметр", value: `${product.diameter} mm` },
                  { label: "Стан", value: `${product.diameter} mm` },
                  {
                    label: "Водонепроникність",
                    value: product.waterResistance,
                  },
                  { label: "Механізм", value: product.movement },
                ]}
              />
              <Link href="/chat" prefetch={false}>
                <ThemedText className=" text-start underline text-[#A8A6A6]">
                  Не знайшли параметр? Напишіть в чат
                </ThemedText>
              </Link>
            </div>

            <div className={styles.productPrice}>
              <div className={styles.productPriceWrapper}>
                <ThemedText type="h2" className="text-nowrap">
                  {product.price} грн
                </ThemedText>
                {priceChangePercent !== 0 && (
                  <span
                    className={styles.productPriceChange}
                    style={{ color: changeColor }}
                  >
                    {arrow} {Math.abs(priceChangePercent)} %
                  </span>
                )}
              </div>

              <FloatingButton
                watchedIds={["ai-agent", "footer"]}
                safeOffset={20}
                initialOffsetPercent={0.02}
                extraOffset={0}
                className="sm:static"
              >
                {({ bottom }) => (
                  <Button
                    variant="solid"
                    classNames={styles.productPriceBtn}
                    style={{ bottom }}
                  >
                    Купити в Chrono24
                  </Button>
                )}
              </FloatingButton>
            </div>
          </div>
        </div>
        <div className={styles.productGraph}>
          <ThemedText type="h2">Графік цін</ThemedText>
          <div className={styles.productGraphSection}>
            <div className={styles.productGraphChart}>
              <CustomAreaChart
                controls
                yearData={yearDataMock}
                threeMonthData={threeMonthDataMock}
                variant="area"
              />
            </div>

            <Button
              variant="text"
              color="#000"
              classNames={styles.productPDFBtn}
            >
              <Link href="#">Завантажити PDF-гайд</Link>
            </Button>
          </div>
        </div>
        <Indicators />
      </div> */}
    </>
  );
};

export default Product;
