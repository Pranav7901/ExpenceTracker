import { NextResponse } from "next/server";  // Use NextResponse
import { connectToDatabase } from "../../../utils/db"; 
import Transaction from "../../../lib/TranSchema"; 


// Handle GET request - fetch transactions
export async function GET(req) {
  try {
    connectToDatabase();
    const transactions = await Transaction.find();  // Fetch transactions from DB
    return NextResponse.json(transactions);  // Use NextResponse.json() to return the data
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });  // Handle error with status 500
  }
}

// Handle POST request - create a new transaction
export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log("Database connection established");

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

    // Create a new transaction
    const newTransaction = new Transaction({
      userId: body.userId,  // Assuming userId is a valid ObjectId
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