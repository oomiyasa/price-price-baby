
import { MagicNumberData, MagicNumberResult } from "../types";

export const calculateMagicNumber = (data: MagicNumberData): MagicNumberResult => {
  const {
    currentQuarterRevenue,
    previousQuarterRevenue,
    salesAndMarketingSpend,
  } = data;

  const revenueGrowth = ((currentQuarterRevenue - previousQuarterRevenue) / previousQuarterRevenue) * 100;
  const magicNumber = salesAndMarketingSpend === 0 
    ? 0 
    : ((currentQuarterRevenue - previousQuarterRevenue) * 4) / salesAndMarketingSpend;

  let efficiency: "Poor" | "Good" | "Excellent";
  let recommendation: string;

  if (magicNumber >= 1) {
    efficiency = "Excellent";
    recommendation = "Your sales efficiency is strong. Consider increasing investment in sales and marketing to accelerate growth.";
  } else if (magicNumber >= 0.75) {
    efficiency = "Good";
    recommendation = "Your sales efficiency is healthy. Focus on optimizing current processes to push towards excellent efficiency.";
  } else {
    efficiency = "Poor";
    recommendation = "Consider reducing sales and marketing spend or improving sales efficiency through process optimization.";
  }

  return {
    magicNumber,
    efficiency,
    revenueGrowth,
    recommendation,
  };
};
