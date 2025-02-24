
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";
import { OfferingTypeSelector } from "./OfferingTypeSelector";
import { SubscriptionDetails } from "./SubscriptionDetails";
import { PerpetualDetails } from "./PerpetualDetails";

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
        <FormField
          control={form.control}
          name="offerType"
          render={() => (
            <OfferingTypeSelector form={form} />
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
                    <SelectItem value="perpetual">Perpetual License/One Time Purchase</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("pricingModel") === "subscription" && (
            <SubscriptionDetails form={form} />
          )}

          {form.watch("pricingModel") === "perpetual" && (
            <PerpetualDetails form={form} />
          )}
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

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#4A4A3F]">
          Expected Usage Pattern
        </h3>
        <FormField
          control={form.control}
          name="usagePattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How frequently will customers use your product?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select usage pattern" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Multiple times per day</SelectItem>
                  <SelectItem value="weekly">Few times per week</SelectItem>
                  <SelectItem value="monthly">Few times per month</SelectItem>
                  <SelectItem value="occasional">Occasional/Sporadic use</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="border-[#8B8B73] text-[#8B8B73] hover:bg-[#8B8B73] hover:text-white"
        >
          Previous Step
        </Button>
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
        {step === 2 && renderStep2()}
        {/* Additional steps will be added here */}
      </form>
    </Form>
  );
};
