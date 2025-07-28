import React from "react";
import styles from "./Card.module.css";
import { Button } from "@/components/Button/Button";
import { StarDarkIcon } from "../../../../../../public/icons";
import { ThemedText } from "@/components/ThemedText/ThemedText";
import { Watch } from "@/types";
import { useGetWatchById } from "@/hooks/useGetWatchById";
import { useRouter } from "next/navigation";

interface ICardProps {
  item: Watch;
}

export const Card = ({ item }: ICardProps) => {
  const { name, model, image_url, id } = item;
  const router = useRouter();
  const { data: detailedWatch, isLoading } = useGetWatchById(id);

  const latestPrice =
    detailedWatch?.price_history?.length &&
    [...detailedWatch.price_history].sort(
      (a, b) =>
        new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
    )[0]?.price;

  const price = latestPrice
    ? `${latestPrice.toLocaleString()} грн`
    : "Невідомо";

  const sortedPrices = detailedWatch?.price_history
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
    );

  const latest = sortedPrices?.[0]?.price;
  const previous = sortedPrices?.[1]?.price;

  const changePercent =
    latest && previous
      ? Number((((latest - previous) / previous) * 100).toFixed(2))
      : 0;

  const title = name || model || "Невідомий годинник";
  const image = image_url?.trim() ? image_url : "/catalog-section/mock.jpg";

  const isPositive = changePercent !== undefined && changePercent > 0;
  const isNegative = changePercent !== undefined && changePercent < 0;
  const changeColor = isPositive
    ? "#00D26AF4"
    : isNegative
    ? "#d32f2f"
    : "#9e9e9e";

  const arrow = isPositive ? "↑" : isNegative ? "↓" : "";
  // перехід на сторінку товару за ID
  const handleClick = () => {
    router.push(`/product/${id}`);
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img src={image} alt="card image" className={styles.cardImg} />
        <div className={styles.cardElement}>
          <img
            src={StarDarkIcon.src}
            alt="star icon"
            className={styles.cardElementStarIcon}
          />
          <span className={styles.cardElementText}>Надійний бренд</span>
        </div>
        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardPriceWrapper}>
            <span className={styles.cardPrice}>
              {isLoading ? "Завантаження..." : price}
            </span>
            {changePercent !== 0 && (
              <ThemedText
                type="empty"
                className=" font-sfmono font-semibold text-[20px]"
                style={{ color: changeColor }}
              >
                {arrow} {Math.abs(changePercent)} %
              </ThemedText>
            )}
          </div>
        </div>

        <Button
          variant="solid"
          classNames={styles.cardBtn}
          onClick={handleClick}
        >
          Дізнатись більше
        </Button>
      </div>
    </div>
  );
};
