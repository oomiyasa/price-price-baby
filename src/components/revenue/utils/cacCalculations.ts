
import { CACData, CACResults } from "../types";

export const calculateCAC = (data: CACData): CACResults => {
  const totalMarketingCosts = data.marketingCosts.reduce((sum, cost) => sum + cost.cost, 0);
  const totalSalesCosts = data.salesCosts.reduce((sum, cost) => sum + cost.cost, 0);
  const totalCosts = totalMarketingCosts + totalSalesCosts;

  // Calculate basic CAC
  const cacPerCustomer = data.newCustomers > 0 ? totalCosts / data.newCustomers : 0;
  const marketingCAC = data.newCustomers > 0 ? totalMarketingCosts / data.newCustomers : 0;
  const salesCAC = data.newCustomers > 0 ? totalSalesCosts / data.newCustomers : 0;

  // Calculate payback period (in months)
  const monthlyContractValue = (data.avgContractValue || 0) / 
    (data.timePeriod === "annually" ? 12 : data.timePeriod === "quarterly" ? 3 : 1);
  const paybackPeriod = monthlyContractValue > 0 ? cacPerCustomer / monthlyContractValue : 0;

  // Calculate efficiency ratio (LTV:CAC - simplified version)
  const estimatedLTV = (monthlyContractValue * 24); // Assuming 2-year customer lifetime
  const efficiencyRatio = cacPerCustomer > 0 ? estimatedLTV / cacPerCustomer : 0;

  // Determine benchmark comparison
  let benchmarkComparison: "good" | "average" | "poor";
  if (efficiencyRatio >= 3) {
    benchmarkComparison = "good";
  } else if (efficiencyRatio >= 1) {
    benchmarkComparison = "average";
  } else {
    benchmarkComparison = "poor";
  }

  return {
    cacPerCustomer,
    marketingCAC,
    salesCAC,
    paybackPeriod,
    efficiencyRatio,
    benchmarkComparison,
  };
};
