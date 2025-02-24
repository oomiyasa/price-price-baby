
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { COGSData } from "@/types/cogs";
import { marginRanges } from "@/constants/cogsCalculator";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MarginTargetProps {
  data: COGSData;
  onUpdate: (updates: Partial<COGSData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MarginTarget = ({
  data,
  onUpdate,
  onNext,
  onBack,
}: MarginTargetProps) => {
  const handleSliderChange = (values: number[]) => {
    onUpdate({ targetMargin: values[0] });
  };

  return (
    <>
      <CardHeader className="text-center border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">Target Margin</h2>
        <p className="text-[#6B6B5F]">Set your target gross profit margin</p>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        <div className="text-center">
          <span className="text-4xl font-semibold text-[#4A4A3F]">
            {data.targetMargin}%
          </span>
          <p className="text-sm text-[#6B6B5F] mt-1">Target Gross Margin</p>
        </div>

        <div className="space-y-8">
          <Slider
            value={[data.targetMargin]}
            onValueChange={handleSliderChange}
            max={100}
            step={1}
            className="w-full"
          />

          <div className="grid grid-cols-3 text-center text-sm">
            <div>
              <p className="font-medium text-[#4A4A3F]">Conservative</p>
              <p className="text-[#6B6B5F]">{marginRanges.conservative.min}-{marginRanges.conservative.max}%</p>
            </div>
            <div>
              <p className="font-medium text-[#4A4A3F]">Balanced</p>
              <p className="text-[#6B6B5F]">{marginRanges.balanced.min}-{marginRanges.balanced.max}%</p>
            </div>
            <div>
              <p className="font-medium text-[#4A4A3F]">Aggressive</p>
              <p className="text-[#6B6B5F]">{marginRanges.aggressive.min}%+</p>
            </div>
          </div>
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
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          View Recommendations
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </>
  );
};
