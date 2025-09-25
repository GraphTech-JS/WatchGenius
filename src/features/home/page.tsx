import React from "react";
import { Hero } from "./Hero/Hero";
import { Market } from "./Market/Market";
import { Trending } from "./Trending/Trending";
// import { TopBrands } from "./TopBrands/TopBrands";
// import { Catalog } from "./Catalog/Catalog";
// import { Banner } from "@/components/Banner/Banner";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Market />
      <Trending />
      {/*<Watch />
      <TopBrands />
      <Catalog />
      <Banner /> */}
    </>
  );
};

export default HomePage;
