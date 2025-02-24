
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";
import { BasePricingFields } from "./pricing-models/BasePricingFields";
import { FixedPricing } from "./pricing-models/FixedPricing";
import { VolumeCommitment } from "./pricing-models/VolumeCommitment";
import { TieredPricing } from "./pricing-models/TieredPricing";

interface PricingComponentsFormProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const PricingComponentsForm = ({ form }: PricingComponentsFormProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="pricingComponents.pricingModel"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Pricing Model
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Choose how you want to structure your pricing
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="fixed">Fixed Price per Unit</SelectItem>
                <SelectItem value="volumeCommitment">Volume Commitment</SelectItem>
                <SelectItem value="tiered">Tiered Pricing</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <BasePricingFields form={form} />

      {form.watch("pricingComponents.pricingModel") === "fixed" && (
        <FixedPricing form={form} />
      )}

      {form.watch("pricingComponents.pricingModel") === "volumeCommitment" && (
        <VolumeCommitment form={form} />
      )}

      {form.watch("pricingComponents.pricingModel") === "tiered" && (
        <TieredPricing form={form} />
      )}
    </div>
  );
};
