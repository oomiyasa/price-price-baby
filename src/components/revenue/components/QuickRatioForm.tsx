
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { QuickRatioData } from "../types";
import { NumericInput } from "./form/NumericInput";
import { SelectField } from "./form/SelectField";

interface QuickRatioFormProps {
  onSubmit: (data: QuickRatioData) => void;
}

export function QuickRatioForm({ onSubmit }: QuickRatioFormProps) {
  const form = useForm<QuickRatioData>({
    defaultValues: {
      newMRR: 0,
      expansionMRR: 0,
      churnMRR: 0,
      contractionMRR: 0,
      timePeriod: "monthly",
    },
  });

  const { control } = form;

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">Growth MRR</h3>
              <div className="space-y-4">
                <NumericInput
                  control={control}
                  name="newMRR"
                  label="New MRR"
                  tooltip="Monthly Recurring Revenue from new customers"
                  placeholder="Enter new MRR"
                />
                <NumericInput
                  control={control}
                  name="expansionMRR"
                  label="Expansion MRR"
                  tooltip="Additional MRR from existing customers (upgrades)"
                  placeholder="Enter expansion MRR"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">Lost MRR</h3>
              <div className="space-y-4">
                <NumericInput
                  control={control}
                  name="churnMRR"
                  label="Churn MRR"
                  tooltip="Lost MRR from customers who cancelled"
                  placeholder="Enter churn MRR"
                />
                <NumericInput
                  control={control}
                  name="contractionMRR"
                  label="Contraction MRR"
                  tooltip="Lost MRR from customers who downgraded"
                  placeholder="Enter contraction MRR"
                />
              </div>
            </div>

            <SelectField
              control={control}
              name="timePeriod"
              label="Time Period"
              tooltip="Select the time period for your MRR data"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "annually", label: "Annually" },
              ]}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-[#8B8B73] hover:bg-[#6B6B5F] text-white"
              >
                Calculate Quick Ratio
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
