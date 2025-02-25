
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NumericInput } from "@/components/revenue/components/form/NumericInput";
import { SelectField } from "@/components/revenue/components/form/SelectField";
import { toast } from "sonner";
import { DiscountScenario, TimeSpan } from "../types/discount";

interface DiscountFormProps {
  onCalculate: (data: DiscountScenario) => void;
}

const timespanOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual" },
];

export function DiscountForm({ onCalculate }: DiscountFormProps) {
  const form = useForm<DiscountScenario>({
    defaultValues: {
      basePrice: undefined,
      discountPercentage: undefined,
      currentSales: undefined,
      expectedSales: undefined,
      costPerUnit: undefined,
      timespan: "monthly",
    },
  });

  const handleSubmit = (data: DiscountScenario) => {
    if (data.discountPercentage < 0 || data.discountPercentage > 100) {
      toast.error("Discount percentage must be between 0 and 100");
      return;
    }
    if (Object.values(data).some(value => value <= 0)) {
      toast.error("All values must be greater than zero");
      return;
    }
    if (data.expectedSales <= data.currentSales) {
      toast.error("Expected sales should be higher than current sales when applying a discount");
      return;
    }
    onCalculate(data);
    toast.success("Discount impact calculated successfully");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Discount Strategy Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <SelectField
              control={form.control}
              name="timespan"
              label="Time Period"
              tooltip="Select the time period for analysis"
              options={timespanOptions}
            />
            <NumericInput
              control={form.control}
              name="basePrice"
              label="Base Price"
              tooltip="Your product's original price before discount"
              placeholder="Enter base price"
            />
            <NumericInput
              control={form.control}
              name="discountPercentage"
              label="Discount Percentage"
              tooltip="Percentage discount to apply (0-100)"
              placeholder="Enter discount percentage"
            />
            <NumericInput
              control={form.control}
              name="currentSales"
              label="Current Sales Volume"
              tooltip={`Your current ${form.watch("timespan")} sales volume without discount`}
              placeholder="Enter current sales volume"
            />
            <NumericInput
              control={form.control}
              name="expectedSales"
              label="Expected Sales Volume"
              tooltip={`Estimated ${form.watch("timespan")} sales volume after applying the discount`}
              placeholder="Enter expected sales volume"
            />
            <NumericInput
              control={form.control}
              name="costPerUnit"
              label="Cost Per Unit"
              tooltip="Your total cost to produce/acquire one unit"
              placeholder="Enter cost per unit"
            />
            <Button type="submit" className="w-full">
              Calculate Impact
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
