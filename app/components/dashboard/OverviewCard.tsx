"use client"
import { Card } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";

interface OverviewCardProps {
  title: string;
  amount: number;
  className?: string;
  trend?: number;
}

export function OverviewCard({ title, amount, className, trend }: OverviewCardProps) {
  return (
    <Card className={cn("p-6 transition-all hover:shadow-lg", className)}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-2xl font-bold">
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        {trend !== undefined && (
          <span className={cn(
            "text-sm font-medium",
            trend > 0 ? "text-green-500" : "text-destructive"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
    </Card>
  );
}