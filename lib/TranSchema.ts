import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {type: String, required:true},
  type: { type: String, enum: ['income', 'expense'], required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

// Check if the model exists to avoid overwriting
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;