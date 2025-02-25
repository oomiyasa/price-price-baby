
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CACData } from "../types";
import { NumericInput } from "./form/NumericInput";
import { SelectField } from "./form/SelectField";
import { Plus, Trash2 } from "lucide-react";

interface CACFormProps {
  onSubmit: (data: CACData) => void;
}

export function CACForm({ onSubmit }: CACFormProps) {
  const form = useForm<CACData>({
    defaultValues: {
      marketingCosts: [{ channel: "", cost: undefined }],
      salesCosts: [{ category: "", cost: undefined }],
      timePeriod: "monthly",
      newCustomers: undefined,
      avgContractValue: undefined,
    },
  });

  const { control } = form;

  const marketingFields = useFieldArray({
    control,
    name: "marketingCosts",
  });

  const salesFields = useFieldArray({
    control,
    name: "salesCosts",
  });

  return (
    <Card className="bg-[#FAFAFA]">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">Marketing Costs</h3>
              <div className="space-y-4">
                {marketingFields.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4">
                    <NumericInput
                      control={control}
                      name={`marketingCosts.${index}.cost`}
                      label={`Marketing Channel ${index + 1}`}
                      tooltip="Enter the cost for this marketing channel"
                      placeholder="Enter cost"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => marketingFields.remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => marketingFields.append({ channel: "", cost: undefined })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Marketing Cost
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#4A4A3F] mb-4">Sales Costs</h3>
              <div className="space-y-4">
                {salesFields.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4">
                    <NumericInput
                      control={control}
                      name={`salesCosts.${index}.cost`}
                      label={`Sales Cost ${index + 1}`}
                      tooltip="Enter the cost for this sales category"
                      placeholder="Enter cost"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => salesFields.remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => salesFields.append({ category: "", cost: undefined })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Sales Cost
                </Button>
              </div>
            </div>

            <SelectField
              control={control}
              name="timePeriod"
              label="Time Period"
              tooltip="Select the time period for your costs"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "annually", label: "Annually" },
              ]}
            />

            <NumericInput
              control={control}
              name="newCustomers"
              label="New Customers"
              tooltip="Enter the number of new customers acquired during this period"
              placeholder="Enter number of customers"
            />

            <NumericInput
              control={control}
              name="avgContractValue"
              label="Average Contract Value"
              tooltip="Enter the average contract value per customer"
              placeholder="Enter contract value"
            />

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
