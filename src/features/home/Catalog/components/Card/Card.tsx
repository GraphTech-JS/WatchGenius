import React from "react";
import CardMock from "../../../../../../public/catalog-section/mock.jpg";
import styles from "./Card.module.css";
import Link from "next/link";
import { Button } from "@/components/Button/Button";

interface ICardProps {
  title: string;
  image: string;
  price: string | number;
  slug: string;
}

export const Card = ({ title, image, price, slug }: ICardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img
          src={image || CardMock.src}
          alt="card image"
          className={styles.cardImg}
        />
        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.cardPrice}>{price} грн</span>
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
