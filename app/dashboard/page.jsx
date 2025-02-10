"use client"; // Mark this component as a client-side component
import { OverviewCard } from "../components/dashboard/OverviewCard";
import { TransactionList } from "../components/dashboard/TransactionList";
import { ExpenseChart } from "../components/dashboard/ExpenceChart";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import { useAuth } from "@clerk/nextjs"; // Correct Clerk hook
import { useRouter } from "next/navigation"; // Correct router import
import Loading from "../components/Loading";

const Index = () => {
  const { isLoaded, isSignedIn } = useAuth(); // Clerk auth state
  const router = useRouter(); // Next.js router
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [open, setOpen] = useState(false); // Transaction form visibility

  // Authentication check
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/signin"); // Redirect to sign-in page if not authenticated
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetch transactions and totals
  useEffect(() => {
    if (!isSignedIn) return; // Wait until the user is authenticated

    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTotals = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setTotalIncome(data.income || 0); // Set income
        setTotalExpenses(data.expenses || 0); // Set expenses
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchTransactions();
    fetchTotals();
  }, [isSignedIn]);

  // Show loading spinner while checking authentication or fetching data
  if (!isLoaded || loading) {
    return <Loading />;
  }

  const handleClick = () => {
    setOpen(true); // Open the transaction form
  };

  const handleClose = () => {
    setOpen(false); // Close the transaction form
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">Track your expenses and income</p>
        </div>

        {/* Transaction Form Modal */}
        <TransactionForm open={open} setOpen={setOpen} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewCard
            title="Total Income"
            amount={totalIncome}
            trend={12}
            className="border-l-4 border-green-500"
          />
          <OverviewCard
            title="Total Expenses"
            amount={totalExpenses}
            trend={-8}
            className="border-l-4 border-destructive"
          />
          <OverviewCard
            title="Net Balance"
            amount={totalIncome - totalExpenses}
            className="border-l-4 border-primary"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TransactionList transactions={transactions} />
          <ExpenseChart />
        </div>
      </div>
    </div>
  );
};

export default Index;