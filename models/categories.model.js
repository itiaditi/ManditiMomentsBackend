const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Category name
  subCategories: [{ type: String, ref: "subcategories" }], // Array of subCategory IDs
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true } // Automatically add createdAt and updatedAt
});

const CategoryModel = mongoose.model("categories", categorySchema);

module.exports = {
  CategoryModel
};
