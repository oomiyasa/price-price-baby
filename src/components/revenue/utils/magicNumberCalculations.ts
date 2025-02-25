
import { MagicNumberData, MagicNumberResult } from "../types";

export const calculateMagicNumber = (data: MagicNumberData): MagicNumberResult => {
  const {
    currentQuarterRevenue,
    previousQuarterRevenue,
    salesAndMarketingSpend,
    timePeriod,
  } = data;

  // Annualize the values based on the time period
  const annualizationFactor = {
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };

  const factor = annualizationFactor[timePeriod];
  
  // Calculate revenue growth (annualized)
  const revenueGrowth = ((currentQuarterRevenue - previousQuarterRevenue) * factor);
  
  // Calculate magic number (using annualized values)
  const magicNumber = revenueGrowth / (salesAndMarketingSpend * factor);

  // Determine efficiency rating and recommendation
  let efficiency: "Poor" | "Good" | "Excellent";
  let recommendation: string;

  if (magicNumber <= 0) {
    efficiency = "Poor";
    recommendation = "Your sales efficiency is negative. Focus on improving sales processes and reducing customer acquisition costs.";
  } else if (magicNumber < 0.75) {
    efficiency = "Poor";
    recommendation = "Your sales efficiency is below target. Consider optimizing marketing spend and sales processes.";
  } else if (magicNumber <= 1.5) {
    efficiency = "Good";
    recommendation = "Your sales efficiency is healthy. Continue current strategies while looking for optimization opportunities.";
  } else {
    efficiency = "Excellent";
    recommendation = "Your sales efficiency is excellent. Consider increasing investment in sales and marketing to capture more market share.";
  }

  return {
    magicNumber,
    efficiency,
    recommendation,
    revenueGrowth,
  };
};
