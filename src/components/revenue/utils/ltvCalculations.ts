
import { LTVData, LTVResults } from "../types";

export const calculateLTV = (data: LTVData): LTVResults => {
  const annualRevenue = data.timePeriod === "monthly" 
    ? data.averageRevenue * 12 
    : data.averageRevenue;

  // Calculate customer lifespan in years based on churn rate
  const customerLifespan = 1 / (data.churnRate / 100);
  
  const basicLTV = annualRevenue * customerLifespan;
  
  const crossSellValue = data.crossSellRevenue * customerLifespan;
  const adjustedLTV = basicLTV + crossSellValue;
  
  const netProfitLTV = adjustedLTV * (data.profitMargin / 100);
  
  const growthFactor = 1 + (data.revenueGrowth / 100);
  const growthAdjustedLTV = netProfitLTV * growthFactor;
  
  const referralValue = growthAdjustedLTV * (data.referralRate / 100);

  return {
    basicLTV,
    adjustedLTV,
    netProfitLTV,
    growthAdjustedLTV,
    referralValue,
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
