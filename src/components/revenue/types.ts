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
  churnedCustomers?: number;
  newCustomers: number;
  startingMRR: number;
  churnedMRR: number;
  expansionMRR?: number;
  customerAcquisitionCost?: number;
  renewalRate?: number;
  timePeriod: "monthly" | "quarterly" | "annually";
  churnType: "voluntary" | "involuntary" | "both";
  industry: Industry;
}

export type Industry = 
  | "saas"
  | "ecommerce"
  | "fintech"
  | "healthcare"
  | "telecom"
  | "media"
  | "other";

export interface IndustryBenchmark {
  industry: Industry;
  topQuartile: number;
  average: number;
  bottomQuartile: number;
}

export interface ChurnResults {
  logoChurnRate: number;
  revenueChurnRate: number;
  customerLifetimeMonths: number;
  retentionRate: number;
  netCustomerChange: number;
  growthRate: number;
  netRevenueLoss: number;
  benchmarkComparison: "good" | "average" | "risk";
  industryData: IndustryBenchmark;
}

export interface LTVData {
  averageRevenue: number;
  churnRate: number;
  profitMargin: number;
  revenueGrowth: number;
  crossSellRevenue?: number;
  referralRate?: number;
  timePeriod: "monthly" | "annually";
}

export interface LTVResults {
  basicLTV: number;
  adjustedLTV: number;
  netProfitLTV: number;
  growthAdjustedLTV: number;
  referralValue: number;
}

export interface MarketingCost {
  channel: string;
  cost: number;
}

export interface SalesCost {
  category: string;
  cost: number;
}

export interface CACData {
  marketingCosts: MarketingCost[];
  salesCosts: SalesCost[];
  timePeriod: "monthly" | "quarterly" | "annually";
  newCustomers: number;
  avgContractValue?: number;
}

export interface CACResults {
  cacPerCustomer: number;
  marketingCAC: number;
  salesCAC: number;
  paybackPeriod: number;
  efficiencyRatio: number;
  benchmarkComparison: "good" | "average" | "poor";
}

export interface QuickRatioData {
  newMRR: number;
  expansionMRR: number;
  churnMRR: number;
  contractionMRR: number;
  timePeriod: "monthly" | "quarterly" | "annually";
}

export interface QuickRatioResult {
  quickRatio: number;
  growthEfficiency: "Poor" | "Good" | "Excellent";
  netMRR: number;
}

export interface MagicNumberData {
  currentQuarterRevenue: number;
  previousQuarterRevenue: number;
  salesAndMarketingSpend: number;
  timePeriod: "quarterly" | "annually";
}

export interface MagicNumberResult {
  magicNumber: number;
  efficiency: "Poor" | "Good" | "Excellent";
  revenueGrowth: number;
  recommendation: string;
}

export interface BurnMultipleData {
  currentQuarterRevenue: number;
  previousQuarterRevenue: number;
  currentQuarterBurn: number;
  timePeriod: "quarterly" | "annually";
}

export interface BurnMultipleResult {
  burnMultiple: number;
  efficiency: "Excellent" | "Good" | "Poor";
  recommendation: string;
  revenueGrowth: number;
  quarterlyBurn: number;
}
