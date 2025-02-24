
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { CACResults as CACResultsType } from "../types";

interface CACResultsProps {
  results: CACResultsType;
}

export const CACResultsDisplay: React.FC<CACResultsProps> = ({ results }) => {
  const pieData = [
    { name: "Marketing", value: results.marketingSplit },
    { name: "Sales", value: results.salesSplit },
  ];

  const COLORS = ["#8B8B73", "#4A4A3F"];

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

  return (
    <div className="space-y-6">
      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Customer Acquisition Cost
              </h3>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                ${results.cac.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Acquisition Efficiency
              </h3>
              <p className={`text-3xl font-bold ${getEfficiencyColor(results.efficiency)} capitalize`}>
                {results.efficiency}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
            Cost Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
            Efficiency Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#6B6B5F]">Customers Acquired</span>
              <span className="font-semibold text-[#4A4A3F]">
                {results.customersPerPeriod}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B6B5F]">Marketing Cost per Customer</span>
              <span className="font-semibold text-[#4A4A3F]">
                ${(results.marketingSplit / results.customersPerPeriod).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B6B5F]">Sales Cost per Customer</span>
              <span className="font-semibold text-[#4A4A3F]">
                ${(results.salesSplit / results.customersPerPeriod).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
