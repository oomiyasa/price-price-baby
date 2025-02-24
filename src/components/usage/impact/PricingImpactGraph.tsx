
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export const PricingImpactGraph = () => {
  const metrics = [
    {
      name: "MRR",
      current: 10000,
      projected: 15000,
      percentChange: 50,
      tooltip: "Monthly Recurring Revenue based on current usage patterns and pricing",
    },
    {
      name: "ARR",
      current: 120000,
      projected: 180000,
      percentChange: 50,
      tooltip: "Annual Recurring Revenue calculated as MRR × 12",
    },
    {
      name: "CLTV",
      current: 360000,
      projected: 540000,
      percentChange: 50,
      tooltip: "Customer Lifetime Value calculated as ARR × Average Customer Lifetime (years)",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Metric</TableHead>
            <TableHead>Current</TableHead>
            <TableHead>Projected</TableHead>
            <TableHead>% Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.name}>
              <TableCell className="font-medium flex items-center gap-2">
                {metric.name}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-[#8B8B73] cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {metric.tooltip}
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{formatCurrency(metric.current)}</TableCell>
              <TableCell>{formatCurrency(metric.projected)}</TableCell>
              <TableCell className="text-green-600">+{metric.percentChange}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
