"use client";
import { Card } from "@/app/components/ui/card";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ["#6BCB77","#FF6B6B", "#FFD93D", "#4D96FF", "#8358FF"];

export function ExpenseChart() {
  const [amountdata, setAmountdata] = useState([
    { name: "INCOME", value: 0 },
    { name: "EXPENCE", value: 0 },
    { name: "NET BALANCE", value: 0 },
  ]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const amount = await fetch("/api/user");
        const response = await amount.json();
  
  
        const income = Number(response.income || 0);
        const expence = Number(response.expenses || 0);
        const net = income - expence;
  
  ;
  
        // Update state
        const data = [
          { name: "INCOME", value: income },
          { name: "EXPENCE", value: expence },
          { name: "NET BALANCE", value: net },
        ];
  
       
  
        setAmountdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchdata();
  }, []);

  useEffect(() => {
    console.log("Updated amountdata in state:", amountdata);
  }, [amountdata]);

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold">Expense Breakdown</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={amountdata}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {amountdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}