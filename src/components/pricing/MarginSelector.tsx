
import { Slider } from "@/components/ui/slider";
import { industryMargins } from "@/constants/pricing";

interface MarginSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const MarginSelector = ({ value, onChange }: MarginSelectorProps) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto text-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">What's your target gross profit margin?</h2>
        <p className="text-lg text-[#4A4A3F]">{value}%</p>
        <p className="text-sm text-[#6B6B5F]">Target Gross Profit Margin</p>
        <p className="text-xs text-[#6B6B5F]">(Revenue - Cost of Goods Sold) ÷ Revenue × 100</p>
      </div>

      <div className="space-y-8">
        <div className="w-full px-4">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex justify-between text-sm text-[#6B6B5F] px-4">
          <div>
            <p>Conservative</p>
            <p>15-30%</p>
          </div>
          <div>
            <p>Balanced</p>
            <p>30-60%</p>
          </div>
          <div>
            <p>Aggressive</p>
            <p>60-90%+</p>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <p className="text-sm text-[#6B6B5F]">Note: Gross profit margins vary significantly by industry. For reference:</p>
        <div className="space-y-2 text-sm text-[#6B6B5F]">
          {Object.entries(industryMargins).map(([industry, margin]) => (
            <p key={industry}>• {industry}: {margin}</p>
          ))}
        </div>
        <p className="text-xs text-[#6B6B5F] mt-4">
          Sources: NYU Stern School of Business (2023), KPMG Industry Margins Report, S&P Capital IQ
        </p>
      </div>
    </div>
  );
};
