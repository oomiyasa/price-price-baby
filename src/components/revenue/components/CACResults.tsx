
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CACResults as CACResultsType } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CACResultsProps {
  results: CACResultsType;
}

export function CACResults({ results }: CACResultsProps) {
  const chartData = [
    {
      name: "Marketing CAC",
      value: results.marketingCAC,
    },
    {
      name: "Sales CAC",
      value: results.salesCAC,
    },
    {
      name: "Total CAC",
      value: results.cacPerCustomer,
    },
  ];

  const getBenchmarkColor = (comparison: "good" | "average" | "poor") => {
    switch (comparison) {
      case "good":
        return "text-green-600";
      case "average":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">
                Key Metrics
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-[#6B6B5F]">CAC per Customer</dt>
                  <dd className="text-2xl font-semibold text-[#4A4A3F]">
                    ${results.cacPerCustomer.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6B6B5F]">Payback Period</dt>
                  <dd className="text-2xl font-semibold text-[#4A4A3F]">
                    {results.paybackPeriod.toFixed(1)} months
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6B6B5F]">Efficiency Ratio (LTV:CAC)</dt>
                  <dd className="text-2xl font-semibold text-[#4A4A3F]">
                    {results.efficiencyRatio.toFixed(2)}x
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-[#6B6B5F]">Performance</dt>
                  <dd className={`text-2xl font-semibold ${getBenchmarkColor(results.benchmarkComparison)}`}>
                    {results.benchmarkComparison.charAt(0).toUpperCase() + results.benchmarkComparison.slice(1)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="h-64">
              <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">
                Cost Breakdown
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B8B73" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
