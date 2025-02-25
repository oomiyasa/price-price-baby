
import { DiscountScenario, DiscountResults } from "../types/discount";

export const calculateDiscountResults = (scenario: DiscountScenario): DiscountResults => {
  const effectivePrice = scenario.basePrice * (1 - scenario.discountPercentage / 100);
  const revenue = effectivePrice * scenario.expectedSales;
  const totalCosts = scenario.costPerUnit * scenario.expectedSales;
  const profit = revenue - totalCosts;
  const profitMargin = (profit / revenue) * 100;

  return {
    revenue,
    profit,
    profitMargin,
    effectivePrice,
  };
};
