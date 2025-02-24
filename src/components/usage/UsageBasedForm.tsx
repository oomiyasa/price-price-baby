import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";
import { OfferingTypeSelector } from "./OfferingTypeSelector";
import { SubscriptionDetails } from "./SubscriptionDetails";
import { PerpetualDetails } from "./PerpetualDetails";
import { UsageMetricsForm } from "./UsageMetricsForm";

export const UsageBasedForm = () => {
  const [step, setStep] = useState(1);
  const form = useForm<CurrentPricingForm>({
    defaultValues: {
      offerType: "new",
    },
  });

  const onSubmit = (data: CurrentPricingForm) => {
    console.log(data);
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <OfferingTypeSelector form={form} />
      </div>

      {form.watch("offerType") === "existing" && (
        <div className="space-y-4">
          <Select onValueChange={(value) => form.setValue("pricingModel", value as "subscription" | "perpetual")} defaultValue={form.watch("pricingModel")}>
            <SelectTrigger>
              <SelectValue placeholder="Select pricing model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="perpetual">Perpetual License/One Time Purchase</SelectItem>
            </SelectContent>
          </Select>
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
      <UsageMetricsForm form={form} />
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
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="bg-[#8B8B73] text-white hover:bg-[#6B6B5F]"
        >
          Submit
        </Button>
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form className="space-y-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </form>
    </Form>
  );
};
