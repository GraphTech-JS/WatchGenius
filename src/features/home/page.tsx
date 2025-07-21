import React from "react";
import { Hero } from "./Hero/Hero";
import { About } from "./About/About";
import { Watch } from "./Watch/Watch";
import { TopBrands } from "./TopBrands/TopBrands";
import { Catalog } from "./Catalog/Catalog";
import { Banner } from "@/components/Banner/Banner";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Watch />
      <TopBrands />
      <Catalog />
      <Banner />
    </>
  );
};

export default HomePage;
