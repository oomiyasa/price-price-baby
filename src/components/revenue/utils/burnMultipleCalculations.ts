
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

  // Helper function to get spend reduction advice based on burn multiple and growth
  const getSpendAdvice = (burnMultiple: number, revenueGrowth: number): string => {
    if (burnMultiple > 3) {
      return "Consider reducing non-essential marketing spend and optimizing CAC. Review team size and overhead costs.";
    } else if (burnMultiple > 2) {
      return revenueGrowth < 25 
        ? "Look into reducing customer acquisition costs and optimizing operational expenses."
        : "Focus on improving marketing efficiency while maintaining growth momentum.";
    }
    return "";
  };

  // Then create a recommendation that considers burn multiple, runway, and growth
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
          : "Consider optimizing spend in low-performing marketing channels while maintaining growth."
      }`;
    } else {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `Your ${runwayMonths} month runway provides a cushion, but burn efficiency needs attention. ${spendAdvice}`;
    }
  } else if (runwayMonths > 24) {
    // Very healthy runway (2+ years)
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency with a healthy ${runwayMonths} month runway. ${
        revenueGrowth > 40
          ? "Excellent growth-to-burn ratio positions you well for continued expansion."
          : "Maintain efficient spending while exploring growth opportunities."
      }`;
    } else if (efficiency === "Good") {
      recommendation = `Good burn efficiency and a healthy ${runwayMonths} month runway. ${
        revenueGrowth > 25
          ? "Growth rate validates current burn rate, but monitor CAC trends."
          : "Review marketing ROI and consider reallocating spend to higher-performing channels."
      }`;
    } else {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `With ${runwayMonths} months runway, focus on improving operational efficiency. ${spendAdvice}`;
    }
  } else if (runwayMonths > 18) {
    // Solid runway (1.5+ years)
    if (efficiency === "Excellent") {
      recommendation = `Strong capital efficiency and a solid ${runwayMonths} month runway. ${
        revenueGrowth > 30
          ? "Well-positioned to maintain growth trajectory."
          : "Maintain lean operations while investing in growth."
      }`;
    } else if (efficiency === "Good") {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `Solid burn efficiency with ${runwayMonths} months of runway. ${
        revenueGrowth > 20
          ? "Review cost structure to improve efficiency while maintaining growth."
          : spendAdvice
      }`;
    } else {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `Your ${runwayMonths} month runway provides time to optimize operations. ${spendAdvice}`;
    }
  } else if (runwayMonths > 12) {
    // Standard runway (1+ year)
    if (efficiency === "Excellent") {
      recommendation = `Good capital efficiency with ${runwayMonths} months runway. ${
        revenueGrowth > 25
          ? "Focus on maintaining efficient growth while planning ahead."
          : "Review all expenses to extend runway while pursuing growth."
      }`;
    } else if (efficiency === "Good") {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `With ${runwayMonths} months runway, ${
        revenueGrowth > 20
          ? "optimize spend across departments while maintaining momentum."
          : spendAdvice
      }`;
    } else {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `${runwayMonths} month runway requires attention. ${spendAdvice} Consider reducing non-critical headcount and overhead.`;
    }
  } else if (runwayMonths > 6) {
    // Getting tight (6-12 months)
    if (efficiency === "Excellent") {
      recommendation = `Strong efficiency metrics, but ${runwayMonths} month runway needs attention. ${
        revenueGrowth > 40
          ? "Review all costs while leveraging growth momentum for fundraising."
          : "Implement immediate cost controls while preparing for fundraising."
      }`;
    } else if (efficiency === "Good") {
      const spendAdvice = getSpendAdvice(burnMultiple, revenueGrowth);
      recommendation = `With ${runwayMonths} months runway, begin cost reduction measures. ${spendAdvice}`;
    } else {
      recommendation = `${runwayMonths} month runway requires immediate action. Implement strict cost controls, reduce non-essential spending, and consider restructuring teams.`;
    }
  } else {
    // Critical runway (<6 months)
    if (efficiency === "Excellent") {
      recommendation = `Despite good efficiency, ${runwayMonths} month runway requires immediate action. Freeze non-essential spending and prioritize fundraising.`;
    } else if (efficiency === "Good") {
      recommendation = `${runwayMonths} month runway requires urgent action. Implement immediate cost-cutting measures across all departments while pursuing funding.`;
    } else {
      recommendation = `Critical: ${runwayMonths} month runway requires drastic measures. Implement immediate spending freeze, reduce team size, and focus solely on essential operations while pursuing emergency funding.`;
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
