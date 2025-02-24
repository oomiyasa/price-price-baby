
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COGSData, IndustryConfig } from "@/types/cogs";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CostsCalculatorProps {
  data: COGSData;
  config: IndustryConfig;
  onUpdate: (updates: Partial<COGSData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CostsCalculator = ({
  data,
  config,
  onUpdate,
  onNext,
  onBack,
}: CostsCalculatorProps) => {
  const handleCostChange = (costId: string, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    onUpdate({
      directCosts: {
        ...data.directCosts,
        [costId]: numValue
      }
    });
  };

  const isValid = () => {
    return config.directCosts.every(cost => 
      (data.directCosts[cost.id] || 0) >= 0
    );
  };

  return (
    <>
      <CardHeader className="text-center border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">Cost Analysis</h2>
        <p className="text-[#6B6B5F]">Enter your direct costs</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-[#4A4A3F]">Direct Costs</h3>
          {config.directCosts.map((cost) => (
            <div key={cost.id} className="space-y-2">
              <Label htmlFor={cost.id}>{cost.label}</Label>
              <Input
                id={cost.id}
                type="number"
                placeholder={cost.placeholder}
                value={data.directCosts[cost.id] || ""}
                onChange={(e) => handleCostChange(cost.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid()}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </>
  );
};
