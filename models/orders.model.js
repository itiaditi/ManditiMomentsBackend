const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "userDetails" }, // Reference to the User (customer)
  orderDate: { type: Date, required: true, default: Date.now }, // Date the order was placed
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  }, // Order status
  totalAmount: { type: Number, required: true, min: 0 }, // Total amount for the order
  items: [
    {
      productId: { type: String, required: true, ref: "products" }, // Product reference
      quantity: { type: Number, required: true, min: 1 }, // Quantity of the product ordered
      price: { type: Number, required: true, min: 0 }, // Price of the product at the time of purchase
    },
  ], // List of products in the order
  shippingAddress: {
    addressId: { type: String, required: true }, // Address reference (if you want to keep it unique)
    street: { type: String, required: true }, // Street name
    city: { type: String, required: true }, // City
    zip: { type: String, required: true }, // ZIP code
    country: { type: String, required: true }, // Country
  },
  paymentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "payments" }, // Reference to payment details
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true } // Automatically add createdAt and updatedAt
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = {
  OrderModel
};
