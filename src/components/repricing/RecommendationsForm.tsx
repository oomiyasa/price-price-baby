import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle, Edit2, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecommendationsFormProps {
  currentPrice: string;
  historicalPrices?: string[];
  salesPerformance: number;
  competitorPrices: "increased" | "decreased" | "mixed" | "unchanged" | null;
  marketDemand: "growing" | "shrinking" | "stable" | null;
  uniqueness: "low" | "medium" | "high";
  valuePerception: number;
  onStepChange: (step: number) => void;
  weights?: {
    salesPerformance: number;
    marketConditions: number;
    positioning: number;
  };
  onWeightsChange?: (weights: {
    salesPerformance: number;
    marketConditions: number;
    positioning: number;
  }) => void;
}

export const RecommendationsForm = ({
  currentPrice,
  historicalPrices = [],
  salesPerformance,
  competitorPrices,
  marketDemand,
  uniqueness,
  valuePerception,
  onStepChange,
  weights = {
    salesPerformance: 33.33,
    marketConditions: 33.33,
    positioning: 33.34,
  },
  onWeightsChange = () => {},
}: RecommendationsFormProps) => {
  const analyzePriceTrend = () => {
    if (historicalPrices.length < 2) return { trend: 0, volatility: 0 };
    
    const validPrices = [...historicalPrices.map(p => parseFloat(p)), parseFloat(currentPrice)]
      .filter(p => !isNaN(p));
    
    if (validPrices.length < 2) return { trend: 0, volatility: 0 };

    const changes = validPrices.slice(1).map((price, i) => 
      ((price - validPrices[i]) / validPrices[i]) * 100
    );

    const trend = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    
    const meanChange = trend;
    const squaredDiffs = changes.map(change => Math.pow(change - meanChange, 2));
    const volatility = Math.sqrt(squaredDiffs.reduce((sum, diff) => sum + diff, 0) / changes.length);

    return { trend, volatility };
  };

  const calculateSalesImpact = () => {
    if (salesPerformance <= -30) return -10;
    if (salesPerformance <= -10) return -5;
    if (salesPerformance >= 30) return 10;
    if (salesPerformance >= 10) return 5;
    return (salesPerformance / 10);
  };

  const calculateMarketImpact = () => {
    let impact = 0;
    const { trend, volatility } = analyzePriceTrend();
    
    if (competitorPrices === "increased") impact += 5;
    if (competitorPrices === "decreased") impact -= 5;
    if (marketDemand === "growing") impact += 5;
    if (marketDemand === "shrinking") impact -= 5;
    
    if (Math.abs(trend) > 2) {
      const trendFactor = Math.min(Math.abs(trend), 5) / 5;
      impact *= (1 + trendFactor);
    }

    if (volatility > 5) {
      impact *= (1 - Math.min(volatility, 10) / 20);
    }
    
    return impact;
  };

  const calculatePositioningImpact = () => {
    let impact = 0;
    const { trend } = analyzePriceTrend();
    
    if (uniqueness === "high") impact += 5;
    if (uniqueness === "low") impact -= 5;
    
    const perceptionImpact = ((valuePerception - 50) / 10);
    
    if (Math.abs(trend) > 2) {
      const trendAlignment = trend * perceptionImpact > 0 ? 1.2 : 0.8;
      impact = (impact + perceptionImpact) * trendAlignment;
    } else {
      impact = impact + perceptionImpact;
    }
    
    return impact;
  };

  const calculateRecommendation = () => {
    const basePrice = parseFloat(currentPrice);
    if (isNaN(basePrice)) return { min: 0, max: 0 };

    const { volatility } = analyzePriceTrend();
    
    const salesImpact = calculateSalesImpact() * (weights.salesPerformance / 100);
    const marketImpact = calculateMarketImpact() * (weights.marketConditions / 100);
    const positioningImpact = calculatePositioningImpact() * (weights.positioning / 100);
    
    const totalImpact = salesImpact + marketImpact + positioningImpact;
    
    const baseRange = 2 + (volatility / 4);
    
    return {
      min: basePrice * (1 + (totalImpact - baseRange) / 100),
      max: basePrice * (1 + (totalImpact + baseRange) / 100),
      impacts: {
        sales: salesImpact,
        market: marketImpact,
        positioning: positioningImpact,
        total: totalImpact
      }
    };
  };

  const calculatePercentageDifference = (price: number) => {
    const basePrice = parseFloat(currentPrice);
    if (isNaN(basePrice) || basePrice === 0) return 0;
    return ((price - basePrice) / basePrice) * 100;
  };

  const balanceWeights = (changedWeight: number, changedKey: keyof typeof weights) => {
    const remainingKeys = Object.keys(weights).filter(key => key !== changedKey) as Array<keyof typeof weights>;
    const remainingTotal = 100 - changedWeight;
    
    const currentRemainingTotal = remainingKeys.reduce((sum, key) => sum + weights[key], 0);
    const ratio = currentRemainingTotal === 0 ? 1 / remainingKeys.length : 1;
    
    const newWeights = {
      ...weights,
      [changedKey]: changedWeight,
    };

    remainingKeys.forEach((key, index) => {
      if (index === remainingKeys.length - 1) {
        newWeights[key] = Math.round((100 - changedWeight - remainingKeys.slice(0, -1)
          .reduce((sum, k) => sum + newWeights[k], 0)) * 100) / 100;
      } else {
        newWeights[key] = Math.round((weights[key] * ratio * remainingTotal / currentRemainingTotal) * 100) / 100;
      }
    });

    onWeightsChange(newWeights);
  };

  const impactDescriptions = {
    salesPerformance: "Based on recent sales performance trends. Strong sales may suggest room for price increases, while declining sales might indicate pricing pressure.",
    marketConditions: "Combines competitor price movements and market demand trends. Also considers how your historical price changes align with market conditions.",
    positioning: "Reflects your product's uniqueness and perceived value. High differentiation and strong value perception can support premium pricing."
  };

  const recommendation = calculateRecommendation();
  const { trend, volatility } = analyzePriceTrend();

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const getImpactDescription = (impact: number) => {
    if (impact > 7) return "strongly positive";
    if (impact > 3) return "positive";
    if (impact < -7) return "strongly negative";
    if (impact < -3) return "negative";
    return "neutral";
  };

  const getTrendIcon = () => {
    if (trend > 2) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend < -2) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-[#8B8B73]" />;
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="p-6 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
        <h3 className="text-xl font-medium text-[#4A4A3F] mb-4">Recommended Price Range</h3>
        <div className="text-2xl font-semibold text-center mb-2 text-[#4A4A3F]">
          ${formatPrice(recommendation.min)} - ${formatPrice(recommendation.max)}
        </div>
        <div className="text-sm text-center text-[#6B6B5F] mb-4">
          ({calculatePercentageDifference(recommendation.min).toFixed(1)}% to {calculatePercentageDifference(recommendation.max).toFixed(1)}% from current price)
        </div>
        <div className="text-sm text-[#6B6B5F] space-y-2">
          <div className="flex items-center gap-2">
            <span>Historical trend:</span>
            {getTrendIcon()}
            <span>{Math.abs(trend) < 2 ? "Stable" : 
              `${trend > 0 ? "Upward" : "Downward"} (${Math.abs(trend).toFixed(1)}%)`}
            </span>
          </div>
          {volatility > 2 && (
            <p className="text-orange-600">
              Note: Price history shows {volatility > 5 ? "high" : "moderate"} volatility 
              ({volatility.toFixed(1)}% variation)
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-[#4A4A3F]">Impact Factors</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Adjust the weights to customize how each factor influences the final price. 
              Total weight will always equal 100%.
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="p-4 bg-white rounded-lg border border-[#E5E5E0]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Label className="text-[#4A4A3F]">Sales Performance</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>{impactDescriptions.salesPerformance}</TooltipContent>
              </Tooltip>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#8B8B73] hover:text-[#4A4A3F]"
              onClick={() => onStepChange(2)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-[#6B6B5F] mb-3">
            Impact: {getImpactDescription(recommendation.impacts.sales)}
            <span className="text-xs ml-2">
              ({recommendation.impacts.sales > 0 ? "+" : ""}
              {recommendation.impacts.sales.toFixed(1)}%)
            </span>
          </div>
          <Slider
            value={[weights.salesPerformance]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => {
              balanceWeights(value, 'salesPerformance');
            }}
            className="w-full"
          />
          <div className="text-xs text-[#8B8B73] mt-2">
            Weight: {weights.salesPerformance.toFixed(1)}%
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-[#E5E5E0]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Label className="text-[#4A4A3F]">Market Conditions</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>{impactDescriptions.marketConditions}</TooltipContent>
              </Tooltip>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#8B8B73] hover:text-[#4A4A3F]"
              onClick={() => onStepChange(3)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-[#6B6B5F] mb-3">
            Impact: {getImpactDescription(recommendation.impacts.market)}
            <span className="text-xs ml-2">
              ({recommendation.impacts.market > 0 ? "+" : ""}
              {recommendation.impacts.market.toFixed(1)}%)
            </span>
          </div>
          <Slider
            value={[weights.marketConditions]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => {
              balanceWeights(value, 'marketConditions');
            }}
            className="w-full"
          />
          <div className="text-xs text-[#8B8B73] mt-2">
            Weight: {weights.marketConditions.toFixed(1)}%
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-[#E5E5E0]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Label className="text-[#4A4A3F]">Market Positioning</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>{impactDescriptions.positioning}</TooltipContent>
              </Tooltip>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#8B8B73] hover:text-[#4A4A3F]"
              onClick={() => onStepChange(4)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-[#6B6B5F] mb-3">
            Impact: {getImpactDescription(recommendation.impacts.positioning)}
            <span className="text-xs ml-2">
              ({recommendation.impacts.positioning > 0 ? "+" : ""}
              {recommendation.impacts.positioning.toFixed(1)}%)
            </span>
          </div>
          <Slider
            value={[weights.positioning]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => {
              balanceWeights(value, 'positioning');
            }}
            className="w-full"
          />
          <div className="text-xs text-[#8B8B73] mt-2">
            Weight: {weights.positioning.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};
