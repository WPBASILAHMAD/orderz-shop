/** @format */

const express = require("express");
const Variation = require("../model/variation");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new variation
router.post(
  "/create",
  catchAsyncErrors(async (req, res, next) => {
    const { productId, attributes, price, stock } = req.body;

    const newVariation = await Variation.create({
      productId,
      attributes,
      price,
      stock,
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

    const variations = await Variation.find({ productId }).populate(
      "attributes.attributeId"
    );

    if (!variations) {
      return next(new ErrorHandler("No variations found", 404));
    }

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
    const { attributes, price, stock } = req.body;

    const updatedVariation = await Variation.findByIdAndUpdate(
      id,
      {
        attributes,
        price,
        stock,
      },
      { new: true, runValidators: true }
    );

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
