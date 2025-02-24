
import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm, UsageTier } from "@/types/usage-based";

interface TieredPricingProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const TieredPricing = ({ form }: TieredPricingProps) => {
  const addUsageTier = () => {
    const currentTiers = form.watch("pricingComponents.usageTiers") || [];
    const lastTier = currentTiers[currentTiers.length - 1];
    const newTier: UsageTier = {
      minUsage: lastTier ? lastTier.maxUsage : 0,
      maxUsage: lastTier ? lastTier.maxUsage * 2 : 1000,
      pricePerUnit: lastTier ? lastTier.pricePerUnit * 0.9 : 10,
    };
    form.setValue("pricingComponents.usageTiers", [...currentTiers, newTier]);
  };

  const removeTier = (index: number) => {
    const currentTiers = form.watch("pricingComponents.usageTiers") || [];
    form.setValue(
      "pricingComponents.usageTiers",
      currentTiers.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-[#4A4A3F]">Usage Tiers</h4>
        <Button
          type="button"
          onClick={addUsageTier}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Tier
        </Button>
      </div>
      
      {(form.watch("pricingComponents.usageTiers") || []).map((tier, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded-md">
          <FormItem>
            <FormLabel>Min Usage</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={tier.minUsage}
                onChange={(e) => {
                  const newTiers = [...(form.watch("pricingComponents.usageTiers") || [])];
                  newTiers[index] = { ...tier, minUsage: Number(e.target.value) };
                  if (index > 0) {
                    newTiers[index - 1] = { ...newTiers[index - 1], maxUsage: Number(e.target.value) };
                  }
                  form.setValue("pricingComponents.usageTiers", newTiers);
                }}
                readOnly={index > 0}
              />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Max Usage</FormLabel>
            <FormControl>
              <Input
                type="number"
                value={tier.maxUsage}
                onChange={(e) => {
                  const newTiers = [...(form.watch("pricingComponents.usageTiers") || [])];
                  newTiers[index] = { ...tier, maxUsage: Number(e.target.value) };
                  if (index < newTiers.length - 1) {
                    newTiers[index + 1] = { ...newTiers[index + 1], minUsage: Number(e.target.value) };
                  }
                  form.setValue("pricingComponents.usageTiers", newTiers);
                }}
              />
            </FormControl>
          </FormItem>

          <div className="flex gap-2">
            <FormItem className="flex-1">
              <FormLabel>Price per Unit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={tier.pricePerUnit}
                  onChange={(e) => {
                    const newTiers = [...(form.watch("pricingComponents.usageTiers") || [])];
                    newTiers[index] = { ...tier, pricePerUnit: Number(e.target.value) };
                    form.setValue("pricingComponents.usageTiers", newTiers);
                  }}
                />
              </FormControl>
            </FormItem>

            <Button
              type="button"
              variant="outline"
              onClick={() => removeTier(index)}
              className="border-[#8B8B73] text-[#8B8B73] hover:bg-[#8B8B73] hover:text-white mt-6"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
