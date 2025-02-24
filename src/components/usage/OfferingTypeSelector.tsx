
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";

interface OfferingTypeSelectorProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const OfferingTypeSelector = ({ form }: OfferingTypeSelectorProps) => {
  return (
    <FormItem className="space-y-3">
      <FormLabel>Is this a new or existing offering?</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => form.setValue("offerType", value as "new" | "existing")}
          value={form.watch("offerType")}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="new" id="new" />
            <label
              htmlFor="new"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              New to world product
            </label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="existing" id="existing" />
            <label
              htmlFor="existing"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Existing offering
            </label>
          </div>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
