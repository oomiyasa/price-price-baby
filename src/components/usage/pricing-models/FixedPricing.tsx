
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
            <Input 
              type="number"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber)}
              placeholder="Enter price per additional unit" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
