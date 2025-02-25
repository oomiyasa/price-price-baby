
import { DiscountScenario, DiscountResults } from "../types/discount";

export const calculateDiscountResults = (scenario: DiscountScenario): DiscountResults => {
  const effectivePrice = scenario.basePrice * (1 - scenario.discountPercentage / 100);
  
  // Calculate current metrics
  const currentRevenue = scenario.basePrice * scenario.currentSales;
  const currentCosts = scenario.costPerUnit * scenario.currentSales;
  const currentProfit = currentRevenue - currentCosts;

  // Calculate new metrics
  const revenue = effectivePrice * scenario.expectedSales;
  const totalCosts = scenario.costPerUnit * scenario.expectedSales;
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
