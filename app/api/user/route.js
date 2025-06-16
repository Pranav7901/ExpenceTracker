import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../utils/db";
import Transaction from "../../../lib/TranSchema";

export async function GET(req) {
  try {
    // Ensure the database is connected
    await connectToDatabase();

    // Get the authenticated user's Clerk userId
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch total income and expenses for the authenticated user
    const [incomeTotal, expenseTotal] = await Promise.all([
      Transaction.aggregate([
        { $match: { type: "income", userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        { $match: { type: "expense", userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    // Handle cases where no data is found
    const income = incomeTotal.length > 0 ? incomeTotal[0].total : 0;
    const expenses = expenseTotal.length > 0 ? expenseTotal[0].total : 0;

    // Return the results
    return NextResponse.json(
      {
        income,
        expenses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching total income and expenses:", error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}