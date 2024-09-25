/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const submitHandle = (category) => {
    navigate(`/products?category=${category.id}`);
    setDropDown(false);
    // window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-md shadow-md">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setActiveCategory(index)}
            onMouseLeave={() => setActiveCategory(null)}>
            <div
              className={`${styles.noramlFlex} cursor-pointer p-3 hover:bg-gray-100 transition`}
              onClick={() => submitHandle(category)}>
              <img
                src={category.image_Url}
                alt={category.title}
                className="w-6 h-6 object-contain mr-2"
              />
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            {activeCategory === index && category.subcategories.length > 0 && (
              <div className="absolute left-full top-0 bg-white w-40 rounded-md shadow-lg mt-1">
                {category.subcategories.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className={`${styles.noramlFlex} cursor-pointer p-2 hover:bg-gray-200 transition`}
                    onClick={() => submitHandle(sub)}>
                    <img
                      src={sub.image_Url}
                      alt={sub.title}
                      className="w-5 h-5 object-contain mr-2"
                    />
                    <h4 className="text-sm">{sub.title}</h4>
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
