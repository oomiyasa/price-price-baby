
import { ElasticityData, ElasticityResult } from "../types/elasticity";

export const calculateElasticity = (data: ElasticityData): ElasticityResult => {
  const { currentPrice, currentDemand, newPrice, newDemand } = data;

  // Calculate price elasticity of demand
  const percentagePriceChange = ((newPrice - currentPrice) / currentPrice) * 100;
  const percentageDemandChange = ((newDemand - currentDemand) / currentDemand) * 100;
  
  const priceElasticity = Math.abs(percentageDemandChange / percentagePriceChange);

  // Calculate revenues
  const currentRevenue = currentPrice * currentDemand;
  const projectedRevenue = newPrice * newDemand;
  const revenueChange = ((projectedRevenue - currentRevenue) / currentRevenue) * 100;

  // Determine if demand is elastic (|PED| > 1) or inelastic (|PED| < 1)
  const isElastic = priceElasticity > 1;

  // Calculate recommended price based on elasticity
  let recommendedPrice = currentPrice;
  if (isElastic) {
    // If demand is elastic, consider lowering price slightly
    recommendedPrice = currentPrice * 0.95;
  } else {
    // If demand is inelastic, consider raising price slightly
    recommendedPrice = currentPrice * 1.05;
  }

  return {
    priceElasticity,
    revenueChange,
    recommendedPrice,
    isElastic,
    currentRevenue,
    projectedRevenue,
  };
};
