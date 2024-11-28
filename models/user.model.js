const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressId: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false }); // Disable _id for embedded documents

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: Number, required: true },
  address: [addressSchema], // Embedded address schema
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  },
  createdAt: { type: Date, default: Date.now }, // Automatically set the current date
  updatedAt: { type: Date, default: Date.now }
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // Enable automatic timestamps
});

const UserModel = mongoose.model('users', userSchema);

module.exports = {
  UserModel
};
