import React from "react";
import { Hero } from "./Hero/Hero";
import { Market } from "./Market/Market";
import { Trending } from "./Trending/Trending";
import { BestPrice } from "./BestPrice/BestPrice";
import { BrandSpotlight } from "./BrandSpotlight/BrandSpotlight";
import { HowTo } from "./HowTo/Howto";
import { Dealers } from "./Dealers/Dealers";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Market />
      <Trending />
      <BestPrice />
      <BrandSpotlight />
      <HowTo />
      <Dealers />
    </>
  );
};

export default HomePage;
