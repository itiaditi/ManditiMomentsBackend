const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "orders"  // Reference to the Orders collection
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "userDetails"  // Reference to the Users collection
  },
  paymentDate: { 
    type: Date, 
    required: true, 
    default: Date.now // Date when the payment was made
  },
  amount: { 
    type: Number, 
    required: true, 
    min: 0 // The payment amount
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Credit Card", "PayPal", "Debit Card", "Bank Transfer"], // Available payment methods
  },
  transactionId: { 
    type: String, 
    required: true, 
    unique: true // Transaction ID provided by the payment gateway
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Success", "Failed"], // Payment status
    default: "Pending" // Default to Pending
  },
  gatewayResponse: {
    responseCode: { 
      type: String, 
      required: true 
    }, // Response code from payment gateway (e.g., "00" for success)
    message: { 
      type: String, 
      required: true 
    } // Message from payment gateway (e.g., "Transaction successful")
  }
}, {
  versionKey: false,
  timestamps: { createdAt: true, updatedAt: true } // Automatically add createdAt and updatedAt
});

const PaymentModel = mongoose.model("payments", paymentSchema);

module.exports = {
  PaymentModel
};
