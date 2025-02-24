
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';

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

  const chartData = metrics.map(metric => ({
    name: metric.name,
    Current: metric.current,
    Projected: metric.projected,
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="space-y-8">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatYAxis} />
            <Bar dataKey="Current" fill="#8B8B73" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="Current" position="top" formatter={formatYAxis} />
            </Bar>
            <Bar dataKey="Projected" fill="#6B6B5F" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="Projected" position="top" formatter={formatYAxis} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

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
