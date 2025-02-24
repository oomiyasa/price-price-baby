
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { MarketSizeFormData } from "../types";

interface MarketSizeFormProps {
  onSubmit: (data: MarketSizeFormData) => void;
}

export const MarketSizeForm = ({ onSubmit }: MarketSizeFormProps) => {
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

  return (
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
  );
};
