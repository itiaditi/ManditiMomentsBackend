const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  addedAt: { type: Date, required: true, default: Date.now }
}, { _id: false }); // Disable _id for the embedded product document

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "users" }, // Reference to the user
  products: [productSchema] // Array of product documents
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true } // Automatically manage createdAt and updatedAt fields
});

const WishlistModel = mongoose.model("wishlists", wishlistSchema);

module.exports = {
  WishlistModel
};
