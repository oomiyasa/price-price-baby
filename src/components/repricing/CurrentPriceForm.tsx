
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plus, X } from "lucide-react";

interface CurrentPriceFormProps {
  currentPrice: string;
  onCurrentPriceChange: (value: string) => void;
  historicalPrices?: string[];
  onHistoricalPricesChange?: (prices: string[]) => void;
}

const validateNumberInput = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, '');
  return cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue) ? cleanValue : '';
};

export const CurrentPriceForm = ({
  currentPrice,
  onCurrentPriceChange,
  historicalPrices = [],
  onHistoricalPricesChange = () => {},
}: CurrentPriceFormProps) => {
  const handleAddHistoricalPrice = () => {
    onHistoricalPricesChange([...historicalPrices, '']);
  };

  const handleHistoricalPriceChange = (index: number, value: string) => {
    const newPrices = [...historicalPrices];
    newPrices[index] = validateNumberInput(value);
    onHistoricalPricesChange(newPrices);
  };

  const handleRemoveHistoricalPrice = (index: number) => {
    const newPrices = historicalPrices.filter((_, i) => i !== index);
    onHistoricalPricesChange(newPrices);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Current Price Input */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label htmlFor="currentPrice" className="text-xl font-medium text-[#4A4A3F]">
            Current Price
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Enter your current selling price per unit/service
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="space-y-4">
          <Input
            id="currentPrice"
            type="text"
            value={currentPrice}
            onChange={(e) => onCurrentPriceChange(validateNumberInput(e.target.value))}
            className="border-[#8B8B73] text-lg"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Historical Prices Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Label className="text-xl font-medium text-[#4A4A3F]">
              Historical Prices
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Add your previous prices to help analyze pricing trends
              </TooltipContent>
            </Tooltip>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddHistoricalPrice}
            className="border-[#8B8B73] text-[#4A4A3F]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Price
          </Button>
        </div>
        
        <div className="space-y-3">
          {historicalPrices.map((price, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="text"
                value={price}
                onChange={(e) => handleHistoricalPriceChange(index, e.target.value)}
                className="border-[#8B8B73]"
                placeholder="0.00"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveHistoricalPrice(index)}
                className="text-[#8B8B73] hover:text-[#4A4A3F]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {historicalPrices.length === 0 && (
            <p className="text-[#8B8B73] text-sm italic">
              No historical prices added yet
            </p>
          )}
        </div>
      </div>

      {/* Pricing Position Summary */}
      {currentPrice && (
        <div className="mt-6 p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
          <h3 className="text-lg font-medium text-[#4A4A3F] mb-3">Current Position</h3>
          <div className="space-y-2 text-sm text-[#6B6B5F]">
            <p>
              • Your current price is ${currentPrice}
            </p>
            {historicalPrices.length > 0 && (
              <>
                <p>
                  • Historical price range: ${Math.min(...historicalPrices.map(p => Number(p) || 0)).toFixed(2)} - ${Math.max(...historicalPrices.map(p => Number(p) || 0)).toFixed(2)}
                </p>
                <p>
                  • Price change trend: {
                    historicalPrices.length > 1 
                      ? Number(currentPrice) > Number(historicalPrices[historicalPrices.length - 1])
                        ? "Increasing"
                        : Number(currentPrice) < Number(historicalPrices[historicalPrices.length - 1])
                        ? "Decreasing"
                        : "Stable"
                      : "Not enough data"
                  }
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
