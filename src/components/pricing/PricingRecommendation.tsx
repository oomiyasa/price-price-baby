
import { Card, CardContent } from "@/components/ui/card";
import { PenLine } from "lucide-react";
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
  onEditStep: (step: number) => void;
}

export const PricingRecommendation = ({
  pricingPath,
  pricingStrategy,
  costPerUnit,
  marketPrice,
  competitorLow,
  competitorHigh,
  desiredMargin,
  onEditStep,
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
    if (pricingPath === "market") {
      if (pricingStrategy === "lower") {
        return "positions you below market average to gain market share";
      } else if (pricingStrategy === "premium") {
        return "positions you as a premium offering above market average";
      }
      return "positions you at market average";
    }
    return null;
  };

  const getProfitAnalysis = () => {
    if (pricingPath === "cost") {
      const cost = parseFloat(costPerUnit);
      const avgPrice = (parseFloat(priceRange.low) + parseFloat(priceRange.high)) / 2;
      const actualMargin = ((avgPrice - cost) / avgPrice) * 100;
      return `Based on your cost of ${costPerUnit}, this price will achieve your target profit margin of ${desiredMargin}%.`;
    }

    // For market-based pricing, calculate recommended COGS ranges
    const lowPrice = parseFloat(priceRange.low);
    const highPrice = parseFloat(priceRange.high);
    
    // Calculate maximum allowable COGS to achieve desired margin
    const maxCogsLow = lowPrice * (1 - (desiredMargin / 100));
    const maxCogsHigh = highPrice * (1 - (desiredMargin / 100));

    return (
      <div className="space-y-2">
        <p>To achieve your target margin of {desiredMargin}%, your COGS should be:</p>
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>No more than ${maxCogsLow.toFixed(2)} for the lower price point (${priceRange.low})</li>
          <li>No more than ${maxCogsHigh.toFixed(2)} for the higher price point (${priceRange.high})</li>
        </ul>
        <p className="text-sm mt-2 text-[#8B8B73]">
          Tip: If your costs exceed these thresholds, consider ways to reduce production costs or reassess your margin expectations.
        </p>
      </div>
    );
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
        {pricingPath === "market" && (
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
                <PenLine 
                  className="w-4 h-4 text-gray-400 cursor-pointer ml-auto flex-shrink-0 hover:text-gray-600" 
                  onClick={() => onEditStep(4)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 mt-1 rounded-full bg-[#8B8B73]" />
              <div>
                <h3 className="font-medium text-[#4A4A3F] mb-1">Profit Analysis</h3>
                <div className="text-[#6B6B5F] text-sm">
                  {getProfitAnalysis()}
                </div>
              </div>
              <PenLine 
                className="w-4 h-4 text-gray-400 cursor-pointer ml-auto flex-shrink-0 hover:text-gray-600" 
                onClick={() => onEditStep(5)}
              />
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
                  <PenLine 
                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={() => onEditStep(2)}
                  />
                </li>
                {pricingPath === "market" && (
                  <li className="flex items-center justify-between">
                    • Market position: {pricingStrategy === "lower" ? "lower" : pricingStrategy === "premium" ? "premium" : "similar"} than competitors
                    <PenLine 
                      className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                      onClick={() => onEditStep(4)}
                    />
                  </li>
                )}
                <li className="flex items-center justify-between">
                  • Target profit margin: {desiredMargin}%
                  <PenLine 
                    className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" 
                    onClick={() => onEditStep(5)}
                  />
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
