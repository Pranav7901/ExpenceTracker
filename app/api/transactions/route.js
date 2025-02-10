import { NextResponse } from "next/server"; // Use NextResponse
import { connectToDatabase } from "../../../utils/db";
import Transaction from "../../../lib/TranSchema";
import { getAuth } from "@clerk/nextjs/server"; // Import Clerk's authentication helper

// Handle GET request - fetch transactions for the logged-in user
export async function GET(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the authenticated user's Clerk userId
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch transactions specific to the logged-in user
    const transactions = await Transaction.find({ userId });

    // Return the user's transactions
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);

    // Handle error with status 500
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

// Handle POST request - create a new transaction
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log("Database connection established");

    // Get the authenticated user's Clerk userId
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the incoming request body
    const body = await req.json();
    console.log("Request body:", body);

    // Validate input data
    if (!body.type || !body.name || !body.amount || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure type is either 'income' or 'expense'
    if (!["income", "expense"].includes(body.type)) {
      return NextResponse.json({ error: "Invalid type. Must be 'income' or 'expense'." }, { status: 400 });
    }

    // Create a new transaction associated with the logged-in user
    const newTransaction = new Transaction({
      userId, // Use the logged-in user's userId
      type: body.type,
      name: body.name,
      amount: body.amount,
      description: body.description,
      date: new Date(),
    });

    // Save the transaction
    await newTransaction.save();
    console.log("Transaction saved successfully");

    // Return success response
    return NextResponse.json({ message: "Transaction added", transaction: newTransaction }, { status: 201 });

  } catch (error) {
    console.error("Error adding transaction:", error);

    // Return error response
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}