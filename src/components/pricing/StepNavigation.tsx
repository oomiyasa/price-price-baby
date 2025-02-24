
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PricingPath } from "@/types/pricing";

interface StepNavigationProps {
  step: number;
  pricingPath: PricingPath;
  getStepCount: () => number;
  handlePreviousStep: () => void;
  handleCostBasedNext: () => void;
  handleMarketBasedNext: () => void;
  handleMarginNext: () => void;
  setStep: (step: number) => void;
}

export const StepNavigation = ({
  step,
  pricingPath,
  getStepCount,
  handlePreviousStep,
  handleCostBasedNext,
  handleMarketBasedNext,
  handleMarginNext,
  setStep,
}: StepNavigationProps) => {
  return (
    <div className="mt-6 flex justify-between">
      {step > 1 && step < getStepCount() + 1 && (
        <Button
          variant="outline"
          className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
          onClick={handlePreviousStep}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
      )}
      {(step === 3 || step === 4 || step === 5) && (
        <Button 
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F] ml-auto"
          onClick={
            step === 3 ? (pricingPath === "cost" ? handleCostBasedNext : handleMarketBasedNext) :
            step === 4 ? () => setStep(5) :
            handleMarginNext
          }
        >
          {step === 5 ? "View Recommendation" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
