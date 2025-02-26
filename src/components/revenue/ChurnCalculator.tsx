
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

type ChurnType = "customer" | "revenue";

export function ChurnCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [churnType, setChurnType] = useState<ChurnType>("customer");
  const [churnRate, setChurnRate] = useState<number | null>(null);

  const calculateChurn = (values: { [key: string]: string }): number => {
    const numerator = parseFloat(values[churnType === "customer" ? "customersLost" : "revenueLost"]);
    const denominator = parseFloat(values[churnType === "customer" ? "totalCustomersStart" : "totalRevenueStart"]);
    return (numerator / denominator) * 100;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      const formData = new FormData(e.currentTarget);
      const values: { [key: string]: string } = {};
      formData.forEach((value, key) => {
        values[key] = value.toString();
      });

      // Validate inputs
      const requiredFields = churnType === "customer" 
        ? ["customersLost", "totalCustomersStart"]
        : ["revenueLost", "totalRevenueStart"];

      for (const field of requiredFields) {
        if (!values[field] || isNaN(parseFloat(values[field]))) {
          throw new Error(`Please enter valid numbers for all fields`);
        }
      }

      // Simulate calculation time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const rate = calculateChurn(values);
      setChurnRate(rate);
      
      toast({
        title: "Calculation Complete",
        description: `Your ${churnType === "customer" ? "Customer" : "Revenue"} Churn Rate is ${rate.toFixed(1)}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to calculate churn",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-6 bg-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
          Churn Calculator
        </h2>
        
        <div className="mb-6">
          <RadioGroup
            defaultValue="customer"
            className="flex flex-col space-y-3"
            onValueChange={(value) => setChurnType(value as ChurnType)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">Calculate Customer Churn</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="revenue" id="revenue" />
              <Label htmlFor="revenue">Calculate Revenue Churn</Label>
            </div>
          </RadioGroup>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {churnType === "customer" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="customersLost">
                  Customers Lost This Period
                </Label>
                <Input
                  type="number"
                  id="customersLost"
                  name="customersLost"
                  placeholder="Enter number of customers lost"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalCustomersStart">
                  Total Customers at Start of Period
                </Label>
                <Input
                  type="number"
                  id="totalCustomersStart"
                  name="totalCustomersStart"
                  placeholder="Enter total customers at the start"
                  className="w-full"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="revenueLost">
                  Revenue Lost This Period ($)
                </Label>
                <Input
                  type="number"
                  id="revenueLost"
                  name="revenueLost"
                  placeholder="Enter amount of revenue lost"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalRevenueStart">
                  Total Revenue at Start of Period ($)
                </Label>
                <Input
                  type="number"
                  id="totalRevenueStart"
                  name="totalRevenueStart"
                  placeholder="Enter total revenue at the start"
                  className="w-full"
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
                  Calculate Churn
                </button>
                {churnRate !== null && (
                  <div className="mt-4 p-4 bg-[#F5F5F0] rounded">
                    <p className="text-center text-lg font-medium text-[#4A4A3F]">
                      {churnType === "customer" ? "Customer" : "Revenue"} Churn Rate: {churnRate.toFixed(1)}%
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
