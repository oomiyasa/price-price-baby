
export interface RevenueData {
  monthlyRevenue: number;
  growthRate: number;
  projectionMonths: number;
}

export interface RevenueProjection {
  month: string;
  mrr: number;
  arr: number;
}

export interface CohortData {
  startDate: string;
  initialRevenue: number;
  expansionRevenue: number;
  churnedRevenue: number;
}

export interface NRRResults {
  nrrPercentage: number;
  endingRevenue: number;
  netRevenue: number;
  cohorts: CohortData[];
}

export interface ChurnData {
  startingCustomers: number;
  endingCustomers: number;
  churnedCustomers: number;
  newCustomers: number;
  timePeriod: "monthly" | "quarterly" | "annually";
  churnType: "voluntary" | "involuntary" | "both";
}

export interface ChurnResults {
  churnRate: number;
  customerLifetimeMonths: number;
  retentionRate: number;
  netCustomerChange: number;
  growthRate: number;
}

export interface LTVData {
  averageRevenue: number;
  churnRate: number;
  profitMargin: number;
  revenueGrowth: number;
  crossSellRevenue: number;
  referralRate: number;
  timePeriod: "monthly" | "annually";
}

export interface LTVResults {
  basicLTV: number;
  adjustedLTV: number;
  netProfitLTV: number;
  growthAdjustedLTV: number;
  referralValue: number;
}
