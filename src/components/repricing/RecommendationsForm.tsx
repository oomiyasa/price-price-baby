
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle, Edit2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RecommendationsFormProps {
  currentPrice: string;
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
  const calculateSalesImpact = () => {
    // Returns a percentage adjustment based on sales performance
    if (salesPerformance <= -30) return -10;
    if (salesPerformance <= -10) return -5;
    if (salesPerformance >= 30) return 10;
    if (salesPerformance >= 10) return 5;
    return 0;
  };

  const calculateMarketImpact = () => {
    let impact = 0;
    
    // Competitor prices impact
    if (competitorPrices === "increased") impact += 5;
    if (competitorPrices === "decreased") impact -= 5;
    
    // Market demand impact
    if (marketDemand === "growing") impact += 5;
    if (marketDemand === "shrinking") impact -= 5;
    
    return impact;
  };

  const calculatePositioningImpact = () => {
    let impact = 0;
    
    // Uniqueness impact
    if (uniqueness === "high") impact += 5;
    if (uniqueness === "low") impact -= 5;
    
    // Value perception impact (converts 0-100 scale to -5 to +5)
    impact += ((valuePerception - 50) / 10);
    
    return impact;
  };

  const calculateRecommendation = () => {
    const basePrice = parseFloat(currentPrice);
    if (isNaN(basePrice)) return { min: 0, max: 0 };

    const salesImpact = calculateSalesImpact() * (weights.salesPerformance / 100);
    const marketImpact = calculateMarketImpact() * (weights.marketConditions / 100);
    const positioningImpact = calculatePositioningImpact() * (weights.positioning / 100);
    
    const totalImpact = salesImpact + marketImpact + positioningImpact;
    
    return {
      min: basePrice * (1 + (totalImpact - 2) / 100),
      max: basePrice * (1 + (totalImpact + 2) / 100),
    };
  };

  const recommendation = calculateRecommendation();

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

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Recommendations Summary */}
      <div className="p-6 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
        <h3 className="text-xl font-medium text-[#4A4A3F] mb-4">Recommended Price Range</h3>
        <div className="text-2xl font-semibold text-center mb-6 text-[#4A4A3F]">
          ${formatPrice(recommendation.min)} - ${formatPrice(recommendation.max)}
        </div>
      </div>

      {/* Impact Factors */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-[#4A4A3F]">Impact Factors</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Adjust the weights to customize how each factor influences the final price
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Sales Performance */}
        <div className="p-4 bg-white rounded-lg border border-[#E5E5E0]">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-[#4A4A3F]">Sales Performance</Label>
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
            Impact: {getImpactDescription(calculateSalesImpact())}
          </div>
          <Slider
            value={[weights.salesPerformance]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => {
              onWeightsChange({
                ...weights,
                salesPerformance: value,
              });
            }}
            className="w-full"
          />
          <div className="text-xs text-[#8B8B73] mt-2">
            Weight: {weights.salesPerformance.toFixed(1)}%
          </div>
        </div>

        {/* Market Conditions */}
        <div className="p-4 bg-white rounded-lg border border-[#E5E5E0]">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-[#4A4A3F]">Market Conditions</Label>
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
            Impact: {getImpactDescription(calculateMarketImpact())}
          </div>
          <Slider
            value={[weights.marketConditions]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => {
              onWeightsChange({
                ...weights,
                marketConditions: value,
              });
            }}
            className="w-full"
          />
          <div className="text-xs text-[#8B8B73] mt-2">
            Weight: {weights.marketConditions.toFixed(1)}%
          </div>
        </div>

        {/* Market Positioning */}
        <div className="p-4 bg-white rounded-lg border border-[#E5E5E0]">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-[#4A4A3F]">Market Positioning</Label>
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
            Impact: {getImpactDescription(calculatePositioningImpact())}
          </div>
          <Slider
            value={[weights.positioning]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => {
              onWeightsChange({
                ...weights,
                positioning: value,
              });
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
