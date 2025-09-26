import React from "react";
import { Hero } from "./Hero/Hero";
import { Market } from "./Market/Market";
import { Trending } from "./Trending/Trending";
import { BestPrice } from "./BestPrice/BestPrice";
// import { TopBrands } from "./TopBrands/TopBrands";
// import { Catalog } from "./Catalog/Catalog";
// import { Banner } from "@/components/Banner/Banner";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Market />
      <Trending />
      <BestPrice />
      {/*<Watch />
      <TopBrands />
      <Catalog />
      <Banner /> */}
    </>
  );
};

export default HomePage;
