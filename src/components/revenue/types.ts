
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
