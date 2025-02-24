
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";

interface BasePricingFieldsProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const BasePricingFields = ({ form }: BasePricingFieldsProps) => {
  const calculateSuggestedSetupFee = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    return Math.round(monthlyUsage * 0.5);
  };

  const calculateSuggestedMonthlyBase = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    return Math.round(monthlyUsage * 0.2);
  };

  const calculateSuggestedIncludedUnits = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    return Math.round(monthlyUsage * 0.1);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="pricingComponents.setupFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Platform Setup Fee
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  One-time fee for setting up the service
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                  placeholder={`Suggested: $${calculateSuggestedSetupFee()}`}
                />
                <span className="text-sm text-muted-foreground">
                  Suggested: ${calculateSuggestedSetupFee()}
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pricingComponents.monthlyBase"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Monthly Base Price
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Minimum monthly charge for the service
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                  placeholder={`Suggested: $${calculateSuggestedMonthlyBase()}`}
                />
                <span className="text-sm text-muted-foreground">
                  Suggested: ${calculateSuggestedMonthlyBase()}
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pricingComponents.includedUnits"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Included Units per Month
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Number of units included in the monthly base price
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input 
                  type="number" 
                  {...field}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                  placeholder={`Suggested: ${calculateSuggestedIncludedUnits()}`}
                />
                <span className="text-sm text-muted-foreground">
                  Suggested: {calculateSuggestedIncludedUnits()}
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
