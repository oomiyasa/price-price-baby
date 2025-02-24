
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

type CurrentPricingForm = {
  offerType: "new" | "existing";
  pricingModel?: "subscription" | "perpetual";
  subscriptionPrice?: string;
  billingFrequency?: "monthly" | "annually" | "quarterly";
  customerCount?: string;
  averageRevenue?: string;
  mainLimitation?: string;
};

export const UsageBasedForm = () => {
  const [step, setStep] = useState(1);
  const form = useForm<CurrentPricingForm>({
    defaultValues: {
      offerType: "new",
    },
  });

  const onSubmit = (data: CurrentPricingForm) => {
    console.log(data);
    setStep(step + 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-[#4A4A3F]">Current Offering</h2>
        <FormField
          control={form.control}
          name="offerType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Is this a new or existing offering?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
          )}
        />
      </div>

      {form.watch("offerType") === "existing" && (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="pricingModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Pricing Model</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="perpetual">Perpetual License</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("pricingModel") === "subscription" && (
            <>
              <FormField
                control={form.control}
                name="subscriptionPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Current Subscription Price
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Enter your current base subscription price
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="customerCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Number of Current Customers
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Total number of active customers
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="averageRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Average Revenue per Customer
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Average monthly revenue per customer
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainLimitation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Main Limitation of Current Model
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      What's the biggest drawback of your current pricing model?
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          Next Step
        </Button>
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form className="space-y-6">
        {step === 1 && renderStep1()}
        {/* Additional steps will be added here */}
      </form>
    </Form>
  );
};
