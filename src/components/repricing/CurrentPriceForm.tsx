
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface CurrentPriceFormProps {
  currentPrice: string;
  onCurrentPriceChange: (value: string) => void;
}

const validateNumberInput = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, '');
  return cleanValue === '' || /^\d*\.?\d*$/.test(cleanValue) ? cleanValue : '';
};

export const CurrentPriceForm = ({
  currentPrice,
  onCurrentPriceChange,
}: CurrentPriceFormProps) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
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
    </div>
  );
};
