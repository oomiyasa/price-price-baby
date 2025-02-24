
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

interface FixedPricingProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const FixedPricing = ({ form }: FixedPricingProps) => {
  const calculateSuggestedPrice = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    const includedUnits = Number(form.watch("pricingComponents.includedUnits")) || 0;
    // Suggest a slightly lower price per unit for additional usage
    return monthlyUsage > 0 ? 
      ((Number(form.watch("pricingComponents.monthlyBase")) || 0) / includedUnits * 0.8).toFixed(2) : 
      0;
  };

  return (
    <FormField
      control={form.control}
      name="pricingComponents.additionalUnitPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            Price per Additional Unit
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                Price charged for each unit beyond the included units
              </TooltipContent>
            </Tooltip>
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Input 
                type="number"
                {...field}
                onChange={e => field.onChange(e.target.valueAsNumber)}
                placeholder={`Suggested: $${calculateSuggestedPrice()}`} 
              />
              <span className="text-sm text-muted-foreground">
                Suggested: ${calculateSuggestedPrice()}
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
