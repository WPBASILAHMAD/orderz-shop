/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null); // Track the active parent category

  const submitHandle = (category) => {
    // Navigate to the selected category
    navigate(`/products?category=${category.id}`);
    setDropDown(false); // Close dropdown after navigation
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-md shadow-md">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setActiveCategory(index)} // Show subcategories on hover
            onMouseLeave={() => setActiveCategory(null)} // Hide subcategories when not hovering
          >
            {/* Parent Category */}
            <div
              className={`${styles.noramlFlex} cursor-pointer p-3 hover:bg-gray-100 transition`}
              onClick={() => submitHandle(category)} // Click to navigate
            >
              <img
                src={category.image_Url}
                alt={category.title}
                className="w-6 h-6 object-contain mr-2"
              />
              <h3 className="text-lg font-medium">{category.title}</h3>
              <IoIosArrowForward className="ml-auto" />{" "}
              {/* Optional arrow for indicating dropdown */}
            </div>

            {/* Subcategories */}
            {activeCategory === index && category.subcategories.length > 0 && (
              <div className="bg-gray-100">
                {category.subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="flex items-center pl-8 p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling up to the parent
                      submitHandle(subcategory); // Navigate to subcategory
                    }}>
                    <img
                      src={subcategory.image?.src || "default_image_url"} // Use default if no image
                      alt={subcategory.name}
                      className="w-4 h-4 object-contain mr-2" // Adjust size as needed
                    />
                    {subcategory.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default DropDown;
