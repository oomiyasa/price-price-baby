
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ElasticityData } from "../types/elasticity";
import { NumericInput } from "@/components/revenue/components/form/NumericInput";
import { Form } from "@/components/ui/form";

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Price Elasticity Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-4">
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
            <Button type="submit" className="w-full">
              Calculate Elasticity
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
