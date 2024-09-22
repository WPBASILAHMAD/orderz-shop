/** @format */

const express = require("express");
const Variation = require("../model/variations");
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

// Create a new variation
router.post(
  "/create",
  catchAsyncErrors(async (req, res, next) => {
    const { productId, attributes, sku, stock, price } = req.body;

    // Validate product ID
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product Id is invalid!", 400));
    }

    // Create new variation
    const newVariation = await Variation.create({
      product: productId,
      attributes,
      sku,
      stock,
      price,
    });

    res.status(201).json({
      success: true,
      variation: newVariation,
    });
  })
);

// Fetch all variations for a specific product
router.get(
  "/:productId",
  catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.params;

    // Validate product ID
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product Id is invalid!", 400));
    }

    const variations = await Variation.find({ product: productId }).populate(
      "attributes.attribute"
    );
    res.status(200).json({
      success: true,
      variations,
    });
  })
);

// Update a variation by ID
router.put(
  "/update/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { attributes, sku, stock, price } = req.body;

    // Find and update the variation
    const updatedVariation = await Variation.findByIdAndUpdate(
      id,
      {
        attributes,
        sku,
        stock,
        price,
      },
      { new: true, runValidators: true }
    ).populate("attributes.attribute");

    if (!updatedVariation) {
      return next(new ErrorHandler("Variation not found", 404));
    }

    res.status(200).json({
      success: true,
      variation: updatedVariation,
    });
  })
);

// Delete a variation by ID
router.delete(
  "/delete/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const deletedVariation = await Variation.findByIdAndDelete(id);

    if (!deletedVariation) {
      return next(new ErrorHandler("Variation not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Variation deleted successfully",
    });
  })
);

module.exports = router;
