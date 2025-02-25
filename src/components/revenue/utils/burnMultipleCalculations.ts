
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

  // First, assess the burn multiple
  if (burnMultiple <= 1) {
    efficiency = "Excellent";
  } else if (burnMultiple <= 2) {
    efficiency = "Good";
  } else {
    efficiency = "Poor";
  }

  // Then create a recommendation that considers both burn multiple and runway
  if (runwayMonths > 24) {
    // Very healthy runway
    if (efficiency === "Excellent") {
      recommendation = `Outstanding capital efficiency with ${runwayMonths} months of runway. Well positioned for long-term sustainable growth.`;
    } else if (efficiency === "Good") {
      recommendation = `Good burn efficiency and a very healthy ${runwayMonths} month runway. Consider optimizing spend while maintaining growth trajectory.`;
    } else {
      recommendation = `While burn efficiency could be improved, your ${runwayMonths} month runway provides ample time to optimize operations without immediate pressure.`;
    }
  } else if (runwayMonths > 18) {
    // Healthy runway
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency and a healthy ${runwayMonths} month runway. Well positioned for continued growth.`;
    } else if (efficiency === "Good") {
      recommendation = `Solid burn efficiency with ${runwayMonths} months of runway. Focus on maintaining or improving efficiency metrics.`;
    } else {
      recommendation = `With ${runwayMonths} months of runway, you have time to improve burn efficiency through operational optimizations.`;
    }
  } else if (runwayMonths > 12) {
    // Moderate runway
    if (efficiency === "Excellent") {
      recommendation = `Good capital efficiency. With ${runwayMonths} months runway, consider future fundraising plans while maintaining growth.`;
    } else if (efficiency === "Good") {
      recommendation = `Reasonable efficiency metrics. With ${runwayMonths} months runway, focus on optimization while planning next funding round.`;
    } else {
      recommendation = `With ${runwayMonths} months runway, prioritize improving burn efficiency and begin preparing for your next funding round.`;
    }
  } else if (runwayMonths > 6) {
    // Limited runway
    if (efficiency === "Excellent") {
      recommendation = `Despite strong efficiency, ${runwayMonths} month runway suggests initiating fundraising discussions soon.`;
    } else if (efficiency === "Good") {
      recommendation = `With ${runwayMonths} months runway, focus on maintaining efficiency while actively pursuing additional funding.`;
    } else {
      recommendation = `${runwayMonths} month runway requires attention. Focus on improving burn efficiency while preparing for fundraising.`;
    }
  } else {
    // Critical runway
    if (efficiency === "Excellent") {
      recommendation = `Despite excellent efficiency, ${runwayMonths} month runway requires immediate fundraising attention.`;
    } else if (efficiency === "Good") {
      recommendation = `${runwayMonths} month runway requires urgent fundraising focus while maintaining current efficiency.`;
    } else {
      recommendation = `Critical: ${runwayMonths} month runway requires immediate focus on both fundraising and burn rate reduction.`;
    }
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
