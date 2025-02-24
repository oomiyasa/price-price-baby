
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LTVData, LTVResults } from "./types";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const LTVCalculator = () => {
  const [results, setResults] = useState<LTVResults | null>(null);

  const form = useForm<LTVData>({
    defaultValues: {
      averageRevenue: undefined,
      churnRate: undefined,
      profitMargin: undefined,
      revenueGrowth: undefined,
      crossSellRevenue: undefined,
      referralRate: undefined,
      timePeriod: "monthly",
    },
  });

  const calculateLTV = (data: LTVData): LTVResults => {
    const annualRevenue = data.timePeriod === "monthly" 
      ? data.averageRevenue * 12 
      : data.averageRevenue;

    // Calculate customer lifespan in years based on churn rate
    const customerLifespan = 1 / (data.churnRate / 100);
    
    const basicLTV = annualRevenue * customerLifespan;
    
    const crossSellValue = data.crossSellRevenue * customerLifespan;
    const adjustedLTV = basicLTV + crossSellValue;
    
    const netProfitLTV = adjustedLTV * (data.profitMargin / 100);
    
    const growthFactor = 1 + (data.revenueGrowth / 100);
    const growthAdjustedLTV = netProfitLTV * growthFactor;
    
    const referralValue = growthAdjustedLTV * (data.referralRate / 100);

    return {
      basicLTV,
      adjustedLTV,
      netProfitLTV,
      growthAdjustedLTV,
      referralValue,
    };
  };

  const onSubmit = (data: LTVData) => {
    const results = calculateLTV(data);
    setResults(results);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
        Customer Lifetime Value Calculator
      </h1>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="averageRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Average Revenue per Customer
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Average revenue generated per customer
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter average revenue"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timePeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Time Period
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Select whether the revenue is monthly or annual
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="churnRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Annual Churn Rate (%)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Percentage of customers who leave annually
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter churn rate"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profitMargin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Profit Margin (%)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Your profit margin percentage
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter profit margin"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="revenueGrowth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Annual Revenue Growth (%)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Expected annual revenue growth rate
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter growth rate"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="crossSellRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Cross-Sell Revenue
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Additional revenue from cross-selling per year
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter cross-sell revenue"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referralRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Referral Rate (%)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Percentage of customers who refer new customers
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter referral rate"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
                >
                  Calculate LTV
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-6">
          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">Basic LTV</h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {formatCurrency(results.basicLTV)}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Net Profit LTV
                  </h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {formatCurrency(results.netProfitLTV)}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Growth-Adjusted LTV
                  </h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {formatCurrency(results.growthAdjustedLTV)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">LTV Breakdown</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Basic LTV",
                        value: results.basicLTV,
                      },
                      {
                        name: "With Cross-Sell",
                        value: results.adjustedLTV,
                      },
                      {
                        name: "Net Profit",
                        value: results.netProfitLTV,
                      },
                      {
                        name: "Growth-Adjusted",
                        value: results.growthAdjustedLTV,
                      },
                      {
                        name: "Referral Value",
                        value: results.referralValue,
                      },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="value" fill="#8B8B73" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="text-center p-4 text-sm text-gray-600 border-t">
        Price Price Baby | Oomiyasa LLC
      </footer>
    </div>
  );
};
