/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { brandingData } from "../../../static/data"; // Assuming you want to keep branding data
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
            // Exclude "Uncategorized"
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
      className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
      id="categories">
      <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
        {categories.map((i) => {
          const handleSubmit = () => {
            window.location.href = `/products?category=${i.id}`; // Refresh the page
          };
          return (
            <div
              className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
              key={i.id}
              onClick={handleSubmit}>
              <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
              <img
                src={i.image_Url}
                className="w-[120px] object-cover"
                alt={i.title} // Better alt text
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
