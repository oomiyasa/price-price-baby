
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscountResults as DiscountResultsType } from "../types/discount";

interface DiscountResultsProps {
  results: DiscountResultsType;
  discountPercentage: number;
}

export function DiscountResults({ results, discountPercentage }: DiscountResultsProps) {
  const getChangeColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatChange = (value: number) => {
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{discountPercentage}% Discount Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Effective Price</p>
            <p className="text-2xl font-semibold">${results.effectivePrice.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sales Volume Change</p>
            <p className={`text-2xl font-semibold ${getChangeColor(results.salesIncrease)}`}>
              {formatChange(results.salesIncrease)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Revenue Change</p>
            <p className={`text-2xl font-semibold ${getChangeColor(results.revenueChange)}`}>
              {formatChange(results.revenueChange)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Profit Change</p>
            <p className={`text-2xl font-semibold ${getChangeColor(results.profitChange)}`}>
              {formatChange(results.profitChange)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">New Revenue</p>
            <p className="text-2xl font-semibold">${results.revenue.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">New Profit</p>
            <p className="text-2xl font-semibold">${results.profit.toFixed(2)}</p>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-sm text-muted-foreground">New Profit Margin</p>
            <p className="text-2xl font-semibold">{results.profitMargin.toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
