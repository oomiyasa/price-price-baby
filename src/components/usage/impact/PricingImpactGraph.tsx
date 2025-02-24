
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
import { useLocation } from 'react-router-dom';

export const PricingImpactGraph = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  // Calculate metrics based on form data
  const calculateMetrics = () => {
    const baseMonthlyRevenue = formData?.pricingComponents?.monthlyBase || 0;
    const avgUsage = Number(formData?.averageMonthlyUsage) || 0;
    const additionalUnitPrice = Number(formData?.pricingComponents?.additionalUnitPrice) || 0;
    const includedUnits = Number(formData?.pricingComponents?.includedUnits) || 0;
    const customerLifetime = Number(formData?.customerLifetime) || 3;
    const growthRate = Number(formData?.growthRate) || 15;
    const setupFee = Number(formData?.pricingComponents?.setupFee) || 0;

    // Calculate additional usage revenue
    const additionalUsageRevenue = Math.max(0, avgUsage - includedUnits) * additionalUnitPrice;
    
    // Calculate current MRR (excluding setup fee)
    const currentMRR = baseMonthlyRevenue + additionalUsageRevenue;
    
    // Calculate projected MRR with growth rate (excluding setup fee)
    const projectedMRR = currentMRR * (1 + (growthRate / 100));
    
    // Calculate ARR (excluding setup fee)
    const currentARR = currentMRR * 12;
    const projectedARR = projectedMRR * 12;
    
    // Calculate CLTV including setup fee only once
    const currentCLTV = (currentARR * customerLifetime) + setupFee;
    const projectedCLTV = (projectedARR * customerLifetime) + setupFee;

    return [
      {
        name: "MRR",
        current: currentMRR,
        projected: projectedMRR,
        percentChange: ((projectedMRR - currentMRR) / currentMRR * 100).toFixed(1),
        tooltip: "Monthly Recurring Revenue based on current usage patterns and pricing (excludes one-time setup fee)",
      },
      {
        name: "ARR",
        current: currentARR,
        projected: projectedARR,
        percentChange: ((projectedARR - currentARR) / currentARR * 100).toFixed(1),
        tooltip: "Annual Recurring Revenue calculated as MRR × 12 (excludes one-time setup fee)",
      },
      {
        name: "CLTV",
        current: currentCLTV,
        projected: projectedCLTV,
        percentChange: ((projectedCLTV - currentCLTV) / currentCLTV * 100).toFixed(1),
        tooltip: "Customer Lifetime Value calculated as (ARR × Average Customer Lifetime) + Setup Fee",
      },
    ];
  };

  const metrics = calculateMetrics();

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
