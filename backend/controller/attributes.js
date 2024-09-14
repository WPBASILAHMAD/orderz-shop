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
    try {
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
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Fetch all attributes
router.get(
  "/",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const attributes = await Attribute.find().populate("shop");
      res.status(200).json({
        success: true,
        attributes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Update an attribute by ID
router.put(
  "/update/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
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
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete an attribute by ID
router.delete(
  "/delete/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedAttribute = await Attribute.findByIdAndDelete(id);

      if (!deletedAttribute) {
        return next(new ErrorHandler("Attribute not found", 404));
      }

      res.status(200).json({
        success: true,
        message: "Attribute deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
