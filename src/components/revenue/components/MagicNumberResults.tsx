
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MagicNumberResult } from "../types";

interface MagicNumberResultsProps {
  results: MagicNumberResult;
}

export function MagicNumberResults({ results }: MagicNumberResultsProps) {
  const { magicNumber, efficiency, revenueGrowth, recommendation } = results;

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "Excellent":
        return "text-green-600";
      case "Good":
        return "text-yellow-600";
      case "Poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#4A4A3F] mb-2">
              Magic Number
            </h3>
            <p className="text-4xl font-bold text-[#8B8B73]">
              {magicNumber.toFixed(2)}
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-medium text-[#4A4A3F] mb-2">
              Sales Efficiency
            </h4>
            <p className={`text-2xl font-semibold ${getEfficiencyColor(efficiency)}`}>
              {efficiency}
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-medium text-[#4A4A3F] mb-2">
              Revenue Growth
            </h4>
            <p className="text-2xl font-semibold text-[#8B8B73]">
              {revenueGrowth.toFixed(1)}%
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-medium text-[#4A4A3F] mb-2">
              Recommendation
            </h4>
            <p className="text-base text-[#6B6B5F]">{recommendation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
