
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
import { HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChurnData, ChurnResults } from "./types";

const preventionStrategies = {
  voluntary: [
    "Implement proactive customer success programs",
    "Regular check-ins and feedback collection",
    "Offer competitive pricing and features",
    "Create loyalty programs and incentives",
    "Improve product quality and user experience",
  ],
  involuntary: [
    "Update payment information proactively",
    "Implement smart dunning management",
    "Send early renewal notifications",
    "Offer flexible payment options",
    "Monitor failed payment patterns",
  ],
};

export const ChurnCalculator = () => {
  const [results, setResults] = useState<ChurnResults | null>(null);

  const form = useForm<ChurnData>({
    defaultValues: {
      startingCustomers: undefined,
      endingCustomers: undefined,
      churnedCustomers: undefined,
      newCustomers: undefined,
      timePeriod: "monthly",
      churnType: "both",
    },
  });

  const calculateChurnMetrics = (data: ChurnData): ChurnResults => {
    const churnRate = (data.churnedCustomers / data.startingCustomers) * 100;
    const retentionRate = 100 - churnRate;
    const customerLifetimeMonths = 1 / (churnRate / 100);
    const netCustomerChange = data.endingCustomers - data.startingCustomers;
    const growthRate = (netCustomerChange / data.startingCustomers) * 100;

    return {
      churnRate,
      customerLifetimeMonths,
      retentionRate,
      netCustomerChange,
      growthRate,
    };
  };

  const onSubmit = (data: ChurnData) => {
    const results = calculateChurnMetrics(data);
    setResults(results);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
        Churn Rate Calculator
      </h1>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="startingCustomers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Starting Customers
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Number of customers at the start of the period
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter customer count"
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
                  name="endingCustomers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Ending Customers
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Number of customers at the end of the period
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter customer count"
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
                  name="churnedCustomers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Churned Customers
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Number of customers who left during the period
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter churned count"
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
                  name="newCustomers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        New Customers
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Number of new customers acquired
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter new customers"
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
                            Select the time period for analysis
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="churnType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Churn Type
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Select the type of churn to analyze
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select churn type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="voluntary">Voluntary</SelectItem>
                          <SelectItem value="involuntary">Involuntary</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
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
                  Calculate Churn
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
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Churn Rate
                  </h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {results.churnRate.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Retention Rate
                  </h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {results.retentionRate.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Customer Lifetime (Months)
                  </h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {results.customerLifetimeMonths.toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
                Growth Analysis
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Net Customer Change</TableCell>
                    <TableCell>{results.netCustomerChange}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Growth Rate</TableCell>
                    <TableCell>{results.growthRate.toFixed(1)}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
                Prevention Strategies
              </h3>
              <div className="space-y-4">
                {form.getValues("churnType") !== "involuntary" && (
                  <div>
                    <h4 className="font-medium text-[#4A4A3F] mb-2">
                      Voluntary Churn Prevention
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {preventionStrategies.voluntary.map((strategy, index) => (
                        <li key={index} className="text-[#6B6B5F]">
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {form.getValues("churnType") !== "voluntary" && (
                  <div>
                    <h4 className="font-medium text-[#4A4A3F] mb-2">
                      Involuntary Churn Prevention
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {preventionStrategies.involuntary.map((strategy, index) => (
                        <li key={index} className="text-[#6B6B5F]">
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
