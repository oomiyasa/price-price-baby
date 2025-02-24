
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PricingPath } from "@/types/pricing";

interface StepHeaderProps {
  step: number;
  pricingPath: PricingPath;
}

export const StepHeader = ({ step, pricingPath }: StepHeaderProps) => {
  return (
    <CardHeader className="text-center border-b border-gray-100">
      <CardTitle className="text-[#4A4A3F] text-2xl">
        {step === 6 ? "Your Pricing Recommendation" :
         step === 5 ? "Target Gross Profit Margin" : 
         step === 1 ? "Select Your Company Type" : 
         step === 2 ? "Choose Your Pricing Path" :
         step === 3 ? (pricingPath === "cost" ? "Cost-Based Pricing Details" : "Market Research Details") :
         "Select Your Pricing Strategy"}
      </CardTitle>
      <CardDescription className="text-[#6B6B5F]">
        {step === 6 ? "Based on your inputs, here's our recommended pricing strategy" :
         step === 5 ? "Set your target margin based on your business goals and industry benchmarks" : 
         step === 1 ? "Choose the option that best describes your business" : 
         step === 2 ? "Select the pricing strategy that aligns with your goals" :
         step === 3 ? (pricingPath === "cost" ? "Enter your costs to calculate optimal pricing" : "Enter market research data to determine competitive pricing") :
         "Choose how you want to position your pricing relative to the market"}
      </CardDescription>
    </CardHeader>
  );
};
