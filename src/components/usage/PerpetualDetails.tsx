
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";

interface PerpetualDetailsProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const PerpetualDetails = ({ form }: PerpetualDetailsProps) => {
  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          Current List Price
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Enter your current list price before any discounts
            </TooltipContent>
          </Tooltip>
        </FormLabel>
        <FormControl>
          <Input
            type="number"
            {...form.register("listPrice")}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel className="flex items-center gap-2">
          Annual Number of Purchases
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Average number of licenses purchased per year
            </TooltipContent>
          </Tooltip>
        </FormLabel>
        <FormControl>
          <Input
            type="number"
            {...form.register("annualPurchases")}
          />
        </FormControl>
        <FormMessage />
      </FormItem>

      <FormItem>
        <FormLabel className="flex items-center gap-2">
          Average Discount (%)
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              Average discount offered to customers as a percentage
            </TooltipContent>
          </Tooltip>
        </FormLabel>
        <FormControl>
          <Input
            type="number"
            min="0"
            max="100"
            {...form.register("averageDiscount")}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </div>
  );
};
