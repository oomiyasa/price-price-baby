
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface SelfAssessmentSectionProps {
  control: Control<any>;
}

export function SelfAssessmentSection({ control }: SelfAssessmentSectionProps) {
  const metrics = [
    {
      name: "productQuality",
      label: "Product Quality",
      tooltip: "Rate your product quality on a scale of 1-7",
      placeholder: "Enter a rating from 1-7",
    },
    {
      name: "serviceQuality",
      label: "Service Quality",
      tooltip: "Rate your service quality on a scale of 1-7",
      placeholder: "Enter a rating from 1-7",
    },
    {
      name: "brandEquity",
      label: "Brand Equity",
      tooltip: "Rate your brand strength on a scale of 1-7",
      placeholder: "Enter a rating from 1-7",
    },
    {
      name: "customerSatisfaction",
      label: "Customer Satisfaction",
      tooltip: "Rate your customer satisfaction on a scale of 1-7",
      placeholder: "Enter a rating from 1-7",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#4A4A3F]">Self Assessment</h3>
      
      {metrics.map((metric) => (
        <FormField
          key={metric.name}
          control={control}
          name={`selfAssessment.${metric.name}`}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>{metric.label}</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{metric.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={7}
                  placeholder={metric.placeholder}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}

      <FormField
        control={control}
        name="selfAssessment.pricePerUnit"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Price per Unit</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your current price per unit</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input
                type="number"
                min={0}
                step={0.01}
                placeholder="Enter your price per unit"
                {...field}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
