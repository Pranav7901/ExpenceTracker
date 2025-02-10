import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as needed (e.g., password, role, etc.)
});

// Create the User Model
const User = mongoose.model('User', userSchema);

module.exports = User;