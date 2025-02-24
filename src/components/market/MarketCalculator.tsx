
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MarketSizeFormData {
  calculationType: 'revenue' | 'customers';
  industryRevenue?: number;
  totalCustomers?: number;
  averageRevenue: number;
  growthRate: number;
  targetSegmentPercentage: number;
  marketSharePercentage: number;
  yearsProjection: number;
}

export const MarketCalculator = () => {
  const [results, setResults] = useState<{
    tam: number;
    sam: number;
    som: number;
    projections: Array<{
      year: number;
      revenue: number;
    }>;
  } | null>(null);

  const form = useForm<MarketSizeFormData>({
    defaultValues: {
      calculationType: 'customers',
      averageRevenue: undefined,
      growthRate: undefined,
      targetSegmentPercentage: undefined,
      marketSharePercentage: undefined,
      yearsProjection: 5,
    },
  });

  const calculationType = form.watch('calculationType');

  const calculateProjections = (baseRevenue: number, growthRate: number, years: number) => {
    return Array.from({ length: years }, (_, index) => ({
      year: new Date().getFullYear() + index,
      revenue: baseRevenue * Math.pow(1 + growthRate / 100, index),
    }));
  };

  const onSubmit = (data: MarketSizeFormData) => {
    let tam = 0;
    let sam = 0;
    let som = 0;

    if (data.calculationType === 'revenue' && data.industryRevenue) {
      // Calculate using industry revenue method
      tam = data.industryRevenue;
      sam = tam * (data.targetSegmentPercentage / 100);
      som = sam * (data.marketSharePercentage / 100);
    } else if (data.calculationType === 'customers' && data.totalCustomers) {
      // Calculate using customer count method
      tam = data.totalCustomers * data.averageRevenue;
      sam = tam * (data.targetSegmentPercentage / 100);
      som = sam * (data.marketSharePercentage / 100);
    }

    const projections = calculateProjections(som, data.growthRate, data.yearsProjection);

    setResults({
      tam,
      sam,
      som,
      projections,
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="calculationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calculation Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select calculation method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="revenue">Industry Revenue Based</SelectItem>
                    <SelectItem value="customers">Customer Count Based</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calculationType === 'revenue' ? (
              <FormField
                control={form.control}
                name="industryRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Total Industry Revenue ($)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          The total annual revenue of your industry globally, based on market research reports
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter industry revenue"
                        {...field}
                        onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="totalCustomers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Total Potential Customers
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            The total number of potential customers globally, regardless of whether you can currently reach them
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter total customers"
                          {...field}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="averageRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Average Annual Revenue per Customer ($)
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Expected annual revenue from each customer, considering your pricing strategy
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter average revenue"
                          {...field}
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="targetSegmentPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Target Segment Size (%)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Percentage of the total market that fits your target segment criteria
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter target segment %"
                      {...field}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketSharePercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Expected Market Share (%)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Realistic percentage of your serviceable market that you can capture
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter market share %"
                      {...field}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
                        Expected annual growth rate for your market
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter growth rate %"
                      {...field}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsProjection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Projection Years
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Number of years to project growth
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter projection years"
                      {...field}
                      onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
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
              Calculate Market Size
            </Button>
          </div>
        </form>
      </Form>

      {results && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#FAFAFA]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">TAM</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-[#6B6B5F] mb-4 cursor-help">Total Addressable Market</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      The total market demand for your product or service
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-2xl font-bold text-[#4A4A3F]">{formatCurrency(results.tam)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#FAFAFA]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">SAM</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-[#6B6B5F] mb-4 cursor-help">Serviceable Addressable Market</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      The portion of TAM that you can realistically serve
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-2xl font-bold text-[#4A4A3F]">{formatCurrency(results.sam)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#FAFAFA]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">SOM</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-sm text-[#6B6B5F] mb-4 cursor-help">Serviceable Obtainable Market</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      The portion of SAM that you can realistically capture
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-2xl font-bold text-[#4A4A3F]">{formatCurrency(results.som)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#FAFAFA]">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">Revenue Projections</h3>
              <div className="space-y-4">
                {results.projections.map((projection) => (
                  <div key={projection.year} className="flex justify-between items-center">
                    <span className="text-[#6B6B5F]">{projection.year}</span>
                    <span className="font-semibold text-[#4A4A3F]">
                      {formatCurrency(projection.revenue)}
                    </span>
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
