import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Text } from "recharts";
import { ChurnResults as ChurnResultsType } from "../types";

interface ChurnResultsProps {
  results: ChurnResultsType;
  getBenchmarkColor: (rating: "good" | "average" | "risk") => string;
  churnType: "voluntary" | "involuntary" | "both";
}

const preventionStrategies = {
  voluntary: [
    "Implement proactive customer success programs",
    "Regular check-ins and feedback collection",
    "Offer competitive pricing and features",
    "Create loyalty programs and incentives",
    "Improve product quality and user experience",
  ],
  involuntary: [
    "Update payment information proactively",
    "Implement smart dunning management",
    "Send early renewal notifications",
    "Offer flexible payment options",
    "Monitor failed payment patterns",
  ],
};

const formatIndustryName = (industry: string) => {
  switch (industry) {
    case "saas":
      return "SaaS";
    case "ecommerce":
      return "E-commerce";
    case "fintech":
      return "FinTech";
    case "healthcare":
      return "Healthcare";
    case "telecom":
      return "Telecom";
    case "media":
      return "Media";
    default:
      return "Other";
  }
};

export const ChurnResults: React.FC<ChurnResultsProps> = ({ 
  results, 
  getBenchmarkColor,
  churnType
}) => {
  return (
    <div className="space-y-6">
      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Logo Churn Rate
              </h3>
              <p className={`text-3xl font-bold ${getBenchmarkColor(results.benchmarkComparison)}`}>
                {results.logoChurnRate.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Revenue Churn Rate
              </h3>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                {results.revenueChurnRate.toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Customer Lifetime (Months)
              </h3>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                {results.customerLifetimeMonths.toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
            Industry Benchmarks - {formatIndustryName(results.industryData.industry)}
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Top Performers",
                    value: results.industryData.topQuartile,
                    fill: "#4ade80"
                  },
                  {
                    name: "Industry Average",
                    value: results.industryData.average,
                    fill: "#fbbf24"
                  },
                  {
                    name: "Bottom Performers",
                    value: results.industryData.bottomQuartile,
                    fill: "#f87171"
                  },
                  {
                    name: "Your Rate",
                    value: results.logoChurnRate,
                    fill: "#8B8B73"
                  }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-[#6B6B5F] mt-4 text-center italic">
            Source: Industry benchmarks based on OpenView Partners 2023 SaaS Benchmarks Report and McKinsey Digital Consumer Survey 2023
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
            Growth Analysis
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Net Customer Change</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {results.netCustomerChange}
                    {results.netCustomerChange > 0 ? (
                      <TrendingUp className="text-green-600 h-4 w-4" />
                    ) : (
                      <TrendingDown className="text-red-600 h-4 w-4" />
                    )}
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Growth Rate</TableCell>
                <TableCell>{results.growthRate.toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Revenue Loss</TableCell>
                <TableCell>${results.netRevenueLoss.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Retention Rate</TableCell>
                <TableCell>{results.retentionRate.toFixed(1)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">
            Prevention Strategies
          </h3>
          <div className="space-y-4">
            {churnType !== "involuntary" && (
              <div>
                <h4 className="font-medium text-[#4A4A3F] mb-2">
                  Voluntary Churn Prevention
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  {preventionStrategies.voluntary.map((strategy, index) => (
                    <li key={index} className="text-[#6B6B5F]">
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {churnType !== "voluntary" && (
              <div>
                <h4 className="font-medium text-[#4A4A3F] mb-2">
                  Involuntary Churn Prevention
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  {preventionStrategies.involuntary.map((strategy, index) => (
                    <li key={index} className="text-[#6B6B5F]">
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
