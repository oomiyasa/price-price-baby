
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
      currentQuarterRevenue: 0,
      previousQuarterRevenue: 0,
      salesAndMarketingSpend: 0,
      timePeriod: "quarterly",
    },
  });

  const { control } = form;

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <NumericInput
                control={control}
                name="currentQuarterRevenue"
                label="Current Quarter Revenue"
                tooltip="Your current quarter's revenue"
                placeholder="Enter current quarter revenue"
              />
              <NumericInput
                control={control}
                name="previousQuarterRevenue"
                label="Previous Quarter Revenue"
                tooltip="Your previous quarter's revenue"
                placeholder="Enter previous quarter revenue"
              />
              <NumericInput
                control={control}
                name="salesAndMarketingSpend"
                label="Sales & Marketing Spend"
                tooltip="Your total sales and marketing spend for the quarter"
                placeholder="Enter sales and marketing spend"
              />
              <SelectField
                control={control}
                name="timePeriod"
                label="Time Period"
                tooltip="Select the time period for your data"
                options={[
                  { value: "quarterly", label: "Quarterly" },
                  { value: "annually", label: "Annually" },
                ]}
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
