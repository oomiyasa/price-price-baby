
export interface ElasticityData {
  currentPrice: number;
  currentDemand: number;
  newPrice: number;
  newDemand: number;
}

export interface ElasticityResult {
  priceElasticity: number;
  revenueChange: number;
  recommendedPrice: number;
  isElastic: boolean;
  currentRevenue: number;
  projectedRevenue: number;
}
