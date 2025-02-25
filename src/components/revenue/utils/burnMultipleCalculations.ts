
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
  if (runwayMonths > 36) {
    // Exceptional runway (3+ years)
    if (efficiency === "Excellent") {
      recommendation = `Outstanding capital efficiency with ${runwayMonths} months of runway. Exceptionally well positioned for long-term growth and strategic investments.`;
    } else if (efficiency === "Good") {
      recommendation = `Good burn efficiency with an exceptional ${runwayMonths} month runway. Strong position to optimize growth strategies at your own pace.`;
    } else {
      recommendation = `Your ${runwayMonths} month runway provides a very comfortable cushion. Take advantage of this strong cash position to gradually optimize burn efficiency.`;
    }
  } else if (runwayMonths > 24) {
    // Very healthy runway (2+ years)
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency with a healthy ${runwayMonths} month runway. Well positioned for sustainable long-term growth.`;
    } else if (efficiency === "Good") {
      recommendation = `Good burn efficiency and a healthy ${runwayMonths} month runway. Comfortable position to fine-tune growth strategies.`;
    } else {
      recommendation = `With ${runwayMonths} months of runway, you have ample time to improve burn efficiency while maintaining current operations.`;
    }
  } else if (runwayMonths > 18) {
    // Solid runway (1.5+ years)
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency and a solid ${runwayMonths} month runway. Good position for executing growth plans.`;
    } else if (efficiency === "Good") {
      recommendation = `Solid burn efficiency with ${runwayMonths} months of runway. Consider gradual optimizations to extend runway further.`;
    } else {
      recommendation = `Your ${runwayMonths} month runway provides time to implement operational improvements. Focus on enhancing burn efficiency.`;
    }
  } else if (runwayMonths > 12) {
    // Standard runway (1+ year)
    if (efficiency === "Excellent") {
      recommendation = `Good capital efficiency. With ${runwayMonths} months runway, start planning future fundraising while focusing on growth.`;
    } else if (efficiency === "Good") {
      recommendation = `Decent metrics with ${runwayMonths} months runway. Begin considering next funding round while optimizing operations.`;
    } else {
      recommendation = `With ${runwayMonths} months runway, focus on improving burn efficiency while preparing for your next funding round.`;
    }
  } else if (runwayMonths > 6) {
    // Getting tight (6-12 months)
    if (efficiency === "Excellent") {
      recommendation = `Strong efficiency metrics, but ${runwayMonths} month runway suggests starting fundraising preparations soon.`;
    } else if (efficiency === "Good") {
      recommendation = `With ${runwayMonths} months runway, begin fundraising preparations while maintaining current efficiency.`;
    } else {
      recommendation = `${runwayMonths} month runway indicates need for attention. Consider both fundraising preparation and efficiency improvements.`;
    }
  } else {
    // Critical runway (<6 months)
    if (efficiency === "Excellent") {
      recommendation = `Despite excellent efficiency, ${runwayMonths} month runway requires immediate fundraising attention.`;
    } else if (efficiency === "Good") {
      recommendation = `${runwayMonths} month runway indicates urgent need to secure additional funding while maintaining operations.`;
    } else {
      recommendation = `Critical: ${runwayMonths} month runway requires immediate fundraising focus and burn rate optimization.`;
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
