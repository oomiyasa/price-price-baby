
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { PriceRecommendationSummary } from "./PriceRecommendationSummary";
import { ImpactFactorSlider } from "./ImpactFactorSlider";

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
    
    const rawSalesImpact = calculateSalesImpact();
    const rawMarketImpact = calculateMarketImpact();
    const rawPositioningImpact = calculatePositioningImpact();
    
    const totalWeight = weights.salesPerformance + weights.marketConditions + weights.positioning;
    
    const salesImpact = rawSalesImpact * (weights.salesPerformance / 100);
    const marketImpact = rawMarketImpact * (weights.marketConditions / 100);
    const positioningImpact = rawPositioningImpact * (weights.positioning / 100);
    
    const weightIntensityFactor = Math.min(totalWeight / 100, 2);
    const totalImpact = (salesImpact + marketImpact + positioningImpact) * weightIntensityFactor;
    
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

  const { trend, volatility } = analyzePriceTrend();
  const recommendation = calculateRecommendation();

  const impactDescriptions = {
    salesPerformance: "Based on recent sales performance trends. Strong sales may suggest room for price increases, while declining sales might indicate pricing pressure.",
    marketConditions: "Combines competitor price movements and market demand trends. Also considers how your historical price changes align with market conditions.",
    positioning: "Reflects your product's uniqueness and perceived value. High differentiation and strong value perception can support premium pricing."
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <PriceRecommendationSummary
        min={recommendation.min}
        max={recommendation.max}
        currentPrice={currentPrice}
        trend={trend}
        volatility={volatility}
        historicalPrices={historicalPrices.map((price, index) => ({
          price,
          timeAgo: 1,
          timeUnit: 'months'
        }))}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-[#4A4A3F]">Impact Factors</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Adjust the importance of each factor. Higher values increase that factor's influence on the final price.
            </TooltipContent>
          </Tooltip>
        </div>

        <ImpactFactorSlider
          label="Sales Performance"
          tooltipContent={impactDescriptions.salesPerformance}
          impact={recommendation.impacts.sales}
          weight={weights.salesPerformance}
          onWeightChange={(value) =>
            onWeightsChange({ ...weights, salesPerformance: value })
          }
          onEdit={() => onStepChange(2)}
        />

        <ImpactFactorSlider
          label="Market Conditions"
          tooltipContent={impactDescriptions.marketConditions}
          impact={recommendation.impacts.market}
          weight={weights.marketConditions}
          onWeightChange={(value) =>
            onWeightsChange({ ...weights, marketConditions: value })
          }
          onEdit={() => onStepChange(3)}
        />

        <ImpactFactorSlider
          label="Market Positioning"
          tooltipContent={impactDescriptions.positioning}
          impact={recommendation.impacts.positioning}
          weight={weights.positioning}
          onWeightChange={(value) =>
            onWeightsChange({ ...weights, positioning: value })
          }
          onEdit={() => onStepChange(4)}
        />
      </div>
    </div>
  );
};
