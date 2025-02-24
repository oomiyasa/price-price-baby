
import React from "react";
import { useForm } from "react-hook-form";
import { ChurnData } from "../types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      renewalRate: undefined,
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
              <FormField
                control={form.control}
                name="startingCustomers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Starting Customers
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Number of customers at the start of the period
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter customer count"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endingCustomers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Ending Customers
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Number of customers at the end of the period
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter customer count"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newCustomers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      New Customers
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Number of new customers acquired
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter new customers"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startingMRR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Starting MRR ($)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Monthly Recurring Revenue at start
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter starting MRR"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="churnedMRR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Churned MRR ($)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          MRR lost from churned customers
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter churned MRR"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expansionMRR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Expansion MRR ($)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Additional MRR from upsells/cross-sells
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter expansion MRR (optional)"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerAcquisitionCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      CAC ($)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Customer Acquisition Cost (optional)
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter CAC (optional)"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="renewalRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Renewal Rate (%)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Percentage of customers who renew (optional)
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter renewal rate (optional)"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : undefined)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Time Period
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Select the time period for analysis
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Industry
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Select your industry for benchmarking
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="ecommerce">eCommerce</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="telecom">Telecom</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="churnType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Churn Type
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          Select the type of churn to analyze
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select churn type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="voluntary">Voluntary</SelectItem>
                        <SelectItem value="involuntary">Involuntary</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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
