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
                    <SelectItem value="perpetual">Perpetual License</SelectItem>
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

  return (
    <Form {...form}>
      <form className="space-y-6">
        {step === 1 && renderStep1()}
        {/* Additional steps will be added here */}
      </form>
    </Form>
  );
};
