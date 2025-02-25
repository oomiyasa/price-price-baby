
import { BurnMultipleData, BurnMultipleResult } from "../types";

export const calculateBurnMultiple = (data: BurnMultipleData): BurnMultipleResult => {
  const {
    currentQuarterRevenue,
    previousQuarterRevenue,
    currentQuarterBurn,
    cashOnHand,
    timePeriod,
  } = data;

  // Calculate revenue growth
  const revenueGrowth =
    ((currentQuarterRevenue - previousQuarterRevenue) / previousQuarterRevenue) * 100;

  // Calculate burn multiple
  const annualizedGrowth = timePeriod === "annually" ? revenueGrowth : revenueGrowth * 4;
  const annualizedBurn = timePeriod === "annually" ? currentQuarterBurn : currentQuarterBurn * 4;
  
  const burnMultiple = Math.abs(annualizedBurn / (currentQuarterRevenue - previousQuarterRevenue));

  // Calculate runway in months
  const monthlyBurn = currentQuarterBurn / (timePeriod === "annually" ? 12 : 3);
  const runwayMonths = monthlyBurn > 0 ? Math.floor(cashOnHand / monthlyBurn) : 0;

  // Determine efficiency rating
  let efficiency: "Excellent" | "Good" | "Poor";
  let recommendation: string;

  if (burnMultiple <= 1) {
    efficiency = "Excellent";
    recommendation = `Your burn efficiency is excellent. With ${runwayMonths} months of runway, ${
      runwayMonths > 18 
        ? "you have a healthy cash buffer to execute your growth strategy." 
        : "consider raising additional capital to extend your runway."
    }`;
  } else if (burnMultiple <= 2) {
    efficiency = "Good";
    recommendation = `Your burn rate is healthy. With ${runwayMonths} months of runway, ${
      runwayMonths > 12 
        ? "focus on optimizing spending while maintaining growth." 
        : "prioritize extending runway through cost optimization or fundraising."
    }`;
  } else {
    efficiency = "Poor";
    recommendation = `Your burn rate is high relative to growth. With ${runwayMonths} months of runway, ${
      runwayMonths > 6 
        ? "urgent focus needed on improving operational efficiency." 
        : "immediate action required to reduce burn rate or secure additional funding."
    }`;
  }

  return {
    burnMultiple,
    efficiency,
    recommendation,
    revenueGrowth,
    quarterlyBurn: currentQuarterBurn,
    runwayMonths,
    cashOnHand,
  };
};
