
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
import { HelpCircle, Plus, X } from "lucide-react";
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
import { CohortData, NRRResults } from "./types";
import { calculateNRR, formatCurrency } from "./utils/calculations";

export const NRRCalculator = () => {
  const [cohorts, setCohorts] = useState<CohortData[]>([]);
  const [results, setResults] = useState<NRRResults | null>(null);

  const form = useForm<CohortData>({
    defaultValues: {
      startDate: "",
      initialRevenue: undefined,
      expansionRevenue: undefined,
      churnedRevenue: undefined,
    },
  });

  const addCohort = (data: CohortData) => {
    setCohorts([...cohorts, data]);
    form.reset();
  };

  const removeCohort = (index: number) => {
    setCohorts(cohorts.filter((_, i) => i !== index));
  };

  const calculateResults = () => {
    const totalInitialRevenue = cohorts.reduce((sum, cohort) => sum + cohort.initialRevenue, 0);
    const totalExpansionRevenue = cohorts.reduce((sum, cohort) => sum + cohort.expansionRevenue, 0);
    const totalChurnedRevenue = cohorts.reduce((sum, cohort) => sum + cohort.churnedRevenue, 0);
    const endingRevenue = totalInitialRevenue + totalExpansionRevenue - totalChurnedRevenue;
    
    setResults({
      nrrPercentage: calculateNRR(totalInitialRevenue, totalExpansionRevenue, totalChurnedRevenue),
      endingRevenue,
      netRevenue: endingRevenue - totalInitialRevenue,
      cohorts: [...cohorts],
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#4A4A3F] mb-6">
        Net Revenue Retention Calculator
      </h1>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addCohort)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Cohort Start Date
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Starting date for this revenue cohort
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input type="month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="initialRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Initial Revenue ($)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Starting revenue for this cohort
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter initial revenue"
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
                  name="expansionRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Expansion Revenue ($)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Additional revenue from upsells and expansions
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter expansion revenue"
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
                  name="churnedRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Churned Revenue ($)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Lost revenue from churned customers
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter churned revenue"
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

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Cohort
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {cohorts.length > 0 && (
        <Card className="bg-[#FAFAFA]">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">Cohorts</h3>
            <div className="space-y-4">
              {cohorts.map((cohort, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div className="grid grid-cols-4 gap-4 flex-1">
                    <div>
                      <span className="text-sm text-[#6B6B5F]">Start Date</span>
                      <p className="font-medium text-[#4A4A3F]">{cohort.startDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-[#6B6B5F]">Initial Revenue</span>
                      <p className="font-medium text-[#4A4A3F]">
                        {formatCurrency(cohort.initialRevenue)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-[#6B6B5F]">Expansion</span>
                      <p className="font-medium text-[#4A4A3F]">
                        {formatCurrency(cohort.expansionRevenue)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-[#6B6B5F]">Churn</span>
                      <p className="font-medium text-[#4A4A3F]">
                        {formatCurrency(cohort.churnedRevenue)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCohort(index)}
                    className="text-[#6B6B5F] hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button
                onClick={calculateResults}
                className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
              >
                Calculate NRR
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <div className="space-y-6">
          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">Net Revenue Retention</h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {results.nrrPercentage.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">Net Revenue Change</h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {formatCurrency(results.netRevenue)}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">Ending Revenue</h3>
                  <p className="text-3xl font-bold text-[#4A4A3F]">
                    {formatCurrency(results.endingRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">Revenue Breakdown</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={results.cohorts}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="startDate" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Bar
                      dataKey="initialRevenue"
                      name="Initial Revenue"
                      fill="#8B8B73"
                    />
                    <Bar
                      dataKey="expansionRevenue"
                      name="Expansion Revenue"
                      fill="#4A4A3F"
                    />
                    <Bar
                      dataKey="churnedRevenue"
                      name="Churned Revenue"
                      fill="#C7C7B5"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
