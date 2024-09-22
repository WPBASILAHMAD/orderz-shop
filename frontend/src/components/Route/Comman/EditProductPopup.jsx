/** @format */

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { categoriesData } from "../../../static/data";

const EditProductPopup = ({ isOpen, onClose, product, onConfirm }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory || "", // Ensure subcategory can be blank
    tags: product.tags,
    originalPrice: product.originalPrice,
    discountPrice: product.discountPrice,
    stock: product.stock,
    shippingCost: product.shippingCost,
    isFreeShipping: product.isFreeShipping || false,
    images: product.images || [],
  });

  const [imagesPreview, setImagesPreview] = useState(product.images || []);

  useEffect(() => {
    // Update form when product changes
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory || "",
      tags: product.tags,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      stock: product.stock,
      shippingCost: product.shippingCost,
      isFreeShipping: product.isFreeShipping || false,
      images: product.images || [],
    });
    setImagesPreview(product.images || []);
  }, [product]);

  const handleInputChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);

    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          newImages.push(reader.result);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    setUpdatedProduct({ ...updatedProduct, images: newImages });
  };

  const handleSubmit = () => {
    onConfirm(updatedProduct);
  };

  const getSubcategories = () => {
    const selectedCategory = categoriesData.find(
      (cat) => cat.title === updatedProduct.category
    );
    return selectedCategory ? selectedCategory.subcategories : [];
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        {/* Name */}
        <TextField
          margin="dense"
          name="name"
          label="Product Name"
          value={updatedProduct.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
        {/* Description */}
        <TextField
          margin="dense"
          name="description"
          label="Product Description"
          value={updatedProduct.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          required
        />
        {/* Category */}
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={updatedProduct.category}
          onChange={handleInputChange}
          fullWidth
          required>
          {categoriesData.map((cat) => (
            <MenuItem key={cat.id} value={cat.title}>
              {cat.title}
            </MenuItem>
          ))}
        </Select>
        {/* Subcategory */}
        <InputLabel>Subcategory</InputLabel>
        <Select
          name="subcategory"
          value={updatedProduct.subcategory}
          onChange={handleInputChange}
          fullWidth
          disabled={!updatedProduct.category}>
          {getSubcategories().map((sub) => (
            <MenuItem key={sub.id} value={sub.title}>
              {sub.title}
            </MenuItem>
          ))}
        </Select>
        {/* Tags */}
        <TextField
          margin="dense"
          name="tags"
          label="Tags"
          value={updatedProduct.tags}
          onChange={handleInputChange}
          fullWidth
        />
        {/* Original Price */}
        <TextField
          margin="dense"
          name="originalPrice"
          label="Original Price"
          value={updatedProduct.originalPrice}
          onChange={handleInputChange}
          type="number"
          fullWidth
          required
        />
        {/* Discount Price */}
        <TextField
          margin="dense"
          name="discountPrice"
          label="Discount Price"
          value={updatedProduct.discountPrice}
          onChange={handleInputChange}
          type="number"
          fullWidth
        />
        {/* Stock */}
        <TextField
          margin="dense"
          name="stock"
          label="Stock"
          value={updatedProduct.stock}
          onChange={handleInputChange}
          type="number"
          fullWidth
          required
        />
        {/* Shipping Cost */}
        <TextField
          margin="dense"
          name="shippingCost"
          label="Shipping Cost"
          value={updatedProduct.shippingCost}
          onChange={handleInputChange}
          type="number"
          fullWidth
          disabled={updatedProduct.isFreeShipping}
        />
        {/* Free Shipping */}
        <FormControlLabel
          control={
            <Checkbox
              checked={updatedProduct.isFreeShipping}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  isFreeShipping: e.target.checked,
                })
              }
              name="isFreeShipping"
            />
          }
          label="Free Shipping"
        />
        {/* Image Upload */}
        <div>
          <label>Upload Images</label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {imagesPreview &&
              imagesPreview.map((img, index) => (
                <img
                  key={index}
                  src={img.url || img} // For both newly added and existing images
                  alt="Product"
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductPopup;
