
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { MagicNumberData } from "../types";
import { NumericInput } from "./form/NumericInput";
import { SelectField } from "./form/SelectField";

interface MagicNumberFormProps {
  onSubmit: (data: MagicNumberData) => void;
}

export function MagicNumberForm({ onSubmit }: MagicNumberFormProps) {
  const form = useForm<MagicNumberData>({
    defaultValues: {
      currentQuarterRevenue: undefined,
      previousQuarterRevenue: undefined,
      salesAndMarketingSpend: undefined,
      timePeriod: "quarterly",
    },
  });

  const { control, watch } = form;
  const timePeriod = watch("timePeriod");

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case "monthly":
        return "Month";
      case "quarterly":
        return "Quarter";
      case "annually":
        return "Year";
      default:
        return "Period";
    }
  };

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <SelectField
                control={control}
                name="timePeriod"
                label="Time Period"
                tooltip="Select the time period for your revenue data"
                options={[
                  { value: "monthly", label: "Monthly" },
                  { value: "quarterly", label: "Quarterly" },
                  { value: "annually", label: "Annually" },
                ]}
              />
              
              <NumericInput
                control={control}
                name="currentQuarterRevenue"
                label={`Current ${getPeriodLabel()} Revenue`}
                tooltip={`Your current ${getPeriodLabel().toLowerCase()}'s revenue`}
                placeholder={`Enter current ${getPeriodLabel().toLowerCase()} revenue`}
              />
              <NumericInput
                control={control}
                name="previousQuarterRevenue"
                label={`Previous ${getPeriodLabel()} Revenue`}
                tooltip={`Your previous ${getPeriodLabel().toLowerCase()}'s revenue`}
                placeholder={`Enter previous ${getPeriodLabel().toLowerCase()} revenue`}
              />
              <NumericInput
                control={control}
                name="salesAndMarketingSpend"
                label={`Sales & Marketing Spend (${getPeriodLabel()})`}
                tooltip={`Your total sales and marketing spend for the ${getPeriodLabel().toLowerCase()}`}
                placeholder={`Enter ${getPeriodLabel().toLowerCase()} sales and marketing spend`}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
              >
                Calculate Magic Number
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
