
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COGSData, IndustryConfig } from "@/types/cogs";
import { calculateGrossMargin, calculateRequiredRevenue } from "@/constants/cogsCalculator";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecommendationsProps {
  data: COGSData;
  config: IndustryConfig;
  onUpdate: (updates: Partial<COGSData>) => void;
  onBack: () => void;
}

export const Recommendations = ({
  data,
  config,
  onUpdate,
  onBack,
}: RecommendationsProps) => {
  const navigate = useNavigate();
  const totalCosts = Object.values(data.directCosts).reduce((sum, cost) => sum + (cost || 0), 0) + 
    (data.indirectCosts || 0);
  
  const currentMargin = calculateGrossMargin(data.revenue, totalCosts);
  const requiredRevenue = calculateRequiredRevenue(totalCosts, data.targetMargin);
  const revenueGap = requiredRevenue - data.revenue;

  const getRecommendation = () => {
    if (currentMargin >= data.targetMargin) {
      return "You're currently exceeding your target margin. Consider reinvesting excess profits or building a safety margin for future cost increases.";
    } else if (currentMargin >= data.targetMargin * 0.9) {
      return "You're close to your target margin. Focus on gradual price increases or cost optimization to bridge the small gap.";
    } else if (currentMargin >= data.targetMargin * 0.7) {
      return "Consider a combination of price increases and cost reduction strategies to reach your target margin.";
    } else {
      return "Significant changes needed. Review pricing strategy, consider restructuring costs, or explore new revenue streams.";
    }
  };

  return (
    <>
      <CardHeader className="text-center border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">COGS & Margin Analysis</h2>
        <p className="text-[#6B6B5F]">Review your cost structure and margin targets</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[#4A4A3F]">Industry</h3>
              <span className="text-[#6B6B5F]">{data.industry}</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[#6B6B5F]">Total COGS</h4>
                <span className="font-medium text-[#4A4A3F]">
                  ${totalCosts.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <h4 className="text-[#6B6B5F]">Current Revenue</h4>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#4A4A3F]">
                    ${data.revenue.toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      const newRevenue = prompt("Enter new revenue amount:", data.revenue.toString());
                      if (newRevenue && !isNaN(parseFloat(newRevenue))) {
                        onUpdate({ revenue: parseFloat(newRevenue) });
                      }
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <h4 className="text-[#6B6B5F]">Current Margin</h4>
                <span className="font-medium text-[#4A4A3F]">
                  {currentMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-medium text-[#4A4A3F]">Target Analysis</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[#6B6B5F]">Target Margin</h4>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#4A4A3F]">
                    {data.targetMargin}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      const newTarget = prompt("Enter new target margin:", data.targetMargin.toString());
                      if (newTarget && !isNaN(parseFloat(newTarget))) {
                        onUpdate({ targetMargin: parseFloat(newTarget) });
                      }
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-[#6B6B5F]">Required Revenue</h4>
                <span className="font-medium text-[#4A4A3F]">
                  ${requiredRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <h4 className="text-[#6B6B5F]">Revenue Gap</h4>
                <span className={`font-medium ${revenueGap > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${Math.abs(revenueGap).toLocaleString()}
                  {revenueGap > 0 ? ' needed' : ' surplus'}
                </span>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Recommendation</h3>
            <p className="text-blue-800 text-sm">
              {getRecommendation()}
            </p>
          </section>
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
          onClick={() => navigate('/')}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          Finish
        </Button>
      </CardFooter>
    </>
  );
};
