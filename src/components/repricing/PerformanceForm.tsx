
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { SalesPerformance } from "@/types/repricing";
import { cn } from "@/lib/utils";

interface PerformanceFormProps {
  salesPerformance: SalesPerformance;
  onSalesPerformanceChange: (value: SalesPerformance) => void;
}

export const PerformanceForm = ({
  salesPerformance,
  onSalesPerformanceChange,
}: PerformanceFormProps) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSalesPerformanceChange(Number(e.target.value) as SalesPerformance);
  };

  const getSalesPerformanceLabel = (value: number) => {
    if (value <= -30) return "Significantly Decreased";
    if (value < 0) return "Decreased";
    if (value === 0) return "Unchanged";
    if (value <= 30) return "Increased";
    return "Significantly Increased";
  };

  const getSliderColor = (value: number) => {
    if (value <= -30) return "#ef4444";
    if (value <= -10) return "#f97316";
    if (value <= 10) return "#8B8B73";
    if (value <= 30) return "#84cc16";
    return "#22c55e";
  };

  const getSliderClass = (value: number) => {
    return cn(
      "w-full h-2 rounded-lg appearance-none cursor-pointer",
      "bg-gradient-to-r from-red-500 via-orange-500 via-[#8B8B73] via-lime-500 to-green-500",
      "[&::-webkit-slider-thumb]:appearance-none",
      "[&::-webkit-slider-thumb]:w-4",
      "[&::-webkit-slider-thumb]:h-4",
      "[&::-webkit-slider-thumb]:rounded-full",
      "[&::-webkit-slider-thumb]:cursor-pointer",
      "[&::-moz-range-thumb]:w-4",
      "[&::-moz-range-thumb]:h-4",
      "[&::-moz-range-thumb]:rounded-full",
      "[&::-moz-range-thumb]:border-0",
      "[&::-moz-range-thumb]:cursor-pointer",
      value <= -30 ? "[&::-webkit-slider-thumb]:bg-red-500 [&::-moz-range-thumb]:bg-red-500" :
      value <= -10 ? "[&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:bg-orange-500" :
      value <= 10 ? "[&::-webkit-slider-thumb]:bg-[#8B8B73] [&::-moz-range-thumb]:bg-[#8B8B73]" :
      value <= 30 ? "[&::-webkit-slider-thumb]:bg-lime-500 [&::-moz-range-thumb]:bg-lime-500" :
      "[&::-webkit-slider-thumb]:bg-green-500 [&::-moz-range-thumb]:bg-green-500"
    );
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Sales Performance
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              How have your sales performed since your last price change?
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between text-sm text-[#6B6B5F]">
            <span>Decreased</span>
            <span></span>
            <span>Increased</span>
          </div>
          
          <input
            type="range"
            min="-50"
            max="50"
            value={salesPerformance}
            onChange={handleSliderChange}
            className={getSliderClass(salesPerformance)}
          />

          <div className="text-center">
            <span className="text-lg font-medium" style={{ color: getSliderColor(salesPerformance) }}>
              {salesPerformance === 0 ? "Unchanged" : getSalesPerformanceLabel(salesPerformance)}
            </span>
          </div>

          <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
            <h3 className="text-lg font-medium text-[#4A4A3F] mb-3">Performance Summary</h3>
            <div className="space-y-2 text-sm text-[#6B6B5F]">
              <p>
                • Sales have {salesPerformance === 0 ? "remained unchanged" : 
                  `${getSalesPerformanceLabel(salesPerformance).toLowerCase()} ${Math.abs(salesPerformance)}%`} since last price change
              </p>
              <p>
                • This suggests {
                  salesPerformance <= -30 ? "significant pricing pressure - consider price reduction"
                  : salesPerformance < 0 ? "some pricing pressure - review competitive position"
                  : salesPerformance <= 10 ? "neutral market position - minor adjustments may be needed"
                  : salesPerformance <= 30 ? "strong market position - consider strategic price increase"
                  : "excellent market position - significant room for price optimization"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
