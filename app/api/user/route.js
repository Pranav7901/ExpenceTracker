import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../utils/db';
import Transaction from '../../../lib/TranSchema';

// Ensure database connection
connectToDatabase();

export async function GET(req) {
  try {
    // Get the authenticated user's Clerk userId
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Now you can use the userId for fetching income/expenses data
    
    // Check if userId exists, otherwise return an Unauthorized response
    

    // Fetch the total income and expenses for the authenticated user
    const [incomeTotal, expenseTotal] = await Promise.all([
      Transaction.aggregate([
        { $match: { type: "income", userId } }, // Match documents by type and userId
        { $group: { _id: null, total: { $sum: "$amount" } } }, // Calculate total income
      ]),
      Transaction.aggregate([
        { $match: { type: "expense", userId } }, // Match documents by type and userId
        { $group: { _id: null, total: { $sum: "$amount" } } }, // Calculate total expenses
      ]),
    ]);

    // If no matching userId is found in the database, return empty results
    const income = incomeTotal.length > 0 ? incomeTotal[0].total : 0;
    const expenses = expenseTotal.length > 0 ? expenseTotal[0].total : 0;

    // Return the results (empty if no data is found)
    return NextResponse.json(
      {
        income,
        expenses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching total income and expenses:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}