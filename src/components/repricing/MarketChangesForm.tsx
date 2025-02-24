
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MarketChangesFormProps {
  competitorPrices: "increased" | "decreased" | "mixed" | "unchanged" | null;
  onCompetitorPricesChange: (value: "increased" | "decreased" | "mixed" | "unchanged") => void;
  marketDemand: "growing" | "shrinking" | "stable" | null;
  onMarketDemandChange: (value: "growing" | "shrinking" | "stable") => void;
}

export const MarketChangesForm = ({
  competitorPrices,
  onCompetitorPricesChange,
  marketDemand,
  onMarketDemandChange,
}: MarketChangesFormProps) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Competitor Prices Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Competitor Price Trends
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              How have your competitors' prices changed recently?
            </TooltipContent>
          </Tooltip>
        </div>

        <RadioGroup
          value={competitorPrices || ""}
          onValueChange={value => onCompetitorPricesChange(value as any)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="increased" id="increased" className="border-[#8B8B73]" />
            <Label htmlFor="increased" className="text-[#4A4A3F]">Prices have generally increased</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="decreased" id="decreased" className="border-[#8B8B73]" />
            <Label htmlFor="decreased" className="text-[#4A4A3F]">Prices have generally decreased</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixed" id="mixed" className="border-[#8B8B73]" />
            <Label htmlFor="mixed" className="text-[#4A4A3F]">Mixed price changes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unchanged" id="unchanged" className="border-[#8B8B73]" />
            <Label htmlFor="unchanged" className="text-[#4A4A3F]">No significant changes</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Market Demand Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Market Demand
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              How is the overall market demand trending?
            </TooltipContent>
          </Tooltip>
        </div>

        <RadioGroup
          value={marketDemand || ""}
          onValueChange={value => onMarketDemandChange(value as any)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="growing" id="growing" className="border-[#8B8B73]" />
            <Label htmlFor="growing" className="text-[#4A4A3F]">Growing demand</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="stable" id="stable" className="border-[#8B8B73]" />
            <Label htmlFor="stable" className="text-[#4A4A3F]">Stable demand</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="shrinking" id="shrinking" className="border-[#8B8B73]" />
            <Label htmlFor="shrinking" className="text-[#4A4A3F]">Shrinking demand</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Market Summary */}
      {(competitorPrices || marketDemand) && (
        <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
          <h3 className="text-lg font-medium text-[#4A4A3F] mb-3">Market Summary</h3>
          <div className="space-y-2 text-sm text-[#6B6B5F]">
            {competitorPrices && (
              <p>
                • Competitor prices have {
                  competitorPrices === "increased" ? "shown an upward trend" :
                  competitorPrices === "decreased" ? "shown a downward trend" :
                  competitorPrices === "mixed" ? "shown mixed movements" :
                  "remained relatively stable"
                }
              </p>
            )}
            {marketDemand && (
              <p>
                • Market demand is {
                  marketDemand === "growing" ? "expanding, suggesting potential for growth" :
                  marketDemand === "stable" ? "steady, indicating market maturity" :
                  "contracting, requiring careful pricing strategy"
                }
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
