/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Correct path for Swiper modules in v7+
import styles from "../../../styles/styles";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://seller.orderzshop.com/wp-json/wc/v3/products/categories",
          {
            params: {
              per_page: 20,
              consumer_key: "ck_281d66cb1af4225a90c3c735f1c284b62ce7d7e8",
              consumer_secret: "cs_abf8f6b1783e631c17aa661ad09484fdf4717037",
            },
          }
        );

        // Organizing categories and subcategories
        const organizedCategories = response.data.reduce((acc, category) => {
          if (category.name !== "Uncategorized") {
            if (category.parent === 0) {
              // Only top-level categories
              acc.push({
                id: category.id,
                title: category.name,
                image_Url: category.image?.src || "default_image_url", // Placeholder image
                subcategories: [],
              });
            } else {
              // Subcategories
              const parentCategory = acc.find(
                (cat) => cat.id === category.parent
              );
              if (parentCategory) {
                parentCategory.subcategories.push({
                  id: category.id,
                  title: category.name,
                  image_Url: category.image?.src || "default_image_url", // Placeholder image
                });
              }
            }
          }
          return acc;
        }, []);

        setCategories(organizedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={`${styles.section} bg-white p-8 rounded-lg mb-12 shadow-lg`}
      id="categories">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Categories
      </h2>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3} // Number of visible slides
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]} // Correct modules import
        className="mySwiper">
        {categories.map((i) => {
          const handleSubmit = () => {
            window.location.href = `/products?category=${i.id}`; // Redirect to category page
          };

          return (
            <SwiperSlide key={i.id}>
              <div
                className="w-full h-[200px] flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                onClick={handleSubmit}>
                <img
                  src={i.image_Url}
                  className="w-[80px] h-[80px] object-cover mb-4 rounded-full border"
                  alt={i.title}
                />
                <h5 className="text-lg font-semibold text-gray-700 text-center">
                  {i.title}
                </h5>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Categories;
