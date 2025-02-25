
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ElasticityData } from "../types/elasticity";
import { NumericInput } from "@/components/revenue/components/form/NumericInput";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

interface ElasticityFormProps {
  onCalculate: (data: ElasticityData) => void;
}

export function ElasticityForm({ onCalculate }: ElasticityFormProps) {
  const form = useForm<ElasticityData>({
    defaultValues: {
      currentPrice: undefined,
      currentDemand: undefined,
      newPrice: undefined,
      newDemand: undefined,
    },
  });

  const handleSubmit = (data: ElasticityData) => {
    // Validate that all numbers are positive
    if (Object.values(data).some(value => value <= 0)) {
      toast.error("All values must be greater than zero");
      return;
    }
    onCalculate(data);
    toast.success("Elasticity calculated successfully");
  };

  const handleReset = () => {
    form.reset();
    toast.info("Form has been reset");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Price Elasticity Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <NumericInput
              control={form.control}
              name="currentPrice"
              label="Current Price"
              tooltip="Your product's current price point"
              placeholder="Enter current price"
            />
            <NumericInput
              control={form.control}
              name="currentDemand"
              label="Current Demand"
              tooltip="Current number of units sold at this price"
              placeholder="Enter current demand"
            />
            <NumericInput
              control={form.control}
              name="newPrice"
              label="New Price"
              tooltip="The new price point you want to test"
              placeholder="Enter new price"
            />
            <NumericInput
              control={form.control}
              name="newDemand"
              label="Expected Demand"
              tooltip="Expected number of units sold at the new price"
              placeholder="Enter expected demand"
            />
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Calculate Elasticity
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="border-[#8B8B73] text-[#4A4A3F] hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
