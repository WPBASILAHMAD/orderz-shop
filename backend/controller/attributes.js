/** @format */

const express = require("express");
const Attribute = require("../model/attributes");
const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new attribute
router.post(
  "/create",
  catchAsyncErrors(async (req, res, next) => {
    const { name, options, shopId } = req.body;

    // Validate shop ID
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    }

    // Create new attribute
    const newAttribute = await Attribute.create({
      name,
      options,
      shop: shopId,
    });

    res.status(201).json({
      success: true,
      attribute: newAttribute,
    });
  })
);

// Fetch all attributes
// Fetch all attributes for a specific shop
router.get(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    const { shopId } = req.query; // Get shopId from query parameters

    // If shopId is provided, fetch attributes for that shop
    const query = shopId ? { shop: shopId } : {}; // Query to filter by shopId

    const attributes = await Attribute.find(query).populate("shop");
    res.status(200).json({
      success: true,
      attributes,
    });
  })
);

// Update an attribute by ID
router.put(
  "/update/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, options, shopId } = req.body;

    // Validate shop ID
    if (shopId) {
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }
    }

    // Find and update the attribute
    const updatedAttribute = await Attribute.findByIdAndUpdate(
      id,
      {
        name,
        options,
        shop: shopId,
      },
      { new: true, runValidators: true }
    ).populate("shop");

    if (!updatedAttribute) {
      return next(new ErrorHandler("Attribute not found", 404));
    }

    res.status(200).json({
      success: true,
      attribute: updatedAttribute,
    });
  })
);

// Delete an attribute by ID
router.delete(
  "/delete/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const deletedAttribute = await Attribute.findByIdAndDelete(id);

    if (!deletedAttribute) {
      return next(new ErrorHandler("Attribute not found", 404));
    }

    // Optionally, ensure that the deleted attribute belongs to the current shop
    // if (deletedAttribute.shop.toString() !== req.body.shopId) {
    //   return next(new ErrorHandler("Not authorized to delete this attribute", 403));
    // }

    res.status(200).json({
      success: true,
      message: "Attribute deleted successfully",
    });
  })
);


module.exports = router;
