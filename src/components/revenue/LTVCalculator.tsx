import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function LTVCalculator() {
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsCalculating(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
            LTV Calculator
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="customerValue"
                className="block text-sm font-medium text-gray-700"
              >
                Average Customer Value ($/year):
              </label>
              <input
                type="number"
                id="customerValue"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73] sm:text-sm"
                placeholder="Enter average customer value"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="churnRate"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Churn Rate (%):
              </label>
              <input
                type="number"
                id="churnRate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73] sm:text-sm"
                placeholder="Enter customer churn rate"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="customerLifespan"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Lifespan (years):
              </label>
              <input
                type="number"
                id="customerLifespan"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B8B73] focus:ring-[#8B8B73] sm:text-sm"
                placeholder="Enter customer lifespan"
                required
              />
            </div>
            <div className="mt-6">
              {isCalculating ? (
                <LoadingSpinner className="my-4" />
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#8B8B73] text-white py-2 px-4 rounded hover:bg-[#6B6B5F] transition-colors"
                >
                  Calculate LTV
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
