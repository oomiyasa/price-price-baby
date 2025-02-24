
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BundleSummaryProps } from "@/types/bundleConfiguration";

export const BundleSummary = ({
  originalTotalAnnual,
  discountedTotalAnnual,
  savingsAmount,
  savingsPercentage,
  blendedMargin,
  discountedBlendedMargin,
}: BundleSummaryProps) => {
  return (
    <>
      <div className="flex justify-between items-start pt-4">
        <div>
          <div className="text-sm text-gray-600">Total List Price (Annual)</div>
          <div className="text-xl font-medium text-[#4A4A3F]">
            ${originalTotalAnnual.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Bundle Price (Annual)</div>
          <div className="text-xl font-medium text-green-600">
            ${discountedTotalAnnual.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mt-4">
        <h3 className="text-lg font-medium text-green-800 mb-3">
          Bundle Impact
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-green-700">Discount $</div>
            <div className="text-lg font-medium text-green-800">
              ${savingsAmount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-green-700">Discount %</div>
            <div className="text-lg font-medium text-green-800">
              {savingsPercentage.toFixed(1)}%
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-green-700">Margin Impact</div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-green-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change in blended margin rate due to discounts</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-lg font-medium text-green-800">
              {blendedMargin && discountedBlendedMargin ? (
                `${(discountedBlendedMargin - blendedMargin).toFixed(1)}%`
              ) : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
