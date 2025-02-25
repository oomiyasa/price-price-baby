
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DiscountResults as DiscountResultsType } from "../types/discount";

interface DiscountResultsProps {
  results: DiscountResultsType;
  discountPercentage: number;
}

export function DiscountResults({ results, discountPercentage }: DiscountResultsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{discountPercentage}% Discount Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Effective Price</p>
            <p className="text-2xl font-semibold">${results.effectivePrice.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-semibold">${results.revenue.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Profit</p>
            <p className="text-2xl font-semibold">${results.profit.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <p className="text-2xl font-semibold">{results.profitMargin.toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
