
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COGSData, IndustryConfig } from "@/types/cogs";
import { calculateGrossMargin } from "@/constants/cogsCalculator";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { industryMargins } from "@/constants/pricing";

interface MarginAnalysisProps {
  data: COGSData;
  config: IndustryConfig;
  onUpdate: (updates: Partial<COGSData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MarginAnalysis = ({
  data,
  config,
  onUpdate,
  onNext,
  onBack,
}: MarginAnalysisProps) => {
  const totalCosts = Object.values(data.directCosts).reduce((sum, cost) => sum + (cost || 0), 0);
  const currentMargin = calculateGrossMargin(data.revenue, totalCosts);
  const industryMarginRange = industryMargins[data.industry];

  return (
    <>
      <CardHeader className="text-center border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">Current Performance</h2>
        <p className="text-[#6B6B5F]">Enter your revenue to calculate current margins</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="revenue">Total Revenue</Label>
            <Input
              id="revenue"
              type="number"
              placeholder="Enter your revenue"
              value={data.revenue || ""}
              onChange={(e) => onUpdate({ revenue: e.target.value ? parseFloat(e.target.value) : 0 })}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-[#4A4A3F]">Total COGS</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sum of all direct costs</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-[#4A4A3F] font-medium">${totalCosts.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-[#4A4A3F]">Current Gross Margin</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>(Revenue - COGS) / Revenue × 100</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-[#4A4A3F] font-medium">{currentMargin.toFixed(1)}%</span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-[#4A4A3F]">Industry Benchmark</h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Typical gross margin range for your industry</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-[#6B6B5F]">{industryMarginRange}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!data.revenue}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </>
  );
};
