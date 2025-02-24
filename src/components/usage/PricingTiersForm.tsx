
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm, PricingTier } from "@/types/usage-based";

interface PricingTiersFormProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const PricingTiersForm = ({ form }: PricingTiersFormProps) => {
  const pricingTiers = form.watch("pricingTiers") || [];

  const addTier = () => {
    const newTier: PricingTier = {
      minUsage: pricingTiers.length > 0 ? Number(pricingTiers[pricingTiers.length - 1].maxUsage) : 0,
      maxUsage: 0,
      pricePerUnit: 0,
    };
    form.setValue("pricingTiers", [...pricingTiers, newTier]);
  };

  const removeTier = (index: number) => {
    const newTiers = pricingTiers.filter((_, i) => i !== index);
    form.setValue("pricingTiers", newTiers);
  };

  const updateTier = (index: number, field: keyof PricingTier, value: number) => {
    const newTiers = [...pricingTiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    
    // If updating minUsage, update previous tier's maxUsage
    if (field === "minUsage" && index > 0) {
      newTiers[index - 1].maxUsage = value;
    }
    // If updating maxUsage, update next tier's minUsage
    if (field === "maxUsage" && index < newTiers.length - 1) {
      newTiers[index + 1].minUsage = value;
    }
    
    form.setValue("pricingTiers", newTiers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#4A4A3F]">Pricing Tiers</h3>
        <Button
          type="button"
          onClick={addTier}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Tier
        </Button>
      </div>

      {pricingTiers.map((tier, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-[#4A4A3F]">Tier {index + 1}</h4>
            <Button
              type="button"
              variant="outline"
              onClick={() => removeTier(index)}
              className="border-[#8B8B73] text-[#8B8B73] hover:bg-[#8B8B73] hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Min Usage
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Minimum usage for this tier
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={tier.minUsage}
                  onChange={(e) => updateTier(index, "minUsage", Number(e.target.value))}
                  readOnly={index > 0}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Max Usage
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Maximum usage for this tier
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={tier.maxUsage}
                  onChange={(e) => updateTier(index, "maxUsage", Number(e.target.value))}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Price Per Unit
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Price per unit in this tier
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={tier.pricePerUnit}
                  onChange={(e) => updateTier(index, "pricePerUnit", Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="overage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Overage Rate (per unit)
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Price per unit for usage beyond the highest tier
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Enter overage rate" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minimumCommitment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                Minimum Commitment
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Minimum usage commitment per billing period
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Enter minimum commitment" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
