
import React, { useState } from "react";
import { CACData, CACResults } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NumericInput } from "./components/form/NumericInput";
import { SelectField } from "./components/form/SelectField";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const TIME_PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
];

export const CACCalculator = () => {
  const [results, setResults] = useState<CACResults | null>(null);

  const form = useForm<CACData>({
    defaultValues: {
      marketingCosts: undefined,
      salesCosts: undefined,
      newCustomers: undefined,
      timePeriod: "monthly",
    },
  });

  const calculateCAC = (data: CACData): CACResults => {
    const totalCosts = data.marketingCosts + data.salesCosts;
    const cac = totalCosts / data.newCustomers;
    const marketingSplit = (data.marketingCosts / totalCosts) * 100;
    const salesSplit = (data.salesCosts / totalCosts) * 100;

    // Determine efficiency based on CAC amount
    let efficiency: CACResults["efficiency"] = "average";
    if (cac < 100) efficiency = "excellent";
    else if (cac < 200) efficiency = "good";
    else if (cac > 500) efficiency = "poor";

    return {
      cac,
      marketingSplit,
      salesSplit,
      customersPerPeriod: data.newCustomers,
      efficiency,
    };
  };

  const onSubmit = (data: CACData) => {
    const calculatedResults = calculateCAC(data);
    setResults(calculatedResults);
  };

  const getEfficiencyColor = (efficiency: CACResults["efficiency"]) => {
    switch (efficiency) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "average":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <Card className="bg-[#FAFAFA]">
        <CardHeader className="text-center border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-[#4A4A3F]">
            Customer Acquisition Cost Calculator
          </h2>
          <p className="text-[#6B6B5F]">
            Calculate and analyze your customer acquisition costs
          </p>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NumericInput<CACData>
                  control={form.control}
                  name="marketingCosts"
                  label="Marketing Costs ($)"
                  tooltip="Total marketing expenses including advertising, content, and campaigns"
                  placeholder="Enter marketing costs"
                />

                <NumericInput<CACData>
                  control={form.control}
                  name="salesCosts"
                  label="Sales Costs ($)"
                  tooltip="Total sales expenses including salaries, commissions, and tools"
                  placeholder="Enter sales costs"
                />

                <NumericInput<CACData>
                  control={form.control}
                  name="newCustomers"
                  label="New Customers"
                  tooltip="Number of new customers acquired in this period"
                  placeholder="Enter number of new customers"
                />

                <SelectField<CACData>
                  control={form.control}
                  name="timePeriod"
                  label="Time Period"
                  tooltip="Select the time period for analysis"
                  options={TIME_PERIOD_OPTIONS}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
                >
                  Calculate CAC
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {results && (
        <Card className="bg-[#FAFAFA]">
          <CardHeader className="text-center border-b border-gray-100">
            <h3 className="text-xl font-semibold text-[#4A4A3F]">Results</h3>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-lg text-[#6B6B5F]">Customer Acquisition Cost</p>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    ${results.cac.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm font-medium capitalize ${getEfficiencyColor(
                      results.efficiency
                    )}`}
                  >
                    {results.efficiency} Efficiency
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-[#6B6B5F]">Customers Acquired</p>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {results.customersPerPeriod}
                  </p>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Marketing",
                        value: results.marketingSplit,
                        fill: "#8B8B73",
                      },
                      {
                        name: "Sales",
                        value: results.salesSplit,
                        fill: "#6B6B5F",
                      },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Cost Split (%)', angle: -90, position: 'insideLeft' }} />
                    <RechartsTooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};
