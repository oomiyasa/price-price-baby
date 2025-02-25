
import { DiscountScenario, DiscountResults, TimeSpan } from "../types/discount";

const getTimespanMultiplier = (timespan: TimeSpan): number => {
  switch (timespan) {
    case "monthly":
      return 1;
    case "quarterly":
      return 3;
    case "annual":
      return 12;
    default:
      return 1;
  }
};

export const calculateDiscountResults = (scenario: DiscountScenario): DiscountResults => {
  const effectivePrice = scenario.basePrice * (1 - scenario.discountPercentage / 100);
  const multiplier = getTimespanMultiplier(scenario.timespan);
  
  // Calculate current metrics
  const currentRevenue = scenario.basePrice * scenario.currentSales * multiplier;
  const currentCosts = scenario.costPerUnit * scenario.currentSales * multiplier;
  const currentProfit = currentRevenue - currentCosts;

  // Calculate new metrics
  const revenue = effectivePrice * scenario.expectedSales * multiplier;
  const totalCosts = scenario.costPerUnit * scenario.expectedSales * multiplier;
  const profit = revenue - totalCosts;
  const profitMargin = (profit / revenue) * 100;

  // Calculate changes
  const salesIncrease = ((scenario.expectedSales - scenario.currentSales) / scenario.currentSales) * 100;
  const revenueChange = ((revenue - currentRevenue) / currentRevenue) * 100;
  const profitChange = ((profit - currentProfit) / currentProfit) * 100;

  return {
    revenue,
    profit,
    profitMargin,
    effectivePrice,
    salesIncrease,
    revenueChange,
    profitChange,
  };
};
