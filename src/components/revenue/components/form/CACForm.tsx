
import React from "react";
import { useForm } from "react-hook-form";
import { CACData } from "../../types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NumericInput } from "./NumericInput";
import { SelectField } from "./SelectField";

const TIME_PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
];

interface CACFormProps {
  onSubmit: (data: CACData) => void;
}

export default function CACForm({ onSubmit }: CACFormProps) {
  const form = useForm<CACData>({
    defaultValues: {
      marketingCosts: undefined,
      salesCosts: undefined,
      newCustomers: undefined,
      timePeriod: "monthly",
    },
  });

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold text-[#4A4A3F]">
          Customer Acquisition Cost Calculator
        </h2>
        <p className="text-[#6B6B5F]">
          Calculate and analyze your customer acquisition costs
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NumericInput<CACData>
                control={form.control}
                name="marketingCosts"
                label="Marketing Costs ($)"
                tooltip="Total marketing expenses including advertising, content, and campaigns"
                placeholder="Enter marketing costs"
              />

              <NumericInput<CACData>
                control={form.control}
                name="salesCosts"
                label="Sales Costs ($)"
                tooltip="Total sales expenses including salaries, commissions, and tools"
                placeholder="Enter sales costs"
              />

              <NumericInput<CACData>
                control={form.control}
                name="newCustomers"
                label="New Customers"
                tooltip="Number of new customers acquired in this period"
                placeholder="Enter number of new customers"
              />

              <SelectField<CACData>
                control={form.control}
                name="timePeriod"
                label="Time Period"
                tooltip="Select the time period for analysis"
                options={TIME_PERIOD_OPTIONS}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
              >
                Calculate CAC
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
