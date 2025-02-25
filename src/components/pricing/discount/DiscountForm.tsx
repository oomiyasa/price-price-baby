
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NumericInput } from "@/components/revenue/components/form/NumericInput";
import { toast } from "sonner";
import { DiscountScenario } from "../types/discount";

interface DiscountFormProps {
  onCalculate: (data: DiscountScenario) => void;
}

export function DiscountForm({ onCalculate }: DiscountFormProps) {
  const form = useForm<DiscountScenario>({
    defaultValues: {
      basePrice: undefined,
      discountPercentage: undefined,
      expectedSales: undefined,
      costPerUnit: undefined,
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
              name="expectedSales"
              label="Expected Sales Volume"
              tooltip="Estimated number of units you expect to sell at this price"
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
