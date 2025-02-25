
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
      recommendation = `Outstanding capital efficiency with ${runwayMonths} months of runway. ${
        revenueGrowth > 50 
          ? "Your high growth rate and efficient operations are a powerful combination." 
          : "Consider leveraging your strong position to accelerate growth."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `Good burn efficiency with an exceptional ${runwayMonths} month runway. ${
        revenueGrowth > 30
          ? "Your strong growth justifies the current burn rate."
          : "Consider allocating more resources to accelerate growth given your comfortable runway."
      }`;
    } else {
      recommendation = `Your ${runwayMonths} month runway provides a very comfortable cushion. ${
        revenueGrowth > 40
          ? "While burn rate is high, your strong growth rate may justify this investment."
          : "Focus on improving capital efficiency to maximize your runway's potential."
      }`;
    }
  } else if (runwayMonths > 24) {
    // Very healthy runway (2+ years)
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency with a healthy ${runwayMonths} month runway. ${
        revenueGrowth > 40
          ? "Excellent growth-to-burn ratio positions you well for continued expansion."
          : "Consider strategic investments to accelerate growth."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `Good burn efficiency and a healthy ${runwayMonths} month runway. ${
        revenueGrowth > 25
          ? "Growth rate validates your current burn rate."
          : "Look for opportunities to optimize spend or accelerate growth."
      }`;
    } else {
      recommendation = `With ${runwayMonths} months of runway, you have time to optimize operations. ${
        revenueGrowth > 35
          ? "Focus on improving burn efficiency while maintaining growth momentum."
          : "Prioritize improving capital efficiency given the moderate growth rate."
      }`;
    }
  } else if (runwayMonths > 18) {
    // Solid runway (1.5+ years)
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency and a solid ${runwayMonths} month runway. ${
        revenueGrowth > 30
          ? "Well-positioned to maintain high growth trajectory."
          : "Consider strategic investments to accelerate growth."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `Solid burn efficiency with ${runwayMonths} months of runway. ${
        revenueGrowth > 20
          ? "Current growth rate supports your burn rate."
          : "Focus on accelerating growth or optimizing spend."
      }`;
    } else {
      recommendation = `Your ${runwayMonths} month runway provides time for improvements. ${
        revenueGrowth > 25
          ? "Focus on improving burn efficiency while maintaining growth."
          : "Prioritize both growth acceleration and burn optimization."
      }`;
    }
  } else if (runwayMonths > 12) {
    // Standard runway (1+ year)
    if (efficiency === "Excellent") {
      recommendation = `Good capital efficiency with ${runwayMonths} months runway. ${
        revenueGrowth > 25
          ? "Strong growth metrics support fundraising plans."
          : "Focus on growth acceleration while planning next round."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `Decent metrics with ${runwayMonths} months runway. ${
        revenueGrowth > 20
          ? "Maintain growth while preparing for next funding round."
          : "Focus on growth metrics to support future fundraising."
      }`;
    } else {
      recommendation = `With ${runwayMonths} months runway, ${
        revenueGrowth > 30
          ? "high growth rate helps justify burn rate, but consider optimizations."
          : "focus on improving both growth and burn efficiency metrics."
      }`;
    }
  } else if (runwayMonths > 6) {
    // Getting tight (6-12 months)
    if (efficiency === "Excellent") {
      recommendation = `Strong efficiency metrics, but ${runwayMonths} month runway needs attention. ${
        revenueGrowth > 40
          ? "High growth rate will support fundraising efforts."
          : "Accelerate growth to strengthen fundraising position."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `With ${runwayMonths} months runway, begin fundraising preparations. ${
        revenueGrowth > 30
          ? "Good growth metrics will help with fundraising."
          : "Focus on improving growth metrics for fundraising."
      }`;
    } else {
      recommendation = `${runwayMonths} month runway requires attention. ${
        revenueGrowth > 35
          ? "Strong growth helps, but improve burn efficiency."
          : "Critical to improve both growth and burn metrics."
      }`;
    }
  } else {
    // Critical runway (<6 months)
    if (efficiency === "Excellent") {
      recommendation = `Despite excellent efficiency, ${runwayMonths} month runway requires immediate action. ${
        revenueGrowth > 50
          ? "Strong growth will be crucial for fundraising."
          : "Focus on growth acceleration for fundraising."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `${runwayMonths} month runway requires urgent fundraising focus. ${
        revenueGrowth > 40
          ? "Leverage growth story while improving metrics."
          : "Immediate focus needed on growth and burn metrics."
      }`;
    } else {
      recommendation = `Critical: ${runwayMonths} month runway requires immediate action. ${
        revenueGrowth > 45
          ? "Use growth momentum to support fundraising efforts."
          : "Urgent focus needed on all key metrics."
      }`;
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
