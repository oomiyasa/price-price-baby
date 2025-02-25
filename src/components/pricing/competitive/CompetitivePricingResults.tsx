
import React from "react";
import { CompetitiveAnalysis } from "../types/competitive";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

interface CompetitivePricingResultsProps {
  analysis: CompetitiveAnalysis;
}

export function CompetitivePricingResults({
  analysis,
}: CompetitivePricingResultsProps) {
  const metrics = ["Product Quality", "Service Quality", "Brand Equity", "Customer Satisfaction"];
  
  const radarData = metrics.map((metric) => {
    const key = metric.replace(" ", "").charAt(0).toLowerCase() + metric.replace(" ", "").slice(1);
    const dataPoint: any = {
      metric,
      You: analysis.selfAssessment[key as keyof typeof analysis.selfAssessment],
    };

    analysis.competitors.forEach((competitor) => {
      const competitorScore = analysis.selfAssessment[key as keyof typeof analysis.selfAssessment] +
        competitor.metrics[key as keyof typeof competitor.metrics];
      dataPoint[competitor.name] = Math.max(1, Math.min(7, competitorScore));
    });

    return dataPoint;
  });

  const priceComparison = [
    {
      name: "Your Price",
      price: analysis.selfAssessment.pricePerUnit,
    },
    ...analysis.competitors.map((competitor) => ({
      name: competitor.name,
      price: competitor.pricePerUnit,
    })),
  ];

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-medium text-[#4A4A3F]">Competitive Analysis</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              {Object.keys(radarData[0])
                .filter((key) => key !== "metric")
                .map((key, index) => (
                  <Radar
                    key={key}
                    name={key}
                    dataKey={key}
                    stroke={`hsl(${index * 45}, 70%, 50%)`}
                    fill={`hsl(${index * 45}, 70%, 50%)`}
                    fillOpacity={0.3}
                  />
                ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Price Comparison</h4>
          <div className="space-y-2">
            {priceComparison.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span>{item.name}</span>
                <span className="font-medium">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
