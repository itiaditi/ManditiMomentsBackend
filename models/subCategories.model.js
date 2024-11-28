const subCategorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true, ref: "categories" }, // Reference to the parent category
    name: { type: String, required: true, unique: true }, // Sub-category name
    products: [{ type: String, ref: "products" }], // Array of product IDs
  }, {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true } // Automatically add createdAt and updatedAt
  });
  
  const SubCategoryModel = mongoose.model("subcategories", subCategorySchema);
  
  module.exports = {
    SubCategoryModel
  };
  