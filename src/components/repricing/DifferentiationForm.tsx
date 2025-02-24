
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface Feature {
  id: string;
  name: string;
  checked: boolean;
}

interface DifferentiationFormProps {
  selectedFeatures: Feature[];
  onFeatureChange: (features: Feature[]) => void;
  valueProposition: string;
  onValuePropositionChange: (value: string) => void;
}

export const DifferentiationForm = ({
  selectedFeatures,
  onFeatureChange,
  valueProposition,
  onValuePropositionChange,
}: DifferentiationFormProps) => {
  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const updatedFeatures = selectedFeatures.map(feature =>
      feature.id === featureId ? { ...feature, checked } : feature
    );
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Competitive Features Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Product Features
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Select the features that differentiate your product from competitors
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-4">
          {selectedFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={feature.id}
                checked={feature.checked}
                onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                className="border-[#8B8B73] data-[state=checked]:bg-[#8B8B73] data-[state=checked]:text-white"
              />
              <Label htmlFor={feature.id} className="text-[#4A4A3F]">{feature.name}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Label className="text-xl font-medium text-[#4A4A3F]">
            Value Proposition
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Describe what makes your product unique in the market
            </TooltipContent>
          </Tooltip>
        </div>
        
        <Textarea
          value={valueProposition}
          onChange={(e) => onValuePropositionChange(e.target.value)}
          placeholder="What makes your product stand out from competitors?"
          className="min-h-[100px] border-[#8B8B73] text-[#4A4A3F] placeholder:text-[#8B8B73]/50"
        />
      </div>

      {/* Differentiation Summary */}
      {(selectedFeatures.some(f => f.checked) || valueProposition) && (
        <div className="p-4 bg-[#FAFAFA] rounded-lg border border-[#E5E5E0]">
          <h3 className="text-lg font-medium text-[#4A4A3F] mb-3">Differentiation Summary</h3>
          <div className="space-y-2 text-sm text-[#6B6B5F]">
            {selectedFeatures.some(f => f.checked) && (
              <p>
                • Your product offers {selectedFeatures.filter(f => f.checked).length} key differentiating features
              </p>
            )}
            {valueProposition && (
              <p>
                • Your unique value proposition focuses on {valueProposition.split(' ').slice(0, 10).join(' ')}...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
