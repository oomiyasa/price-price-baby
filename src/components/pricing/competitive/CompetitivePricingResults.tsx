
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

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

  const calculatePricingSuggestion = () => {
    const avgCompetitorPrice = analysis.competitors.reduce((sum, comp) => sum + comp.pricePerUnit, 0) / analysis.competitors.length;
    const yourPrice = analysis.selfAssessment.pricePerUnit;
    
    // Calculate average scores
    const yourAvgScore = metrics.reduce((sum, metric) => {
      const key = metric.replace(" ", "").charAt(0).toLowerCase() + metric.replace(" ", "").slice(1);
      return sum + analysis.selfAssessment[key as keyof typeof analysis.selfAssessment];
    }, 0) / metrics.length;

    const competitorAvgScores = analysis.competitors.map(comp => ({
      name: comp.name,
      score: Object.values(comp.metrics).reduce((sum, score) => sum + score, 0) / metrics.length,
      price: comp.pricePerUnit
    }));

    // Find competitors with similar scores (within ±1 point)
    const similarCompetitors = competitorAvgScores.filter(
      comp => Math.abs(comp.score) <= 1
    );

    const priceDifference = ((yourPrice - avgCompetitorPrice) / avgCompetitorPrice) * 100;
    const significantDifference = Math.abs(priceDifference) > 15;

    if (similarCompetitors.length > 0) {
      const avgSimilarPrice = similarCompetitors.reduce((sum, comp) => sum + comp.price, 0) / similarCompetitors.length;
      const suggestedRange = {
        min: avgSimilarPrice * 0.9,
        max: avgSimilarPrice * 1.1
      };

      if (yourPrice < suggestedRange.min) {
        return {
          icon: <TrendingUp className="h-4 w-4 text-green-500" />,
          message: `Consider increasing your price. Similar competitors are charging between $${suggestedRange.min.toFixed(2)} and $${suggestedRange.max.toFixed(2)}.`,
          type: "increase" as const
        };
      } else if (yourPrice > suggestedRange.max) {
        return {
          icon: <TrendingDown className="h-4 w-4 text-orange-500" />,
          message: `Consider decreasing your price. Similar competitors are charging between $${suggestedRange.min.toFixed(2)} and $${suggestedRange.max.toFixed(2)}.`,
          type: "decrease" as const
        };
      }
    }

    if (significantDifference) {
      if (priceDifference > 0) {
        return {
          icon: <TrendingDown className="h-4 w-4 text-orange-500" />,
          message: `Your price is ${priceDifference.toFixed(1)}% above market average. Consider adjusting if not justified by superior value proposition.`,
          type: "decrease" as const
        };
      } else {
        return {
          icon: <TrendingUp className="h-4 w-4 text-green-500" />,
          message: `Your price is ${Math.abs(priceDifference).toFixed(1)}% below market average. Consider increasing if your value proposition supports it.`,
          type: "increase" as const
        };
      }
    }

    return {
      icon: <Minus className="h-4 w-4 text-[#8B8B73]" />,
      message: "Your pricing appears to be well-aligned with the market.",
      type: "maintain" as const
    };
  };

  const suggestion = calculatePricingSuggestion();

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <h3 className="text-lg font-medium text-[#4A4A3F]">Competitive Analysis</h3>
        
        <Alert className="bg-[#FAFAFA] border border-[#E5E5E0]">
          <div className="flex items-center gap-2">
            {suggestion.icon}
            <AlertDescription>
              {suggestion.message}
            </AlertDescription>
          </div>
        </Alert>

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
