
import { SalesPerformance } from "@/types/repricing";
import { analyzePriceTrend } from "./priceTrendAnalysis";

export const calculateSalesImpact = (salesPerformance: SalesPerformance) => {
  if (salesPerformance <= -30) return -10;
  if (salesPerformance <= -10) return -5;
  if (salesPerformance >= 30) return 10;
  if (salesPerformance >= 10) return 5;
  return (salesPerformance / 10);
};

export const calculateMarketImpact = (
  competitorPrices: "increased" | "decreased" | "mixed" | "unchanged" | null,
  marketDemand: "growing" | "shrinking" | "stable" | null,
  historicalPrices: string[],
  currentPrice: string
) => {
  let impact = 0;
  const { trend, volatility } = analyzePriceTrend(historicalPrices, currentPrice);
  
  if (competitorPrices === "increased") impact += 5;
  if (competitorPrices === "decreased") impact -= 5;
  if (marketDemand === "growing") impact += 5;
  if (marketDemand === "shrinking") impact -= 5;
  
  if (Math.abs(trend) > 2) {
    const trendFactor = Math.min(Math.abs(trend), 5) / 5;
    impact *= (1 + trendFactor);
  }

  if (volatility > 5) {
    impact *= (1 - Math.min(volatility, 10) / 20);
  }
  
  return impact;
};

export const calculatePositioningImpact = (
  uniqueness: "low" | "medium" | "high",
  valuePerception: number,
  historicalPrices: string[],
  currentPrice: string
) => {
  let impact = 0;
  const { trend } = analyzePriceTrend(historicalPrices, currentPrice);
  
  if (uniqueness === "high") impact += 5;
  if (uniqueness === "low") impact -= 5;
  
  const perceptionImpact = ((valuePerception - 50) / 10);
  
  if (Math.abs(trend) > 2) {
    const trendAlignment = trend * perceptionImpact > 0 ? 1.2 : 0.8;
    impact = (impact + perceptionImpact) * trendAlignment;
  } else {
    impact = impact + perceptionImpact;
  }
  
  return impact;
};

export const calculateRecommendation = (
  currentPrice: string,
  historicalPrices: string[],
  salesPerformance: SalesPerformance,
  competitorPrices: "increased" | "decreased" | "mixed" | "unchanged" | null,
  marketDemand: "growing" | "shrinking" | "stable" | null,
  uniqueness: "low" | "medium" | "high",
  valuePerception: number,
  weights: {
    salesPerformance: number;
    marketConditions: number;
    positioning: number;
  }
) => {
  const basePrice = parseFloat(currentPrice);
  if (isNaN(basePrice)) return { min: 0, max: 0, impacts: { sales: 0, market: 0, positioning: 0, total: 0 } };

  const { volatility } = analyzePriceTrend(historicalPrices, currentPrice);
  
  const rawSalesImpact = calculateSalesImpact(salesPerformance);
  const rawMarketImpact = calculateMarketImpact(competitorPrices, marketDemand, historicalPrices, currentPrice);
  const rawPositioningImpact = calculatePositioningImpact(uniqueness, valuePerception, historicalPrices, currentPrice);
  
  const totalWeight = weights.salesPerformance + weights.marketConditions + weights.positioning;
  
  const salesImpact = rawSalesImpact * (weights.salesPerformance / 100);
  const marketImpact = rawMarketImpact * (weights.marketConditions / 100);
  const positioningImpact = rawPositioningImpact * (weights.positioning / 100);
  
  const weightIntensityFactor = Math.min(totalWeight / 100, 2);
  const totalImpact = (salesImpact + marketImpact + positioningImpact) * weightIntensityFactor;
  
  const baseRange = 2 + (volatility / 4);
  
  return {
    min: basePrice * (1 + (totalImpact - baseRange) / 100),
    max: basePrice * (1 + (totalImpact + baseRange) / 100),
    impacts: {
      sales: salesImpact,
      market: marketImpact,
      positioning: positioningImpact,
      total: totalImpact
    }
  };
};
