
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type CalculationType = "basic" | "grossMargin" | "fullCost";

export function LTVCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationType, setCalculationType] = useState<CalculationType>("basic");
  const [ltvResult, setLtvResult] = useState<number | null>(null);

  const calculateLTV = (formData: FormData): number => {
    const customerValue = parseFloat(formData.get("customerValue") as string);
    const churnRate = parseFloat(formData.get("churnRate") as string);
    const lifespan = parseFloat(formData.get("customerLifespan") as string);

    let annualValue = customerValue;

    if (calculationType === "grossMargin") {
      const cogs = parseFloat(formData.get("cogs") as string);
      annualValue = customerValue - cogs;
    } else if (calculationType === "fullCost") {
      const cogs = parseFloat(formData.get("cogs") as string);
      const devCosts = parseFloat(formData.get("devCosts") as string);
      const marketingCosts = parseFloat(formData.get("marketingCosts") as string);
      const supportCosts = parseFloat(formData.get("supportCosts") as string);
      annualValue = customerValue - cogs - (devCosts + marketingCosts + supportCosts) / lifespan;
    }

    // If churn rate is provided, use it to calculate lifespan
    const effectiveLifespan = churnRate > 0 ? (1 / (churnRate / 100)) : lifespan;
    return annualValue * effectiveLifespan;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Validate required fields
      const customerValue = formData.get("customerValue");
      const churnRate = formData.get("churnRate");
      const lifespan = formData.get("customerLifespan");

      if (!customerValue || !churnRate || !lifespan) {
        throw new Error("Please fill in all required fields");
      }

      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const ltv = calculateLTV(formData);
      setLtvResult(ltv);
      
      toast({
        title: "Calculation Complete",
        description: `Customer Lifetime Value: $${ltv.toFixed(2)}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to calculate LTV",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
            LTV Calculator
          </h2>

          <div className="mb-6">
            <Label className="text-sm font-medium text-[#4A4A3F] mb-2">Select Calculation Method</Label>
            <RadioGroup
              defaultValue="basic"
              className="flex flex-col space-y-3"
              onValueChange={(value) => setCalculationType(value as CalculationType)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic">Basic LTV (Revenue × Lifespan)</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Simple calculation using only revenue and customer lifespan
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="grossMargin" id="grossMargin" />
                <Label htmlFor="grossMargin">Gross Margin LTV (Revenue - COGS)</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Factors in cost of goods/services for more accurate value
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fullCost" id="fullCost" />
                <Label htmlFor="fullCost">Full Cost LTV (All Costs Included)</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Most comprehensive: includes COGS, development, marketing, and support costs
                  </TooltipContent>
                </Tooltip>
              </div>
            </RadioGroup>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerValue">Average Customer Value ($/year)</Label>
              <Input
                type="number"
                id="customerValue"
                name="customerValue"
                placeholder="Enter average annual revenue per customer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="churnRate">Customer Churn Rate (%)</Label>
              <Input
                type="number"
                id="churnRate"
                name="churnRate"
                placeholder="Enter annual churn rate"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerLifespan">Customer Lifespan (years)</Label>
              <Input
                type="number"
                id="customerLifespan"
                name="customerLifespan"
                placeholder="Enter average customer lifespan"
                required
              />
            </div>

            {(calculationType === "grossMargin" || calculationType === "fullCost") && (
              <div className="space-y-2">
                <Label htmlFor="cogs">Cost of Goods/Services ($/year)</Label>
                <Input
                  type="number"
                  id="cogs"
                  name="cogs"
                  placeholder="Enter annual COGS per customer"
                  required
                />
              </div>
            )}

            {calculationType === "fullCost" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="devCosts">Development Costs ($)</Label>
                  <Input
                    type="number"
                    id="devCosts"
                    name="devCosts"
                    placeholder="Enter total development costs"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marketingCosts">Marketing Costs ($)</Label>
                  <Input
                    type="number"
                    id="marketingCosts"
                    name="marketingCosts"
                    placeholder="Enter total marketing costs"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportCosts">Support Costs ($)</Label>
                  <Input
                    type="number"
                    id="supportCosts"
                    name="supportCosts"
                    placeholder="Enter total support costs"
                    required
                  />
                </div>
              </>
            )}

            <div className="mt-6">
              {isCalculating ? (
                <LoadingSpinner className="my-4" />
              ) : (
                <>
                  <button
                    type="submit"
                    className="w-full bg-[#8B8B73] text-white py-2 px-4 rounded hover:bg-[#6B6B5F] transition-colors"
                  >
                    Calculate LTV
                  </button>
                  {ltvResult !== null && (
                    <div className="mt-4 p-4 bg-[#F5F5F0] rounded">
                      <p className="text-center text-lg font-medium text-[#4A4A3F]">
                        Customer Lifetime Value: ${ltvResult.toFixed(2)}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
