
export type SalesPerformance = number; // -50 to +50
export type MarketPosition = "low" | "mid" | "premium";
export type CompetitorActivity = "decreased" | "stable" | "increased";

export interface RepricingData {
  currentPrice: string;
  historicalPrices: string[];
  salesPerformance: SalesPerformance;
  competitorPrices: {
    low: string;
    average: string;
    high: string;
  };
  marketDemand: "low" | "medium" | "high";
  industryTrends: "declining" | "stable" | "growing";
  features: {
    name: string;
    hasFeature: boolean;
  }[];
  valueProposition: string;
  competitiveAdvantages: string[];
}
