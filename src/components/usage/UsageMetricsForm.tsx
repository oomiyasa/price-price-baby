
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CurrentPricingForm } from "@/types/usage-based";

interface UsageMetricsFormProps {
  form: UseFormReturn<CurrentPricingForm>;
}

export const UsageMetricsForm = ({ form }: UsageMetricsFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-[#4A4A3F]">
        Usage Metrics Configuration
      </h3>

      <FormField
        control={form.control}
        name="unitOfMeasure"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Unit of Measure
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Select the primary metric you'll use to measure usage
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit of measure" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="apiCalls">API Calls</SelectItem>
                <SelectItem value="storage">Storage (GB)</SelectItem>
                <SelectItem value="activeUsers">Active Users</SelectItem>
                <SelectItem value="messagesSent">Messages Sent</SelectItem>
                <SelectItem value="computeHours">Compute Hours</SelectItem>
                <SelectItem value="bandwidth">Bandwidth (GB)</SelectItem>
                <SelectItem value="outputOutcome">Output/Outcome</SelectItem>
                <SelectItem value="custom">Custom Metric</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("unitOfMeasure") === "custom" && (
        <FormField
          control={form.control}
          name="customMetricName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Metric Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your custom metric name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="averageMonthlyUsage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Expected Average Monthly Usage
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Estimate the average monthly usage per customer
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <FormControl>
              <Input type="number" {...field} placeholder="Enter average monthly usage" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="usageVariance"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Usage Variance Across Customers (%)
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  Estimated percentage variation in usage between your customers
                </TooltipContent>
              </Tooltip>
            </FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                placeholder="Enter percentage variance"
                min="0"
                max="100"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
