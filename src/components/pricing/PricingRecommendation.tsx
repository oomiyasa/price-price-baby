
import { Card, CardContent } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { CompanyType, PricingPath, PricingStrategy } from "@/types/pricing";

interface PricingRecommendationProps {
  companyType: CompanyType;
  pricingPath: PricingPath;
  pricingStrategy: PricingStrategy;
  costPerUnit: string;
  marketPrice: string;
  competitorLow: string;
  competitorHigh: string;
  desiredMargin: number;
}

export const PricingRecommendation = ({
  pricingPath,
  pricingStrategy,
  costPerUnit,
  marketPrice,
  competitorLow,
  competitorHigh,
  desiredMargin,
}: PricingRecommendationProps) => {
  const calculatePriceRange = () => {
    if (pricingPath === "market") {
      const basePrice = parseFloat(marketPrice);
      const multiplier = pricingStrategy === "lower" ? 0.9 : pricingStrategy === "premium" ? 1.1 : 1;
      const price = basePrice * multiplier;
      return {
        low: (price * 0.95).toFixed(2),
        high: (price * 1.05).toFixed(2)
      };
    } else {
      // Cost-based pricing
      const cost = parseFloat(costPerUnit);
      const markup = 1 + (desiredMargin / 100);
      const basePrice = cost * markup;
      return {
        low: (basePrice * 0.95).toFixed(2),
        high: (basePrice * 1.05).toFixed(2)
      };
    }
  };

  const priceRange = calculatePriceRange();

  const getMarketPositionText = () => {
    if (pricingStrategy === "lower") {
      return "positions you below market average to gain market share";
    } else if (pricingStrategy === "premium") {
      return "positions you as a premium offering above market average";
    }
    return "positions you at market average";
  };

  const getProfitPotentialText = () => {
    if (pricingPath === "cost") {
      const cost = parseFloat(costPerUnit);
      const avgPrice = (parseFloat(priceRange.low) + parseFloat(priceRange.high)) / 2;
      const actualMargin = ((avgPrice - cost) / avgPrice) * 100;
      return `If your costs are ${costPerUnit}, you'll achieve your target profit margin of ${desiredMargin}%.`;
    }
    return `Based on market positioning, you can expect margins around ${desiredMargin}%.`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-[#4A4A3F] mb-2">
          ${priceRange.low} - ${priceRange.high}
        </h2>
        <p className="text-[#6B6B5F]">per unit</p>
      </div>

      <div className="space-y-4">
        <Card className="border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-1 rounded-full bg-[#8B8B73]" />
              <div>
                <h3 className="font-medium text-[#4A4A3F] mb-1">Market Position</h3>
                <p className="text-[#6B6B5F] text-sm">
                  Based on your market research and pricing strategy, this range {getMarketPositionText()}.
                </p>
              </div>
              <CopyIcon className="w-4 h-4 text-gray-400 cursor-pointer ml-auto flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-1 rounded-full bg-[#8B8B73]" />
              <div>
                <h3 className="font-medium text-[#4A4A3F] mb-1">Profit Potential</h3>
                <p className="text-[#6B6B5F] text-sm">
                  {getProfitPotentialText()}
                </p>
              </div>
              <CopyIcon className="w-4 h-4 text-gray-400 cursor-pointer ml-auto flex-shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-[#4A4A3F] mb-2">Factors Considered:</h3>
              <ul className="space-y-2 text-sm text-[#6B6B5F]">
                <li className="flex items-center justify-between">
                  • Pricing approach: {pricingPath === "market" ? "Market-based pricing" : "Cost-based pricing"}
                  <CopyIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                </li>
                <li className="flex items-center justify-between">
                  • Market position: {pricingStrategy === "lower" ? "lower" : pricingStrategy === "premium" ? "premium" : "similar"} than competitors
                  <CopyIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                </li>
                <li className="flex items-center justify-between">
                  • Target profit margin: {desiredMargin}%
                  <CopyIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
