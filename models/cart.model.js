const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }, // Ensures quantity is at least 1
  addedAt: { type: Date, required: true, default: Date.now }
}, { _id: false }); // Disable _id for the embedded product document

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "users" }, // Reference to the user
  products: [productSchema], // Array of product documents
  updatedAt: { type: Date, required: true, default: Date.now } // Tracks last update time
}, {
  versionKey: false,
  timestamps: { createdAt: false, updatedAt: true } // Only manage updatedAt automatically
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = {
  CartModel
};
