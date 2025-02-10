"use client"
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";





export function TransactionList({ transactions }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Show all transactions if search is empty, else filter
  const filteredTransactions = searchQuery
    ? transactions.filter((transaction) =>
        transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions;

  return (
    <Card className="p-6">
      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction List */}
      <ScrollArea   className="h-[300px] pr-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction,index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
                <div className="flex flex-col">
                  <span className="font-medium">{transaction.description}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{transaction.type}</span>
                  <span
                    className={cn(
                      "font-medium",
                      transaction.type === "income" ? "text-green-500" : "text-red-500"
                    )}
                  >
                    ${Math.abs(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No transactions found.</p>
        )}
      </ScrollArea>
    </Card>
  );
}