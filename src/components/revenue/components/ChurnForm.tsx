
import React from "react";
import { useForm } from "react-hook-form";
import { ChurnData } from "../types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NumericInput } from "./form/NumericInput";
import { SelectField } from "./form/SelectField";

const INDUSTRY_OPTIONS = [
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "eCommerce" },
  { value: "fintech", label: "FinTech" },
  { value: "healthcare", label: "Healthcare" },
  { value: "telecom", label: "Telecom" },
  { value: "media", label: "Media" },
  { value: "other", label: "Other" },
];

const TIME_PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" },
];

const CHURN_TYPE_OPTIONS = [
  { value: "voluntary", label: "Voluntary" },
  { value: "involuntary", label: "Involuntary" },
  { value: "both", label: "Both" },
];

interface ChurnFormProps {
  onSubmit: (data: ChurnData) => void;
}

export const ChurnForm: React.FC<ChurnFormProps> = ({ onSubmit }) => {
  const form = useForm<ChurnData>({
    defaultValues: {
      startingCustomers: undefined,
      endingCustomers: undefined,
      churnedCustomers: undefined,
      newCustomers: undefined,
      startingMRR: undefined,
      churnedMRR: undefined,
      expansionMRR: undefined,
      customerAcquisitionCost: undefined,
      timePeriod: "monthly",
      churnType: "both",
      industry: "saas",
    },
  });

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NumericInput
                control={form.control}
                name="startingCustomers"
                label="Starting Customers"
                tooltip="Number of customers at the start of the period"
                placeholder="Enter customer count"
              />

              <NumericInput
                control={form.control}
                name="endingCustomers"
                label="Ending Customers"
                tooltip="Number of customers at the end of the period"
                placeholder="Enter customer count"
              />

              <NumericInput
                control={form.control}
                name="newCustomers"
                label="New Customers"
                tooltip="Number of new customers acquired"
                placeholder="Enter new customers"
              />

              <NumericInput
                control={form.control}
                name="startingMRR"
                label="Starting MRR ($)"
                tooltip="Monthly Recurring Revenue at start"
                placeholder="Enter starting MRR"
              />

              <NumericInput
                control={form.control}
                name="churnedMRR"
                label="Churned MRR ($)"
                tooltip="MRR lost from churned customers"
                placeholder="Enter churned MRR"
              />

              <NumericInput
                control={form.control}
                name="expansionMRR"
                label="Expansion MRR ($)"
                tooltip="Additional MRR from upsells/cross-sells"
                placeholder="Enter expansion MRR (optional)"
                optional
              />

              <NumericInput
                control={form.control}
                name="customerAcquisitionCost"
                label="CAC ($)"
                tooltip="Customer Acquisition Cost (optional)"
                placeholder="Enter CAC (optional)"
                optional
              />

              <SelectField
                control={form.control}
                name="timePeriod"
                label="Time Period"
                tooltip="Select the time period for analysis"
                options={TIME_PERIOD_OPTIONS}
              />

              <SelectField
                control={form.control}
                name="industry"
                label="Industry"
                tooltip="Select your industry for benchmarking"
                options={INDUSTRY_OPTIONS}
              />

              <SelectField
                control={form.control}
                name="churnType"
                label="Churn Type"
                tooltip="Select the type of churn to analyze"
                options={CHURN_TYPE_OPTIONS}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
              >
                Calculate Churn
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
