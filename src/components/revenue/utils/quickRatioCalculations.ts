
import { QuickRatioData, QuickRatioResult } from "../types";

export const calculateQuickRatio = (data: QuickRatioData): QuickRatioResult => {
  const { newMRR, expansionMRR, churnMRR, contractionMRR } = data;
  
  const growthMRR = newMRR + expansionMRR;
  const lostMRR = churnMRR + contractionMRR;
  
  const quickRatio = lostMRR === 0 ? growthMRR : growthMRR / lostMRR;
  const netMRR = growthMRR - lostMRR;

  let growthEfficiency: "Poor" | "Good" | "Excellent";
  if (quickRatio >= 4) {
    growthEfficiency = "Excellent";
  } else if (quickRatio >= 2) {
    growthEfficiency = "Good";
  } else {
    growthEfficiency = "Poor";
  }

  return {
    quickRatio,
    growthEfficiency,
    netMRR,
  };
};
