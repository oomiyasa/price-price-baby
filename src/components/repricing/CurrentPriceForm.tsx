
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface HistoricalPrice {
  price: string;
  timeAgo: number;
  timeUnit: 'days' | 'weeks' | 'months' | 'years';
}

interface CurrentPriceFormProps {
  currentPrice: string;
  onCurrentPriceChange: (price: string) => void;
  historicalPrices: string[];
  onHistoricalPricesChange: (prices: string[]) => void;
}

export const CurrentPriceForm = ({
  currentPrice,
  onCurrentPriceChange,
  historicalPrices,
  onHistoricalPricesChange,
}: CurrentPriceFormProps) => {
  const [pricesWithTime, setPricesWithTime] = useState<HistoricalPrice[]>(
    historicalPrices.map(price => ({
      price,
      timeAgo: 1,
      timeUnit: 'months' as const
    }))
  );

  const updateHistoricalPrices = (newPricesWithTime: HistoricalPrice[]) => {
    setPricesWithTime(newPricesWithTime);
    onHistoricalPricesChange(newPricesWithTime.map(p => p.price));
  };

  const addHistoricalPrice = () => {
    updateHistoricalPrices([
      ...pricesWithTime,
      { price: '', timeAgo: 1, timeUnit: 'months' }
    ]);
  };

  const removeHistoricalPrice = (index: number) => {
    const newPrices = [...pricesWithTime];
    newPrices.splice(index, 1);
    updateHistoricalPrices(newPrices);
  };

  const updatePrice = (index: number, price: string) => {
    const newPrices = [...pricesWithTime];
    newPrices[index].price = price;
    updateHistoricalPrices(newPrices);
  };

  const updateTimeAgo = (index: number, value: string) => {
    const newPrices = [...pricesWithTime];
    newPrices[index].timeAgo = parseInt(value) || 1;
    updateHistoricalPrices(newPrices);
  };

  const updateTimeUnit = (index: number, unit: 'days' | 'weeks' | 'months' | 'years') => {
    const newPrices = [...pricesWithTime];
    newPrices[index].timeUnit = unit;
    updateHistoricalPrices(newPrices);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Current Price
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Enter your current selling price
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg text-[#6B6B5F]">$</span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={currentPrice}
            onChange={(e) => onCurrentPriceChange(e.target.value)}
            className="max-w-[200px]"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Label className="text-xl font-medium text-[#4A4A3F]">
              Previous Prices
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Add your previous selling prices and when they were changed
              </TooltipContent>
            </Tooltip>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addHistoricalPrice}
            className="border-[#8B8B73] text-[#4A4A3F]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Price
          </Button>
        </div>

        <div className="space-y-3">
          {pricesWithTime.map((priceData, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-lg text-[#6B6B5F]">$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={priceData.price}
                onChange={(e) => updatePrice(index, e.target.value)}
                className="max-w-[200px]"
                placeholder="0.00"
              />
              <span className="text-sm text-[#6B6B5F]">changed</span>
              <Input
                type="number"
                min="1"
                value={priceData.timeAgo}
                onChange={(e) => updateTimeAgo(index, e.target.value)}
                className="max-w-[80px]"
              />
              <Select
                value={priceData.timeUnit}
                onValueChange={(value: 'days' | 'weeks' | 'months' | 'years') => 
                  updateTimeUnit(index, value)
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">days ago</SelectItem>
                  <SelectItem value="weeks">weeks ago</SelectItem>
                  <SelectItem value="months">months ago</SelectItem>
                  <SelectItem value="years">years ago</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeHistoricalPrice(index)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
