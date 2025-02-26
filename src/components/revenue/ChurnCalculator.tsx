
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white shadow-sm">
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

          <form onSubmit={handleSubmit}>
            {churnType === "customer" ? (
              <>
                <div className="mb-4">
                  <label htmlFor="customersLost" className="block text-sm font-medium text-gray-700">
                    Customers Lost This Period
                  </label>
                  <input
                    type="number"
                    id="customersLost"
                    name="customersLost"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73]"
                    placeholder="Enter number of customers lost"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="totalCustomersStart" className="block text-sm font-medium text-gray-700">
                    Total Customers at Start of Period
                  </label>
                  <input
                    type="number"
                    id="totalCustomersStart"
                    name="totalCustomersStart"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73]"
                    placeholder="Enter total customers at the start"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="revenueLost" className="block text-sm font-medium text-gray-700">
                    Revenue Lost This Period ($)
                  </label>
                  <input
                    type="number"
                    id="revenueLost"
                    name="revenueLost"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73]"
                    placeholder="Enter amount of revenue lost"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="totalRevenueStart" className="block text-sm font-medium text-gray-700">
                    Total Revenue at Start of Period ($)
                  </label>
                  <input
                    type="number"
                    id="totalRevenueStart"
                    name="totalRevenueStart"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73]"
                    placeholder="Enter total revenue at the start"
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
    </div>
  );
}
