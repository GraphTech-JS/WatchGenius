import React, { useState } from "react";
import CardMock from "../../../../../../public/catalog-section/mock.jpg";
import styles from "./Card.module.css";
import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { StarDarkIcon } from "../../../../../../public/icons";
import { ThemedText } from "@/components/ThemedText/ThemedText";

interface ICardProps {
  title: string;
  image: string;
  price: string | number;
  slug: string;
  changePercent: number;
}

export const Card = ({
  title,
  image,
  price,
  slug,
  changePercent,
}: ICardProps) => {
  const isPositive = changePercent !== undefined && changePercent > 0;
  const isNegative = changePercent !== undefined && changePercent < 0;
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const changeColor = isPositive
    ? "#00D26AF4"
    : isNegative
    ? "#d32f2f"
    : "#9e9e9e";

  const arrow = isPositive ? "↑" : isNegative ? "↓" : "";

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img
          src={image || CardMock.src}
          alt="card image"
          className={styles.cardImg}
        />
        <div className={styles.cardElement}>
          <img
            src={StarDarkIcon.src}
            alt="star icon"
            className={styles.cardElementStarIcon}
          />

          <span
            className={styles.cardElementText}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {hovered ? "80-100" : "Надійний бренд"}
          </span>
        </div>
        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardPriceWrapper}>
            <span className={styles.cardPrice}>{price} грн</span>
            {changePercent !== undefined && changePercent !== 0 && (
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
        <Link href={`/product/${slug}`} className={styles.cardLink}>
          <Button variant="solid" classNames={styles.cardBtn}>
            Дізнатись більше
          </Button>
        </Link>
      </div>
    </div>
  );
};
