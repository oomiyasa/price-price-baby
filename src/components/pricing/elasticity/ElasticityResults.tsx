
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ElasticityResult } from "../types/elasticity";

interface ElasticityResultsProps {
  results: ElasticityResult;
}

export function ElasticityResults({ results }: ElasticityResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground">Price Elasticity</h3>
            <p className="text-2xl font-bold">{results.priceElasticity.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              Demand is {results.isElastic ? "elastic" : "inelastic"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground">Revenue Impact</h3>
            <p className="text-2xl font-bold">
              {formatPercentage(results.revenueChange)}
            </p>
            <p className="text-sm text-muted-foreground">
              {results.revenueChange >= 0 ? "Increase" : "Decrease"} in revenue
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground">Current Revenue</h3>
            <p className="text-2xl font-bold">
              {formatCurrency(results.currentRevenue)}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-muted-foreground">Projected Revenue</h3>
            <p className="text-2xl font-bold">
              {formatCurrency(results.projectedRevenue)}
            </p>
          </div>
        </div>
        <div className="pt-4 border-t">
          <h3 className="font-medium text-muted-foreground mb-2">Recommendation</h3>
          <p className="text-sm">
            {results.isElastic
              ? "Your product shows elastic demand, meaning customers are sensitive to price changes. Consider maintaining or lowering prices to maximize revenue."
              : "Your product shows inelastic demand, meaning customers are less sensitive to price changes. You may have room to increase prices while maintaining revenue."}
          </p>
          <p className="text-sm mt-2">
            Recommended price point: {formatCurrency(results.recommendedPrice)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
