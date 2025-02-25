
export type TimeSpan = "monthly" | "quarterly" | "annual";

export interface DiscountScenario {
  basePrice: number;
  discountPercentage: number;
  currentSales: number;
  expectedSales: number;
  costPerUnit: number;
  timespan: TimeSpan;
}

export interface DiscountResults {
  revenue: number;
  profit: number;
  profitMargin: number;
  effectivePrice: number;
  salesIncrease: number;
  revenueChange: number;
  profitChange: number;
}
