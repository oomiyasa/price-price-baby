
import { Card, CardContent } from "@/components/ui/card";
import { LTVResults as LTVResultsType } from "../types";
import { formatCurrency } from "../utils/ltvCalculations";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

interface LTVResultsProps {
  results: LTVResultsType;
}

export const LTVResults = ({ results }: LTVResultsProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">Basic LTV</h3>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                {formatCurrency(results.basicLTV)}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Net Profit LTV
              </h3>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                {formatCurrency(results.netProfitLTV)}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#4A4A3F] mb-2">
                Growth-Adjusted LTV
              </h3>
              <p className="text-3xl font-bold text-[#4A4A3F]">
                {formatCurrency(results.growthAdjustedLTV)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#FAFAFA]">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-[#4A4A3F] mb-4">LTV Breakdown</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Basic LTV",
                    value: results.basicLTV,
                  },
                  {
                    name: "With Cross-Sell",
                    value: results.adjustedLTV,
                  },
                  {
                    name: "Net Profit",
                    value: results.netProfitLTV,
                  },
                  {
                    name: "Growth-Adjusted",
                    value: results.growthAdjustedLTV,
                  },
                  {
                    name: "Referral Value",
                    value: results.referralValue,
                  },
                ]}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#8B8B73" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
