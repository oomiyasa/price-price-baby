
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Pencil } from "lucide-react";

interface ImpactFactorSliderProps {
  label: string;
  tooltipContent: string;
  impact: number;
  weight: number;
  onWeightChange: (value: number) => void;
  onClick?: () => void;
}

const getImpactDescription = (impact: number) => {
  if (impact > 7) return "strongly positive";
  if (impact > 3) return "positive";
  if (impact < -7) return "strongly negative";
  if (impact < -3) return "negative";
  return "neutral";
};

export const ImpactFactorSlider = ({
  label,
  tooltipContent,
  impact,
  weight,
  onWeightChange,
  onClick,
}: ImpactFactorSliderProps) => {
  return (
    <div 
      className="p-4 bg-white rounded-lg border border-[#E5E5E0] transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Label className="text-[#4A4A3F]">{label}</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>{tooltipContent}</TooltipContent>
          </Tooltip>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 p-0 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <Pencil className="h-4 w-4 text-[#8B8B73]" />
          <span className="sr-only">Edit {label}</span>
        </Button>
      </div>
      <div className="text-sm text-[#6B6B5F] mb-3">
        Impact: {getImpactDescription(impact)}
        <span className="text-xs ml-2">
          ({impact > 0 ? "+" : ""}
          {impact.toFixed(1)}%)
        </span>
      </div>
      <Slider
        value={[weight]}
        min={0}
        max={100}
        step={1}
        onValueChange={([value]) => onWeightChange(value)}
        className="w-full"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="text-xs text-[#8B8B73] mt-2">
        Weight: {weight.toFixed(1)}
      </div>
    </div>
  );
};
