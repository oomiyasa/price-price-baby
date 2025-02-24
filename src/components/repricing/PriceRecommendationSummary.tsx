
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PriceRecommendationSummaryProps {
  min: number;
  max: number;
  currentPrice: string;
  trend: number;
  volatility: number;
  historicalPrices?: {
    price: string;
    timeAgo: number;
    timeUnit: 'days' | 'weeks' | 'months' | 'years';
  }[];
}

const formatPrice = (price: number) => {
  return price.toFixed(2);
};

const calculatePercentageDifference = (price: number, currentPrice: string) => {
  const basePrice = parseFloat(currentPrice);
  if (isNaN(basePrice) || basePrice === 0) return 0;
  return ((price - basePrice) / basePrice) * 100;
};

const getTrendIcon = (trend: number) => {
  if (trend > 2) return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend < -2) return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-[#8B8B73]" />;
};

const getTimeRangeText = (historicalPrices?: PriceRecommendationSummaryProps['historicalPrices']) => {
  if (!historicalPrices || historicalPrices.length === 0) return "No historical data";
  
  const oldestPrice = historicalPrices[historicalPrices.length - 1];
  return `over the last ${oldestPrice.timeAgo} ${oldestPrice.timeUnit}`;
};

export const PriceRecommendationSummary = ({
  min,
  max,
  currentPrice,
  trend,
  volatility,
  historicalPrices,
}: PriceRecommendationSummaryProps) => {
  return (
    <div className="p-6 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
      <h3 className="text-xl font-medium text-[#4A4A3F] mb-4">Recommended Price Range</h3>
      <div className="text-2xl font-semibold text-center mb-2 text-[#4A4A3F]">
        ${formatPrice(min)} - ${formatPrice(max)}
      </div>
      <div className="text-sm text-center text-[#6B6B5F] mb-4">
        ({calculatePercentageDifference(min, currentPrice).toFixed(1)}% to{" "}
        {calculatePercentageDifference(max, currentPrice).toFixed(1)}% from current price)
      </div>
      <div className="text-sm text-[#6B6B5F] space-y-2">
        <div className="flex items-center gap-2">
          <span>Historical trend {getTimeRangeText(historicalPrices)}:</span>
          {getTrendIcon(trend)}
          <span>
            {Math.abs(trend) < 2
              ? "Stable"
              : `${trend > 0 ? "Upward" : "Downward"} (${Math.abs(trend).toFixed(1)}%)`}
          </span>
        </div>
        {volatility > 2 && (
          <p className="text-orange-600">
            Note: Price history shows {volatility > 5 ? "high" : "moderate"} volatility (
            {volatility.toFixed(1)}% variation)
          </p>
        )}
      </div>
    </div>
  );
};
