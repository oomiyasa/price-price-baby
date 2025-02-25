
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BurnMultipleResult } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface BurnMultipleResultsProps {
  results: BurnMultipleResult;
}

export function BurnMultipleResults({ results }: BurnMultipleResultsProps) {
  const { burnMultiple, efficiency, revenueGrowth, quarterlyBurn, recommendation } =
    results;

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

  const renderScaleItem = (range: string, label: string, color: string) => (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span className="text-sm text-[#6B6B5F]">
        {range}: <span className="font-medium">{label}</span>
      </span>
    </div>
  );

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h3 className="text-2xl font-medium text-[#4A4A3F]">
                Burn Multiple
              </h3>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-[#8B8B73]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The Burn Multiple measures how much you're burning to generate<br />each dollar of new ARR. Lower is better.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-4xl font-bold text-[#8B8B73]">
              {burnMultiple.toFixed(2)}x
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-medium text-[#4A4A3F] mb-2">
              Burn Efficiency
            </h4>
            <p className={`text-2xl font-semibold ${getEfficiencyColor(efficiency)}`}>
              {efficiency}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-sm font-medium text-[#4A4A3F] mb-3">
              Scoring Scale
            </h5>
            <div className="space-y-2">
              {renderScaleItem("≤ 1x", "Excellent - Highly efficient cash utilization", "bg-green-600")}
              {renderScaleItem("1x - 2x", "Good - Reasonable efficiency", "bg-yellow-600")}
              {renderScaleItem("> 2x", "Poor - Inefficient burn rate", "bg-red-600")}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Quarterly Burn
              </h4>
              <p className="text-2xl font-semibold text-[#8B8B73]">
                ${quarterlyBurn.toLocaleString()}
              </p>
            </div>
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
