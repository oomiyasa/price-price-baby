
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

interface MarketSizeFormData {
  totalPopulation: number;
  targetPercentage: number;
  averageRevenue: number;
  marketShare: number;
}

export const MarketCalculator = () => {
  const [results, setResults] = useState<{
    tam: number;
    sam: number;
    som: number;
  } | null>(null);

  const form = useForm<MarketSizeFormData>({
    defaultValues: {
      totalPopulation: 0,
      targetPercentage: 0,
      averageRevenue: 0,
      marketShare: 0,
    },
  });

  const onSubmit = (data: MarketSizeFormData) => {
    const tam = data.totalPopulation * data.averageRevenue;
    const sam = tam * (data.targetPercentage / 100);
    const som = sam * (data.marketShare / 100);

    setResults({
      tam,
      sam,
      som,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="totalPopulation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Total Population
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        The total number of potential customers in your market
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Target Percentage (%)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Percentage of the total market you can realistically serve
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
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
                      <TooltipContent>
                        Expected annual revenue from each customer
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketShare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Expected Market Share (%)
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Percentage of the serviceable market you expect to capture
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
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
      )}
    </div>
  );
};
