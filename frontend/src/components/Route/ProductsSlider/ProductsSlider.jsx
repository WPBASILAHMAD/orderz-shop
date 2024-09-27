/** @format */

import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsSlider = () => {
  const { allProducts } = useSelector((state) => state.products);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of products visible at a time
    slidesToScroll: 1, // Number of products to scroll at once
    responsive: [
      {
        breakpoint: 1024, // Screen width below 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Screen width below 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Screen width below 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Featured Products</h1>
      </div>
      <Slider {...settings}>
        {allProducts &&
          allProducts.map((product, index) => (
            <div key={index} className="px-2">
              <ProductCard data={product} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ProductsSlider;
