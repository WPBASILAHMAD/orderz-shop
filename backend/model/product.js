/** @format */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  subcategory: {
    // New field for subcategories
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: [true, "Product type is a required field!"],
    default: "simple",
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  discountPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  shippingCost: {
    type: Number,
    default: 0, // Default shipping cost is 0
  },
  isFreeShipping: {
    type: Boolean,
    default: false, // Default isFreeShipping is false
  },
  variations: [
    {
      stock: { type: Number, required: false },
      price: { type: Number, required: false },
      sku: { type: String, required: false },
      // Add any other fields you need for variations
    },
  ],

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  attributes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute", // Reference to the Attribute model
    },
  ],
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
