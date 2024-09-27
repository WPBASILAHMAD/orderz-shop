/** @format */

import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Comman/VendorsAvatars";
import Branding from "../components/Route/Branding/Branding";
import Footer from "../components/Layout/Footer";
import VendorsAvatar from "./VendorsAvatar";
import ProductsSlider from "../components/Route/ProductsSlider/ProductsSlider";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <VendorsAvatar />
      <Categories />
      <ProductsSlider />
      <BestDeals />
      {/* <Events /> */}
      <FeaturedProduct />
      {/* <Branding /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
