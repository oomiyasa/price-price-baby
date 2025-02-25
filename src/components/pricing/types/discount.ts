
export interface DiscountScenario {
  basePrice: number;
  discountPercentage: number;
  currentSales: number;
  expectedSales: number;
  costPerUnit: number;
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
