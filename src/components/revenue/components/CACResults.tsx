
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CACResults as CACResultsType } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

interface CACResultsProps {
  results: CACResultsType;
}

const getEfficiencyColor = (efficiency: CACResultsType["efficiency"]) => {
  switch (efficiency) {
    case "excellent":
      return "text-green-600";
    case "good":
      return "text-blue-600";
    case "average":
      return "text-yellow-600";
    case "poor":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export const CACResultsDisplay: React.FC<CACResultsProps> = ({ results }) => {
  return (
    <Card className="bg-[#FAFAFA]">
      <CardHeader className="text-center border-b border-gray-100">
        <h3 className="text-xl font-semibold text-[#4A4A3F]">Results</h3>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-lg text-[#6B6B5F]">Customer Acquisition Cost</p>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                ${results.cac.toFixed(2)}
              </p>
              <p
                className={`text-sm font-medium capitalize ${getEfficiencyColor(
                  results.efficiency
                )}`}
              >
                {results.efficiency} Efficiency
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg text-[#6B6B5F]">Customers Acquired</p>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                {results.customersPerPeriod}
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Marketing",
                    value: results.marketingSplit,
                    fill: "#8B8B73",
                  },
                  {
                    name: "Sales",
                    value: results.salesSplit,
                    fill: "#6B6B5F",
                  },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Cost Split (%)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
