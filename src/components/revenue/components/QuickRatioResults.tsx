
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuickRatioResult } from "../types";

interface QuickRatioResultsProps {
  results: QuickRatioResult;
}

export function QuickRatioResults({ results }: QuickRatioResultsProps) {
  const { quickRatio, growthEfficiency, netMRR } = results;

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
              Quick Ratio
            </h3>
            <p className="text-4xl font-bold text-[#8B8B73]">
              {quickRatio.toFixed(2)}
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-medium text-[#4A4A3F] mb-2">
              Growth Efficiency
            </h4>
            <p className={`text-2xl font-semibold ${getEfficiencyColor(growthEfficiency)}`}>
              {growthEfficiency}
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-medium text-[#4A4A3F] mb-2">
              Net MRR
            </h4>
            <p className="text-2xl font-semibold text-[#8B8B73]">
              ${netMRR.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
