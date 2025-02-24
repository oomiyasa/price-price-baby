
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RevenueData, RevenueProjection } from "./types";
import { calculateRevenueProjections, formatCurrency } from "./utils/calculations";

export const RevenueCalculator = () => {
  const [projections, setProjections] = useState<RevenueProjection[] | null>(null);

  const form = useForm<RevenueData>({
    defaultValues: {
      monthlyRevenue: undefined,
      growthRate: undefined,
      projectionMonths: 12,
    },
  });

  const onSubmit = (data: RevenueData) => {
    const results = calculateRevenueProjections(
      data.monthlyRevenue,
      data.growthRate,
      data.projectionMonths
    );
    setProjections(results);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">MRR/ARR Calculator</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="monthlyRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Monthly Revenue ($)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Your current monthly recurring revenue
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter monthly revenue"
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
              name="growthRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Annual Growth Rate (%)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Expected annual growth rate as a percentage
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
              name="projectionMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Projection Months
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Number of months to project into the future
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter months"
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
              Calculate Revenue
            </Button>
          </div>
        </form>
      </Form>

      {projections && (
        <div className="space-y-8">
          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Current MRR
                  </h3>
                  <p className="text-2xl font-bold text-[#4A4A3F]">
                    {formatCurrency(projections[0].mrr)}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                    Current ARR
                  </h3>
                  <p className="text-2xl font-bold text-[#4A4A3F]">
                    {formatCurrency(projections[0].arr)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
                Revenue Projections
              </h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projections}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <RechartsTooltip
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="mrr"
                      name="MRR"
                      stroke="#8B8B73"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="arr"
                      name="ARR"
                      stroke="#4A4A3F"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
                Projected Growth
              </h3>
              <div className="space-y-4">
                {projections.map((projection) => (
                  <div
                    key={projection.month}
                    className="flex justify-between items-center"
                  >
                    <span className="text-[#6B6B5F]">{projection.month}</span>
                    <div className="flex gap-8">
                      <span className="text-[#8B8B73]">
                        MRR: {formatCurrency(projection.mrr)}
                      </span>
                      <span className="font-semibold text-[#4A4A3F]">
                        ARR: {formatCurrency(projection.arr)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
