/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Fetching categories...");

        const response = await axios.get(
          "https://seller.orderzshop.com/wp-json/wc/v3/products/categories",
          {
            params: {
              per_page: 20, // Adjust the number of categories per request
              consumer_key: "ck_281d66cb1af4225a90c3c735f1c284b62ce7d7e8",
              consumer_secret: "cs_abf8f6b1783e631c17aa661ad09484fdf4717037",
            },
          }
        );

        console.log("Fetched categories:", response.data);

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
        console.log("Finished fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Categories</h2>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <h3>{category.name}</h3>
            <img
              src={category.image?.src || "default_image_url"}
              alt={category.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
