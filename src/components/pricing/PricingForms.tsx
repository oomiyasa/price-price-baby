
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface PricingFormProps {
  costPerUnit: string;
  marketPrice: string;
  competitorLow: string;
  competitorHigh: string;
  onCostChange: (value: string) => void;
  onMarketPriceChange: (value: string) => void;
  onCompetitorLowChange: (value: string) => void;
  onCompetitorHighChange: (value: string) => void;
}

const validateNumberInput = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, '');
  return cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue) ? cleanValue : '';
};

export const CostBasedForm = ({ costPerUnit, onCostChange }: Pick<PricingFormProps, 'costPerUnit' | 'onCostChange'>) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="costPerUnit" className="text-xl font-medium text-[#4A4A3F]">Enter your total cost per unit/service</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Include all direct costs (materials, labor) and indirect costs (overhead) per unit
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="space-y-4">
          <Input
            id="costPerUnit"
            type="text"
            value={costPerUnit}
            onChange={(e) => onCostChange(validateNumberInput(e.target.value))}
            className="border-[#8B8B73] text-lg"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
};

export const MarketBasedForm = ({
  marketPrice,
  competitorLow,
  competitorHigh,
  onMarketPriceChange,
  onCompetitorLowChange,
  onCompetitorHighChange,
}: Omit<PricingFormProps, 'costPerUnit' | 'onCostChange'>) => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="marketPrice">Average Market Price</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              The typical price point for similar products/services in your market
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="marketPrice"
          type="text"
          value={marketPrice}
          onChange={(e) => onMarketPriceChange(validateNumberInput(e.target.value))}
          className="border-[#8B8B73]"
          placeholder="0.00"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="competitorLow">Lowest Competitor Price</Label>
          <Input
            id="competitorLow"
            type="text"
            value={competitorLow}
            onChange={(e) => onCompetitorLowChange(validateNumberInput(e.target.value))}
            className="border-[#8B8B73]"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="competitorHigh">Highest Competitor Price</Label>
          <Input
            id="competitorHigh"
            type="text"
            value={competitorHigh}
            onChange={(e) => onCompetitorHighChange(validateNumberInput(e.target.value))}
            className="border-[#8B8B73]"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
};
