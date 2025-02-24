
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { PriceRecommendationSummary } from "./PriceRecommendationSummary";
import { ImpactFactorSlider } from "./ImpactFactorSlider";
import { EditSalesDialog } from "./EditSalesDialog";
import { EditMarketDialog } from "./EditMarketDialog";
import { EditDifferentiationDialog } from "./EditDifferentiationDialog";
import { SalesPerformance } from "@/types/repricing";
import { analyzePriceTrend } from "@/utils/priceTrendAnalysis";
import { calculateRecommendation } from "@/utils/priceImpactCalculations";
import { impactDescriptions } from "@/constants/impactDescriptions";

interface RecommendationsFormProps {
  currentPrice: string;
  historicalPrices?: string[];
  salesPerformance: number;
  competitorPrices: "increased" | "decreased" | "mixed" | "unchanged" | null;
  marketDemand: "growing" | "shrinking" | "stable" | null;
  uniqueness: "low" | "medium" | "high";
  valuePerception: number;
  onStepChange: (step: number) => void;
  onSalesPerformanceChange: (value: SalesPerformance) => void;
  onCompetitorPricesChange: (value: "increased" | "decreased" | "mixed" | "unchanged") => void;
  onMarketDemandChange: (value: "growing" | "shrinking" | "stable") => void;
  onUniquenessChange: (value: "low" | "medium" | "high") => void;
  onValuePerceptionChange: (value: number) => void;
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
  onSalesPerformanceChange,
  onCompetitorPricesChange,
  onMarketDemandChange,
  onUniquenessChange,
  onValuePerceptionChange,
  weights = {
    salesPerformance: 33.33,
    marketConditions: 33.33,
    positioning: 33.34,
  },
  onWeightsChange = () => {},
}: RecommendationsFormProps) => {
  const { trend, volatility } = analyzePriceTrend(historicalPrices, currentPrice);
  const recommendation = calculateRecommendation(
    currentPrice,
    historicalPrices,
    salesPerformance,
    competitorPrices,
    marketDemand,
    uniqueness,
    valuePerception,
    weights
  );

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

        <EditSalesDialog
          salesPerformance={salesPerformance}
          onSalesPerformanceChange={onSalesPerformanceChange}
          trigger={
            <ImpactFactorSlider
              label="Sales Performance"
              tooltipContent={impactDescriptions.salesPerformance}
              impact={recommendation.impacts.sales}
              weight={weights.salesPerformance}
              onWeightChange={(value) =>
                onWeightsChange({ ...weights, salesPerformance: value })
              }
            />
          }
        />

        <EditMarketDialog
          competitorPrices={competitorPrices}
          onCompetitorPricesChange={onCompetitorPricesChange}
          marketDemand={marketDemand}
          onMarketDemandChange={onMarketDemandChange}
          trigger={
            <ImpactFactorSlider
              label="Market Conditions"
              tooltipContent={impactDescriptions.marketConditions}
              impact={recommendation.impacts.market}
              weight={weights.marketConditions}
              onWeightChange={(value) =>
                onWeightsChange({ ...weights, marketConditions: value })
              }
            />
          }
        />

        <EditDifferentiationDialog
          uniqueness={uniqueness}
          onUniquenessChange={onUniquenessChange}
          valuePerception={valuePerception}
          onValuePerceptionChange={onValuePerceptionChange}
          trigger={
            <ImpactFactorSlider
              label="Market Positioning"
              tooltipContent={impactDescriptions.positioning}
              impact={recommendation.impacts.positioning}
              weight={weights.positioning}
              onWeightChange={(value) =>
                onWeightsChange({ ...weights, positioning: value })
              }
            />
          }
        />
      </div>
    </div>
  );
};
