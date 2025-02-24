
import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Infinity } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm, VolumeCommitTier } from "@/types/usage-based";
import { Switch } from "@/components/ui/switch";

interface VolumeCommitmentProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const VolumeCommitment = ({ form }: VolumeCommitmentProps) => {
  const [isTopTier, setIsTopTier] = React.useState(false);
  
  const addVolumeTier = () => {
    const currentTiers = form.watch("pricingComponents.volumeCommitTiers") || [];
    const lastTier = currentTiers[currentTiers.length - 1];
    const newTier: VolumeCommitTier = {
      commitmentAmount: lastTier ? lastTier.commitmentAmount * 2 : 1000,
      pricePerUnit: lastTier ? lastTier.pricePerUnit * 0.9 : 10,
    };
    form.setValue("pricingComponents.volumeCommitTiers", [...currentTiers, newTier]);
  };

  const removeTier = (index: number) => {
    const currentTiers = form.watch("pricingComponents.volumeCommitTiers") || [];
    form.setValue(
      "pricingComponents.volumeCommitTiers",
      currentTiers.filter((_, i) => i !== index)
    );
    if (index === currentTiers.length - 1) {
      setIsTopTier(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-[#4A4A3F]">Volume Commitment Tiers</h4>
        <Button
          type="button"
          onClick={addVolumeTier}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
          disabled={isTopTier}
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
                disabled={index === (form.watch("pricingComponents.volumeCommitTiers") || []).length - 1 && isTopTier}
                placeholder={index === (form.watch("pricingComponents.volumeCommitTiers") || []).length - 1 && isTopTier ? "Unlimited" : "Enter amount"}
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

          {index === (form.watch("pricingComponents.volumeCommitTiers") || []).length - 1 && (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="text-sm">Top Tier</FormLabel>
              <FormControl>
                <Switch
                  checked={isTopTier}
                  onCheckedChange={setIsTopTier}
                />
              </FormControl>
            </FormItem>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => removeTier(index)}
            className="border-[#8B8B73] text-[#8B8B73] hover:bg-[#8B8B73] hover:text-white mt-6"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
