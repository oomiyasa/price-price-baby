
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface DifferentiationFormProps {
  uniqueness: "low" | "medium" | "high";
  onUniquenessChange: (value: "low" | "medium" | "high") => void;
  valuePerception: number;
  onValuePerceptionChange: (value: number) => void;
}

export const DifferentiationForm = ({
  uniqueness = "medium",
  onUniquenessChange,
  valuePerception = 50,
  onValuePerceptionChange,
}: DifferentiationFormProps) => {
  const getUniquenessLabel = (value: string) => {
    switch (value) {
      case "low":
        return "Similar to others";
      case "medium":
        return "Somewhat unique";
      case "high":
        return "Highly unique";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Uniqueness Rating */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Market Uniqueness
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              How unique is your offering compared to competitors?
            </TooltipContent>
          </Tooltip>
        </div>

        <RadioGroup
          value={uniqueness}
          onValueChange={onUniquenessChange}
          className="grid grid-cols-3 gap-4"
        >
          {["low", "medium", "high"].map((value) => (
            <div
              key={value}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border border-[#E5E5E0] cursor-pointer transition-colors",
                uniqueness === value && "bg-[#FAFAFA] border-[#8B8B73]"
              )}
              onClick={() => onUniquenessChange(value as "low" | "medium" | "high")}
            >
              <Label className="text-[#4A4A3F] font-medium capitalize mb-1">
                {value}
              </Label>
              <span className="text-sm text-[#6B6B5F]">
                {getUniquenessLabel(value)}
              </span>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Value Perception Slider */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Value Perception
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              How do customers perceive your value relative to price?
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between text-sm text-[#6B6B5F]">
            <span>Low value for money</span>
            <span>Fair value</span>
            <span>High value for money</span>
          </div>
          
          <Slider
            value={[valuePerception]}
            min={0}
            max={100}
            step={1}
            onValueChange={([value]) => onValuePerceptionChange(value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Summary */}
      {(uniqueness || valuePerception !== 50) && (
        <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
          <h3 className="text-lg font-medium text-[#4A4A3F] mb-3">Market Position Summary</h3>
          <div className="space-y-2 text-sm text-[#6B6B5F]">
            <p>
              • Market position: {getUniquenessLabel(uniqueness)} with {
                valuePerception < 40 ? "below average" :
                valuePerception < 60 ? "average" :
                "above average"
              } perceived value
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
