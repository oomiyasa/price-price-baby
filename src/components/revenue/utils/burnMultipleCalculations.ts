
import { BurnMultipleData, BurnMultipleResult } from "../types";

export const calculateBurnMultiple = (data: BurnMultipleData): BurnMultipleResult => {
  const {
    currentQuarterRevenue,
    previousQuarterRevenue,
    currentQuarterBurn,
    timePeriod,
  } = data;

  // Calculate revenue growth
  const revenueGrowth =
    ((currentQuarterRevenue - previousQuarterRevenue) / previousQuarterRevenue) * 100;

  // Calculate burn multiple
  const annualizedGrowth = timePeriod === "annually" ? revenueGrowth : revenueGrowth * 4;
  const annualizedBurn = timePeriod === "annually" ? currentQuarterBurn : currentQuarterBurn * 4;
  
  const burnMultiple = Math.abs(annualizedBurn / (currentQuarterRevenue - previousQuarterRevenue));

  // Determine efficiency rating
  let efficiency: "Excellent" | "Good" | "Poor";
  let recommendation: string;

  if (burnMultiple <= 1) {
    efficiency = "Excellent";
    recommendation = "Your burn efficiency is excellent. Consider maintaining current strategies while exploring opportunities for growth acceleration.";
  } else if (burnMultiple <= 2) {
    efficiency = "Good";
    recommendation = "Your burn rate is healthy. Look for opportunities to optimize spending without sacrificing growth.";
  } else {
    efficiency = "Poor";
    recommendation = "Your burn rate is high relative to growth. Focus on improving operational efficiency and reducing non-essential expenses.";
  }

  return {
    burnMultiple,
    efficiency,
    recommendation,
    revenueGrowth,
    quarterlyBurn: currentQuarterBurn,
  };
};
