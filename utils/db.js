import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout
      connectTimeoutMS: 30000, // Increase timeout
    });

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Ensure queries only run when Mongoose is ready
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open");
});

export { connectToDatabase };