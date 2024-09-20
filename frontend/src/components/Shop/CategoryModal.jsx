/** @format */

import React, { useState } from "react";
import Modal from "react-modal";
import { categoriesData } from "../../static/data";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

const CategoryModal = ({ isOpen, onRequestClose, setCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState(""); // Add this line

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSubcategory = (subcategoryId) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  // In the CategoryModal component
  const handleSave = () => {
    const selectedTitles = categoriesData
      .filter((category) => selectedCategories.includes(category.id))
      .map((category) => category.title);

    const selectedSubtitles = categoriesData
      .flatMap((category) => category.subcategories)
      .filter((sub) => selectedSubcategories.includes(sub.id))
      .map((sub) => sub.title);

    const finalCategories = selectedTitles.join(", ");
    const finalSubcategories = selectedSubtitles.join(", ");

    // Pass both categories and subcategories
    setCategory({
      categories: finalCategories,
      subcategories: finalSubcategories,
    });
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}>
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>
        Select Categories
      </h2>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {categoriesData.map((category) => (
          <div key={category.id} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
              />
              {category.title}
            </label>
            {category.subcategories.length > 0 && (
              <div style={{ marginLeft: "20px" }}>
                {category.subcategories.map((sub) => (
                  <label key={sub.id} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub.id)}
                      onChange={() => toggleSubcategory(sub.id)}
                    />
                    {sub.title}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}>
        <button onClick={handleSave} style={{ padding: "5px 10px" }}>
          Save
        </button>
        <button onClick={onRequestClose} style={{ padding: "5px 10px" }}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default CategoryModal;
