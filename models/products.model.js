const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  description: { type: String, required: true }, // Product description
  price: { type: Number, required: true, min: 0 }, // Price, must be non-negative
  categoryId: { type: String, required: true, ref: "categories" }, // Reference to the parent category
  subCategoryId: { type: String, required: true, ref: "subcategories" }, // Reference to the sub-category
  stock: { type: Number, required: true, min: 0 }, // Stock quantity, must be non-negative
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true } // Automatically add createdAt and updatedAt
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = {
  ProductModel
};
