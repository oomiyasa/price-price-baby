
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm, VolumeCommitTier, UsageTier } from "@/types/usage-based";

interface PricingComponentsFormProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const PricingComponentsForm = ({ form }: PricingComponentsFormProps) => {
  const calculateSuggestedSetupFee = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    // Suggest a setup fee based on expected usage
    return Math.round(monthlyUsage * 0.5);
  };

  const calculateSuggestedMonthlyBase = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    // Suggest a monthly base price that's roughly 20% of expected monthly usage value
    return Math.round(monthlyUsage * 0.2);
  };

  const calculateSuggestedIncludedUnits = () => {
    const monthlyUsage = Number(form.watch("averageMonthlyUsage")) || 0;
    // Suggest included units as 10% of expected monthly usage
    return Math.round(monthlyUsage * 0.1);
  };

  const addVolumeTier = () => {
    const currentTiers = form.watch("pricingComponents.volumeCommitTiers") || [];
    const lastTier = currentTiers[currentTiers.length - 1];
    const newTier: VolumeCommitTier = {
      commitmentAmount: lastTier ? lastTier.commitmentAmount * 2 : 1000,
      pricePerUnit: lastTier ? lastTier.pricePerUnit * 0.9 : 10,
    };
    form.setValue("pricingComponents.volumeCommitTiers", [...currentTiers, newTier]);
  };

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

  const removeTier = (index: number, type: "volume" | "usage") => {
    const field = type === "volume" ? "volumeCommitTiers" : "usageTiers";
    const currentTiers = form.watch(`pricingComponents.${field}`) || [];
    form.setValue(
      `pricingComponents.${field}`,
      currentTiers.filter((_, i) => i !== index)
    );
  };

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

      {form.watch("pricingComponents.pricingModel") === "fixed" && (
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
                <Input type="number" {...field} placeholder="Enter price per additional unit" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {form.watch("pricingComponents.pricingModel") === "volumeCommitment" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-[#4A4A3F]">Volume Commitment Tiers</h4>
            <Button
              type="button"
              onClick={addVolumeTier}
              className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Tier
            </Button>
          </div>
          
          {(form.watch("pricingComponents.volumeCommitTiers") || []).map((tier, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-md">
              <FormItem className="flex-1">
                <FormLabel>Commitment Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={tier.commitmentAmount}
                    onChange={(e) => {
                      const newTiers = [...(form.watch("pricingComponents.volumeCommitTiers") || [])];
                      newTiers[index] = { ...tier, commitmentAmount: Number(e.target.value) };
                      form.setValue("pricingComponents.volumeCommitTiers", newTiers);
                    }}
                  />
                </FormControl>
              </FormItem>
              
              <FormItem className="flex-1">
                <FormLabel>Price per Unit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={tier.pricePerUnit}
                    onChange={(e) => {
                      const newTiers = [...(form.watch("pricingComponents.volumeCommitTiers") || [])];
                      newTiers[index] = { ...tier, pricePerUnit: Number(e.target.value) };
                      form.setValue("pricingComponents.volumeCommitTiers", newTiers);
                    }}
                  />
                </FormControl>
              </FormItem>

              <Button
                type="button"
                variant="outline"
                onClick={() => removeTier(index, "volume")}
                className="border-[#8B8B73] text-[#8B8B73] hover:bg-[#8B8B73] hover:text-white mt-6"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {form.watch("pricingComponents.pricingModel") === "tiered" && (
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
                  onClick={() => removeTier(index, "usage")}
                  className="border-[#8B8B73] text-[#8B8B73] hover:bg-[#8B8B73] hover:text-white mt-6"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
