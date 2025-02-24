
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="space-y-12 max-w-2xl mx-auto">
      {/* Competitor Prices Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-[#4A4A3F] mb-2">
            Competitor prices are generally:
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onCompetitorPricesChange("decreased")}
            className={cn(
              "p-4 rounded-lg border border-[#E5E5E0] hover:border-[#8B8B73] transition-colors",
              "text-[#4A4A3F] font-medium",
              competitorPrices === "decreased" && "bg-[#FAFAFA] border-[#8B8B73]"
            )}
          >
            Lower
          </button>
          <button
            onClick={() => onCompetitorPricesChange("unchanged")}
            className={cn(
              "p-4 rounded-lg border border-[#E5E5E0] hover:border-[#8B8B73] transition-colors",
              "text-[#4A4A3F] font-medium",
              competitorPrices === "unchanged" && "bg-[#FAFAFA] border-[#8B8B73]"
            )}
          >
            Similar
          </button>
          <button
            onClick={() => onCompetitorPricesChange("increased")}
            className={cn(
              "p-4 rounded-lg border border-[#E5E5E0] hover:border-[#8B8B73] transition-colors",
              "text-[#4A4A3F] font-medium",
              competitorPrices === "increased" && "bg-[#FAFAFA] border-[#8B8B73]"
            )}
          >
            Higher
          </button>
        </div>
      </div>

      {/* Market Demand Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium text-[#4A4A3F] mb-2">
            Market demand is:
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onMarketDemandChange("shrinking")}
            className={cn(
              "p-4 rounded-lg border border-[#E5E5E0] hover:border-[#8B8B73] transition-colors",
              "text-[#4A4A3F] font-medium",
              marketDemand === "shrinking" && "bg-[#FAFAFA] border-[#8B8B73]"
            )}
          >
            Decreasing
          </button>
          <button
            onClick={() => onMarketDemandChange("stable")}
            className={cn(
              "p-4 rounded-lg border border-[#E5E5E0] hover:border-[#8B8B73] transition-colors",
              "text-[#4A4A3F] font-medium",
              marketDemand === "stable" && "bg-[#FAFAFA] border-[#8B8B73]"
            )}
          >
            Stable
          </button>
          <button
            onClick={() => onMarketDemandChange("growing")}
            className={cn(
              "p-4 rounded-lg border border-[#E5E5E0] hover:border-[#8B8B73] transition-colors",
              "text-[#4A4A3F] font-medium",
              marketDemand === "growing" && "bg-[#FAFAFA] border-[#8B8B73]"
            )}
          >
            Increasing
          </button>
        </div>
      </div>

      {/* Market Summary */}
      {(competitorPrices || marketDemand) && (
        <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
          <h3 className="text-lg font-medium text-[#4A4A3F] mb-3">Market Summary</h3>
          <div className="space-y-2 text-sm text-[#6B6B5F]">
            {competitorPrices && (
              <p>
                • Competitor prices are generally {
                  competitorPrices === "increased" ? "higher" :
                  competitorPrices === "decreased" ? "lower" :
                  competitorPrices === "mixed" ? "mixed" :
                  "similar"
                } than before
              </p>
            )}
            {marketDemand && (
              <p>
                • Market demand is {
                  marketDemand === "growing" ? "increasing" :
                  marketDemand === "stable" ? "stable" :
                  "decreasing"
                }
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
