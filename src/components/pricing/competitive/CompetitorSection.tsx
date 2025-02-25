
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Control } from "react-hook-form";
import { RELATIVE_SCORE_OPTIONS } from "../types/competitive";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface CompetitorSectionProps {
  control: Control<any>;
  index: number;
  onRemove: () => void;
}

export function CompetitorSection({
  control,
  index,
  onRemove,
}: CompetitorSectionProps) {
  const metrics = [
    {
      name: "productQuality",
      label: "Product Quality",
      tooltip: "How does their product quality compare to yours?",
    },
    {
      name: "serviceQuality",
      label: "Service Quality",
      tooltip: "How does their service quality compare to yours?",
    },
    {
      name: "brandEquity",
      label: "Brand Equity",
      tooltip: "How does their brand strength compare to yours?",
    },
    {
      name: "customerSatisfaction",
      label: "Customer Satisfaction",
      tooltip: "How does their customer satisfaction compare to yours?",
    },
  ];

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center justify-between">
        <FormField
          control={control}
          name={`competitors.${index}.name`}
          render={({ field }) => (
            <FormItem className="flex-1 mr-4">
              <FormLabel>Competitor Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter competitor name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="self-end"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <FormField
        control={control}
        name={`competitors.${index}.pricePerUnit`}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Price per Unit</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Their price per unit</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input
                type="number"
                min={0}
                step={0.01}
                placeholder="Enter competitor's price per unit"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {metrics.map((metric) => (
        <FormField
          key={metric.name}
          control={control}
          name={`competitors.${index}.metrics.${metric.name}`}
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
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relative performance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RELATIVE_SCORE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
