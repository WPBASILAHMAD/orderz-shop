/** @format */

const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // assuming you have a Product model
    required: true,
  },
  attributes: [
    {
      attributeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute", // Reference to the Attribute model
        required: true,
      },
      value: {
        type: String, // This stores the option value from the attribute
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Variation = mongoose.model("Variation", variationSchema);
module.exports = Variation;
